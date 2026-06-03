# Nodus

A personal AI-powered knowledge base. Drop in notes, documents, or any text — then ask questions and get answers grounded in your own content.

## How it works

Nodus uses a RAG (Retrieval Augmented Generation) pipeline:

1. You upload a document via the web UI
2. The backend splits it into chunks and generates embeddings (vectors) using OpenAI
3. Chunks and embeddings are stored in Supabase (PostgreSQL + pgvector)
4. When you ask a question, the question is embedded and compared against stored chunks using vector similarity search
5. The most relevant chunks are sent to Claude as context, which returns a grounded answer

## Stack

| Layer | Technology |
|---|---|
| Backend | Python + FastAPI |
| Database | Supabase (PostgreSQL + pgvector) |
| Embeddings | OpenAI `text-embedding-3-small` |
| AI | Anthropic Claude Haiku |
| Frontend | React + Vite |
| iOS | Planned |

## Project structure

```
nodus/
├── backend/                  # FastAPI Python backend
│   ├── app/
│   │   ├── main.py           # Entry point, route registration
│   │   ├── database.py       # Supabase client
│   │   ├── routes/
│   │   │   ├── documents.py  # POST /documents — ingest a document
│   │   │   └── query.py      # POST /query — ask a question
│   │   └── services/
│   │       ├── chunker.py    # Splits text into overlapping chunks
│   │       ├── embeddings.py # OpenAI embedding calls
│   │       ├── search.py     # Vector similarity search
│   │       └── llm.py        # Claude answer generation
│   ├── requirements.txt
│   └── .env.example
├── frontend/                 # React + Vite web app
│   └── src/
│       ├── App.jsx
│       └── components/
│           ├── Upload.jsx    # Document upload UI
│           └── Query.jsx     # Question + answer UI
├── supabase/
│   ├── migrations/           # PostgreSQL migration files (run in order)
│   └── README.md             # Database setup instructions
└── ios/                      # Swift app (planned)
```

## Local setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- A [Supabase](https://supabase.com) project with pgvector enabled
- An [OpenAI](https://platform.openai.com) API key
- An [Anthropic](https://console.anthropic.com) API key

### Database

Run the migrations in order against your Supabase project. See [supabase/README.md](supabase/README.md) for full instructions.

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your keys
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/documents/` | Ingest a document |
| POST | `/query/` | Ask a question |

## Deployment (planned)

- Backend → Railway
- Frontend → Vercel
- Database → Supabase (existing)

## Notes

- The ivfflat vector index is intentionally omitted until the `chunks` table has 1000+ rows. See [supabase/README.md](supabase/README.md).
- The Vite dev server proxies `/api/*` requests to the FastAPI backend at `localhost:8000`, avoiding CORS issues during local development.
