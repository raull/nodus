from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import db
from app.services.chunker import chunk_text
from app.services.embeddings import embed

router = APIRouter(prefix="/documents", tags=["documents"])


class DocumentCreate(BaseModel):
    title: str
    content: str


@router.post("/")
def create_document(body: DocumentCreate):
    # Save the document
    result = db.table("documents").insert({
        "title": body.title,
        "content": body.content,
    }).execute()

    document = result.data[0]
    document_id = document["id"]

    # Chunk, embed, and store each chunk
    chunks = chunk_text(body.content)
    for chunk in chunks:
        vector = embed(chunk)
        db.table("chunks").insert({
            "document_id": document_id,
            "content": chunk,
            "embedding": vector,
        }).execute()

    return {"id": document_id, "title": document["title"], "chunks": len(chunks)}
