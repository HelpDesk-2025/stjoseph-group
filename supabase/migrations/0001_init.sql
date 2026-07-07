-- ─────────────────────────────────────────────────────────────────────────
--  St. Joseph Group, Inc. — initial schema
--  Run this in the Supabase SQL editor (or `supabase db push`) after creating
--  your project. See SUPABASE_SETUP.md for the full walkthrough.
-- ─────────────────────────────────────────────────────────────────────────

-- ── Contact form submissions ────────────────────────────────────────────
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  company    text,
  message    text not null
);

-- ── Newsletter / careers signups ────────────────────────────────────────
create table if not exists public.signups (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email      text not null,
  source     text not null default 'footer',
  unique (email, source)
);

-- ── CMS: business units ─────────────────────────────────────────────────
create table if not exists public.business_units (
  slug        text primary key,
  name        text not null,
  short       text not null,
  sector      text not null,
  tagline     text not null,
  summary     text not null,
  description text not null,
  accent      text not null,
  founded     text not null,
  highlights  jsonb not null default '[]'::jsonb,
  services    jsonb not null default '[]'::jsonb,
  sort_order  int  not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── CMS: testimonials ───────────────────────────────────────────────────
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  quote      text not null,
  name       text not null,
  role       text not null,
  sort_order int  not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
--  Row Level Security
--  The server (service-role key) bypasses RLS. These policies govern the
--  browser (anon) client: the public may submit forms and read published
--  content, but cannot read other people's messages/signups.
-- ─────────────────────────────────────────────────────────────────────────
alter table public.contact_messages enable row level security;
alter table public.signups          enable row level security;
alter table public.business_units   enable row level security;
alter table public.testimonials     enable row level security;

drop policy if exists "anon can submit contact" on public.contact_messages;
create policy "anon can submit contact"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "anon can sign up" on public.signups;
create policy "anon can sign up"
  on public.signups for insert
  to anon, authenticated
  with check (true);

drop policy if exists "published business units are public" on public.business_units;
create policy "published business units are public"
  on public.business_units for select
  to anon, authenticated
  using (published = true);

drop policy if exists "published testimonials are public" on public.testimonials;
create policy "published testimonials are public"
  on public.testimonials for select
  to anon, authenticated
  using (published = true);
