-- ─────────────────────────────────────────────────────────────────────────
--  St. Joseph Group, Inc. — per-business-unit logo
--  Run in the Supabase SQL editor after 0002. Adds an uploadable logo used in
--  the hero marquee and on each business-unit page (falls back to the icon).
-- ─────────────────────────────────────────────────────────────────────────
alter table public.business_units
  add column if not exists logo text;
