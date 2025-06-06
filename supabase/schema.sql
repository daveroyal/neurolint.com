-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  subscription text default 'free',
  usage_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Analysis history table
create table if not exists public.analysis_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  code text not null,
  language text not null,
  results jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.analysis_history enable row level security;

-- Create policies
create policy "Users can view their own analyses"
  on public.analysis_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own analyses"
  on public.analysis_history for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own analyses"
  on public.analysis_history for delete
  using (auth.uid() = user_id);

-- Workspaces table
create table public.workspaces (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  code text not null,
  language text not null,
  is_archived boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.workspaces enable row level security;

-- Policies
create policy "Users can view own workspaces" on public.workspaces
  for select using (auth.uid() = user_id);

create policy "Users can insert own workspaces" on public.workspaces
  for insert with check (auth.uid() = user_id);

create policy "Users can update own workspaces" on public.workspaces
  for update using (auth.uid() = user_id);

create policy "Users can delete own workspaces" on public.workspaces
  for delete using (auth.uid() = user_id);

-- Update updated_at on workspace update
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_workspace_updated_at
  before update on public.workspaces
  for each row
  execute procedure public.handle_updated_at(); 