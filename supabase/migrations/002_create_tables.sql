create table documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_at timestamp with time zone default now()
);

create table chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade,
  content text not null,
  embedding vector(1536),
  created_at timestamp with time zone default now()
);

alter table documents enable row level security;
alter table chunks enable row level security;

grant all on public.documents to service_role;
grant all on public.chunks to service_role;
