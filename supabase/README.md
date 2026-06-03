# Database Migrations

Run these SQL files in order against any PostgreSQL database with pgvector installed.

## Order

1. `001_enable_vector.sql` — enables the pgvector extension
2. `002_create_tables.sql` — creates documents and chunks tables with RLS
3. `003_match_chunks_function.sql` — creates the vector similarity search function

## Using the Supabase CLI (recommended)

Prerequisites: [Supabase CLI](https://supabase.com/docs/guides/cli) and [Docker Desktop](https://docs.docker.com/desktop).

```bash
# Install CLI
brew install supabase/tap/supabase

# Log in
supabase login

# Link to your Supabase project (find the ref in your project URL)
supabase link --project-ref <your-project-ref>

# Push all pending migrations to the remote database
supabase db push

# After making schema changes in Supabase dashboard, generate a new migration file
supabase db diff --schema public -f 004_your_change_name
```

## Workflow for schema changes

1. Make the change in Supabase SQL Editor (easy to iterate)
2. Run `supabase db diff --schema public -f 00X_description` to generate the migration file
3. Commit the new file — the repo now reflects the change

Never edit existing migration files. Always add a new numbered file.

## Notes

- These are standard PostgreSQL — not Supabase-specific
- The ivfflat index is intentionally omitted. Add it once the chunks table has 1000+ rows:
  ```sql
  create index on chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);
  ```
