from fastapi import APIRouter
from pydantic import BaseModel
from app.services.search import search_chunks
from app.services.llm import answer

router = APIRouter(prefix="/query", tags=["query"])


class QueryRequest(BaseModel):
    question: str


@router.post("/")
def query(body: QueryRequest):
    chunks = search_chunks(body.question)
    if not chunks:
        return {"answer": "I couldn't find anything in your notes related to that.", "sources": []}
    response = answer(body.question, chunks)
    return {"answer": response, "sources": [c["content"] for c in chunks]}
