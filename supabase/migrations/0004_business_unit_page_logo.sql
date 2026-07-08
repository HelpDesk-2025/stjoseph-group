-- ─────────────────────────────────────────────────────────────────────────
--  St. Joseph Group, Inc. — separate unit-page logo from the marquee logo
--  Run in the Supabase SQL editor after 0003. `logo` = hero marquee;
--  `page_logo` = the business-unit page (hero badge + related cards).
-- ─────────────────────────────────────────────────────────────────────────
alter table public.business_units
  add column if not exists page_logo text;
