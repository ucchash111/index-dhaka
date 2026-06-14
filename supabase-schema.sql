-- Run this in your Supabase project's SQL editor

create table applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  building text not null,
  link text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

create table members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  building text not null,
  featured boolean not null default false,
  avatar_url text,
  created_at timestamptz default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('weekly', 'dinner', 'showcase')),
  date timestamptz not null,
  location text not null,
  description text default '',
  created_at timestamptz default now()
);

-- Disable RLS for server-side only access (service role key bypasses RLS anyway)
alter table applications disable row level security;
alter table members disable row level security;
alter table events disable row level security;
