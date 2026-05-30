create or replace function match_chunks(
  query_embedding text,
  match_count int default 5
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  similarity float
)
language sql stable
security definer
set search_path = public, extensions
as $$
  select
    id,
    document_id,
    content,
    1 - (embedding <=> query_embedding::vector) as similarity
  from chunks
  order by embedding <=> query_embedding::vector
  limit match_count;
$$;

grant execute on function match_chunks(text, integer) to service_role;
