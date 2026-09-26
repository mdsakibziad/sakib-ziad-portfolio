-- ==============================================================================
-- Supabase Postgres Schema for Sakib Ziad Portfolio & Client Portal
-- Run this script in your Supabase project's SQL Editor (Dashboard -> SQL Editor)
-- ==============================================================================

-- 1. Create Profiles Table (syncs with auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. Create Purchases Table (Tracks one-time digital products)
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  product_id text not null,
  product_name text not null,
  amount_paid integer not null, -- amount in cents USD
  currency text default 'usd' not null,
  stripe_session_id text unique,
  download_ref text,
  created_at timestamptz default now() not null
);

-- 3. Create Memberships Table (Tracks Advisory Syndicate subscriptions)
create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null unique,
  status text not null default 'inactive', -- 'active', 'canceled', 'past_due', 'trialing'
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes for performance
create index if not exists idx_purchases_user_id on public.purchases(user_id);
create index if not exists idx_memberships_user_id on public.memberships(user_id);
create index if not exists idx_memberships_stripe_customer on public.memberships(stripe_customer_id);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- Users can only read and update their own records. Service role handles webhook mutations.
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.purchases enable row level security;
alter table public.memberships enable row level security;

-- Profiles RLS
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Purchases RLS
create policy "Users can view own purchases"
  on public.purchases for select
  using (auth.uid() = user_id);

-- Memberships RLS
create policy "Users can view own membership"
  on public.memberships for select
  using (auth.uid() = user_id);

-- ==============================================================================
-- Automatic Profile Creation Trigger on Sign Up
-- ==============================================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
