from fastapi import FastAPI
from contextlib import asynccontextmanager
from backend.models import WordPayload
import json
import logging

logging.basicConfig(level=logging.INFO)
word_list: dict[str, WordPayload] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_words_from_json("backend/resources/ninja_words.json")
    yield

app = FastAPI(lifespan=lifespan)

def load_words_from_json(file_path: str):
    with open(file_path, 'r') as file:
        data  = json.load(file)
        for word_data in data["words"]:
            word = word_data["word"]
            word_list[word] = WordPayload(**word_data)
    logging.info(f"words load done! Length of word_list: {len(word_list)}")

    
@app.get("/words")
def list_words() -> dict[str, WordPayload]:
    return word_list

@app.get("/words/{word}")
def get_word(word: str):
    return word_list.get(word, {"error": "Word not found"})

