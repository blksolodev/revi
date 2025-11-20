-- Enable required extensions
create extension if not exists "pgcrypto";

-- Profiles: one-to-one with auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  business_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- Organizations (companies / business accounts)
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  owner_id uuid references auth.users (id) on delete set null,
  created_at timestamptz default now()
);

alter table public.organizations enable row level security;

-- Organization members (team membership)
create table if not exists public.organization_members (
  id bigserial primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz default now()
);

alter table public.organization_members enable row level security;

create policy "Users can see their memberships"
  on public.organization_members
  for select
  using (auth.uid() = user_id);

create policy "Org owners/admins can manage memberships"
  on public.organization_members
  for all
  using (
    exists (
      select 1
      from public.organization_members m2
      where m2.organization_id = organization_members.organization_id
        and m2.user_id = auth.uid()
        and m2.role in ('owner', 'admin')
    )
  );

create policy "Users can view their organizations"
  on public.organizations
  for select
  using (
    exists (
      select 1
      from public.organization_members m
      where m.organization_id = organizations.id
        and m.user_id = auth.uid()
    )
  );

create policy "Users can create organizations"
  on public.organizations
  for insert
  with check (auth.uid() = owner_id);

-- Auto-add owner as member when organization is created
create or replace function public.handle_new_organization()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.owner_id is not null then
    insert into public.organization_members (organization_id, user_id, role)
    values (new.id, new.owner_id, 'owner');
  end if;
  return new;
end;
$$;

drop trigger if exists on_organization_created on public.organizations;

create trigger on_organization_created
after insert on public.organizations
for each row
execute procedure public.handle_new_organization();

-- AI messages captured from the floating assistant
create table if not exists public.ai_messages (
  id bigserial primary key,
  user_id uuid references auth.users(id),
  message text not null,
  created_at timestamptz default now()
);

alter table public.ai_messages enable row level security;

create policy "Anyone can insert AI messages"
  on public.ai_messages
  for insert
  to anon, authenticated
  with check (true);

create policy "Users can read their own AI messages"
  on public.ai_messages
  for select
  to authenticated
  using (user_id = auth.uid());
