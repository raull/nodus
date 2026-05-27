from app.database import db
from app.services.embeddings import embed


def search_chunks(query: str, match_count: int = 5) -> list[dict]:
    query_vector = embed(query)
    vector_str = "[" + ",".join(f"{x:.10f}" for x in query_vector) + "]"
    result = db.rpc("match_chunks", {
        "query_embedding": vector_str,
        "match_count": match_count,
    }).execute()
    return result.data
