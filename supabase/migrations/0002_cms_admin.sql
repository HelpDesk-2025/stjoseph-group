-- ─────────────────────────────────────────────────────────────────────────
--  St. Joseph Group, Inc. — CMS + admin
--  Run this in the Supabase SQL editor AFTER 0001_init.sql.
-- ─────────────────────────────────────────────────────────────────────────

-- ── Singleton / structured content (one JSONB row per section) ───────────
-- key = section name (hero, company, eos, meaningfulLives, strategy,
-- coreValues, journey, greatPlace, careers, investor, contact, nav)
create table if not exists public.site_content (
  key        text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ── Admin authorization grant (credentials live in auth.users) ───────────
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

-- ── Business-unit imagery (uploaded via the admin) ───────────────────────
alter table public.business_units
  add column if not exists hero_image text,
  add column if not exists gallery jsonb not null default '[]'::jsonb;

-- ─────────────────────────────────────────────────────────────────────────
--  Row Level Security
--  Writes to site_content / admins go ONLY through the service-role client
--  (used by admin server actions after an isAdmin() check), so these tables
--  intentionally have NO anon/authenticated write policy.
-- ─────────────────────────────────────────────────────────────────────────
alter table public.site_content enable row level security;
alter table public.admins        enable row level security;

drop policy if exists "site_content is public read" on public.site_content;
create policy "site_content is public read"
  on public.site_content for select
  to anon, authenticated
  using (true);

-- An authenticated user may check whether THEY are an admin, nothing more.
drop policy if exists "admins can read own row" on public.admins;
create policy "admins can read own row"
  on public.admins for select
  to authenticated
  using (auth.uid() = user_id);
