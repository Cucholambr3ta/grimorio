-- 📜 THE GRIMOIRE DATABASE SCHEMA
-- Run this in the Supabase SQL Editor to create the world.

-- 1. PROFILES (The Wizards)
-- Extends the default auth.users table
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  level integer default 1,
  xp integer default 0,
  class text default 'Novice',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. QUESTS (The Missions)
create table public.quests (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard', 'Legendary')),
  xp_reward integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.quests enable row level security;

-- Policies
create policy "Quests are viewable by everyone."
  on quests for select
  using ( true );

-- 3. USER_QUESTS (The Logbook)
-- Tracks which user has accepted/completed which quest
create table public.user_quests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  quest_id uuid references public.quests(id) not null,
  status text check (status in ('Active', 'Completed')) default 'Active',
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.user_quests enable row level security;

-- Policies
create policy "Users can view their own quest log."
  on user_quests for select
  using ( auth.uid() = user_id );

create policy "Users can accept quests."
  on user_quests for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own quest status."
  on user_quests for update
  using ( auth.uid() = user_id );

-- 4. INITIAL DATA (The First Scrolls)
insert into public.quests (title, description, difficulty, xp_reward)
values
  ('The First Hello', 'Print "Hello World" in the console.', 'Easy', 50),
  ('The Loop of Infinity', 'Create a while loop that never ends (and then fix it).', 'Medium', 100),
  ('The Bug Hunter', 'Find and fix a null pointer exception.', 'Hard', 300);
