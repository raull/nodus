# Database Migrations

Run these SQL files in order against any PostgreSQL database with pgvector installed.

## Order

1. `001_enable_vector.sql` — enables the pgvector extension
2. `002_create_tables.sql` — creates documents and chunks tables with RLS
3. `003_match_chunks_function.sql` — creates the vector similarity search function

## Notes

- These are standard PostgreSQL — not Supabase-specific
- The ivfflat index is intentionally omitted. Add it once the chunks table has 1000+ rows:
  ```sql
  create index on chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);
  ```
