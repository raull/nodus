from fastapi import FastAPI

app = FastAPI(title="Nodus API")


@app.get("/health")
def health():
    return {"status": "ok"}
