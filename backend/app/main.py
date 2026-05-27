from fastapi import FastAPI
from app.routes.documents import router as documents_router
from app.routes.query import router as query_router

app = FastAPI(title="Nodus API")

app.include_router(documents_router)
app.include_router(query_router)


@app.get("/health")
def health():
    return {"status": "ok"}
