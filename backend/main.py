from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.models import WordPayload, TypingScorePayload
from backend import config
import json, math
import logging
from uuid import UUID
from datetime import datetime, timezone


logging.basicConfig(level=logging.INFO)

words_group_by_level: dict[int, list[WordPayload]] = {}

typing_scores: dict[UUID, list[TypingScorePayload]] = {}

TYPING_WPM_THRESHOLD = config.TYPING_WPM_THRESHOLD
TYPING_MIN_LEVEL = config.TYPING_MIN_LEVEL
TYPING_MAX_LEVEL = config.TYPING_MAX_LEVEL
SCORE_DECAY_FACTOR = config.SCORE_DECAY_FACTOR

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_words_from_json("backend/resources/ninja_words.json")
    yield

app = FastAPI(lifespan=lifespan)

# Add CORS middleware
# Remove after we are requesting from FE server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

def load_words_from_json(file_path: str):
    with open(file_path, 'r') as file:
        data = json.load(file)
        words = data.get("words", [])
        for word in words:
            word_payload = WordPayload(**word)
            level = word_payload.level

            if level not in words_group_by_level:
                words_group_by_level[level] = []

            words_group_by_level[level].append(word_payload)
    logging.info(f"words load done! Size of words_group_by_level: {len(words_group_by_level)}")


# Typing word APIs
@app.get("/words")
def list_all_words() -> dict[int, list[WordPayload]]:
    return words_group_by_level

@app.get("/words/{level}")
def get_words_by_level(level: float):
    return words_group_by_level.get(math.ceil(level), {"error": "Level not recognized"})


# Typing score APIs
@app.post("/typing-score")
def add_typing_score(score_payload: TypingScorePayload):
    # Ensure session_id exists in dictionary, otherwise create empty list
    if score_payload.session_id not in typing_scores:
        typing_scores[score_payload.session_id] = []

    # Append the score payload to the list for the session_id
    typing_scores[score_payload.session_id].append(score_payload)

    return {"message": "Typing score data added successfully", "session_id": score_payload.session_id}

@app.get("/typing-scores/{session_id}")
def get_typing_scores_by_session_id(session_id: UUID):
    if session_id not in typing_scores or not typing_scores[session_id]:
        raise HTTPException(status_code=404, detail=f"No scores found for session_id: {session_id}")

    return typing_scores[session_id]


# Typing word recommendation
@app.get("/recommendation/{session_id}")
def get_level_recommendation(session_id: UUID):
    if session_id not in typing_scores or not typing_scores[session_id]:
        raise HTTPException(status_code=404, detail=f"No scores found for session_id: {session_id}")

    # Calculate average WPM with decayed factor
    # e.g., {wpm, level} with {20, 1}, {50, 1} derives {35, 1} with no decay
    # but {wpm, level, age_min} with {20, 1, 5}, {50, 1, 1} derives {(20*0.9+50)/1.9, 1} with decay so the recent result has higher weight
    scores = typing_scores[session_id]
    current_time = datetime.now(timezone.utc)

    total_weight = 0
    weighted_wpm_sum = 0
    for score in scores:
        decay_weight = calculate_decay_weight(score.timestamp.replace(tzinfo=timezone.utc), current_time)
        total_weight += decay_weight * score.level  # For normalization purpose
        weighted_wpm_sum += score.wpm * decay_weight * score.level  # Multiply by level to boost the higher level wpm

    if total_weight == 0:
        raise HTTPException(status_code=400, detail="Total weight is zero, cannot compute weighted average.")

    weighted_wpm = weighted_wpm_sum / total_weight

    # Determine recommended level based on weighted average WPM and threshold
    if weighted_wpm >= TYPING_WPM_THRESHOLD:
        recommended_level = min(TYPING_MAX_LEVEL, weighted_wpm / TYPING_WPM_THRESHOLD)
    else:
        recommended_level = TYPING_MIN_LEVEL

    return {
        "message": "Typing level recommendation based on historical data",
        "recommended_level": recommended_level
    }

def calculate_decay_weight(score_timestamp: datetime, current_time: datetime) -> float:
    # Calculate the exponential decay weight based on the age of the score
    # e.g., with SCORE_DECAY_FACTOR = 0.98, 5min => 0.98^5 ~= 0.9, 1hour => 0.98^60 ~= 0.4
    age_in_minutes = (current_time - score_timestamp).total_seconds() / 60
    decay_weight = SCORE_DECAY_FACTOR ** age_in_minutes
    return decay_weight