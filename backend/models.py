from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class WordPayload(BaseModel):
    id: int
    word: str
    image_url: str
    complexity: int

class ParagraphePayload(BaseModel):
    id: int
    text: str
    length: int
    image_url: str
    complexity: int

class TypingScorePayload(BaseModel):
    session_id: UUID
    wpm: float
    typing_duration: float
    level: int
    timestamp: datetime
