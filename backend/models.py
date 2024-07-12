from pydantic import BaseModel

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
