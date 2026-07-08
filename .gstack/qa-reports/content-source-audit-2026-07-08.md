# Content Source Audit — St. Joseph Group, Inc.

**Date:** 2026-07-08
**Question:** For every content area in the system, is it displayed from the **database** (CMS, editable in `/admin`) or from **static values** (`lib/content.ts`, code-only)?
**Method:** Runtime differential on the running app (localhost:3200) + Supabase queries. No code changed. Report only.

## Verdict

**The whole site is serving content from the database.** Confirmed by differential:
- Home page renders DB-only units (CVM Pawnshop, Le Grand Suites) and does **not** render the deleted template unit ("Realty & Development") → not falling back to static.
- DB-only unit page `/business-units/cvm-pawnshop` returns 200 → routing + fetch are DB-driven.
- DB state: `site_content` = 12 sections, `business_units` = 9 (all your real units, published, logo + page_logo set), `testimonials` = 4.

Every CMS-wired area falls back to `lib/content.ts` **only** if Supabase errors — so the site never breaks, but today it's live on the DB.

**CMS coverage: ~90%.** All 14 content domains + images are DB-backed. The remaining ~10% is section "chrome" (headings/labels) and a few prose blocks hardcoded in components — see Static-only findings.

---

## DB-backed (editable in /admin) — verified live

| Area | Source (table/key) | Where |
|---|---|---|
| Hero eyebrow/title/subtitle/CTAs/stats | `site_content.hero` | home |
| Hero marquee logos | `business_units.logo` | home |
| Hero solar-system planets (color/name/link) | `business_units` | home |
| Business Units carousel (name/sector/summary/gallery/hero image) | `business_units` | home |
| Purpose section | `site_content.meaningfulLives` | home |
| EOS section (+6 components) | `site_content.eos` | home |
| Strategy (core focus/mission/vision) | `site_content.strategy` | home |
| Core value **items** (5) | `site_content.coreValues` | home |
| Journey milestones | `site_content.journey` | home |
| Great Place (stats/badges/body) | `site_content.greatPlace` | home |
| Testimonials (quote/name/role) | `testimonials` | home |
| Careers (perks/openings/cta) | `site_content.careers` | home |
| Contact section (channels/body) | `site_content.contact` | home |
| Navbar links | `site_content.nav` | all pages |
| Logo + company name/tagline | `site_content.company` | header/footer |
| Footer company info + unit links | `company` + `business_units` | all pages |
| Unit detail: name/sector/tagline/founded/description/highlights/services | `business_units` | /business-units/[slug] |
| Unit page logo (badge) + related cards | `business_units.page_logo` | /business-units/[slug] |
| Investor: metrics/performance/governance/reports/IR contact | `site_content.investor` | /investor-relations |
| Page title / description / keywords | `company` | metadata (all pages) |
| Favicon | `company.favicon` | metadata |
| Social share (OG) image | `company.ogImage` | metadata |

---

## Static-only (NOT in DB, NOT editable in admin) — findings

These are hardcoded in component files. They render the same for everyone and can only be changed in code. Ranked by how likely you'll want to edit them.

### MEDIUM — visible copy you may want to control

- **FIND-001 · Investor page prose blocks.** `app/(site)/investor-relations/page.tsx` hardcodes: "Financial Performance" eyebrow, **"Consistent, disciplined growth"** heading + its paragraph + 3 bullet points, "Governance & Stewardship" eyebrow + **"Built on trust and accountability"** heading, "Reports & Filings" eyebrow + **"Download center"** heading + its placeholder paragraph, and the IR contact card subtitle. Only the metrics/chart/governance-items/reports *data* comes from the DB. *(Evidence: investor screenshot — "Consistent, disciplined growth" is not in the `investor` content object.)*
- **FIND-002 · Revenue chart labels.** `components/RevenueChart.tsx` hardcodes the "Group Revenue" title, "in ₱ Billions · FY2020–FY2024" subtitle, and "+62% over 5 years". The bar data is DB (`investor.performance`).
- **FIND-003 · Section headers hardcoded.** The heading/eyebrow above three otherwise-DB sections is static:
  - Core Values: "What We Stand For" / "Our 5 Core Values" + intro (`components/sections/CoreValues.tsx`)
  - Testimonials: "In Their Words" / "Voices from across the group" (`components/sections/Testimonials.tsx`)
  - Journey: the intro line "From a single enterprise to a diversified group of nine…" (`components/sections/Journey.tsx`) — eyebrow/title/milestones are DB.

### LOW — chrome, labels, and system messages

- **FIND-004 · Unit detail page chrome.** `components/UnitBody.tsx` hardcodes "Overview", the "As part of St. Joseph Group, Inc., … EOS® framework …" sentence, "What We Do" / "Services & capabilities", the CTA "Ready to build something meaningful with {short}?", and "Explore more businesses" / "View all 9". `components/UnitHero.tsx` hardcodes the breadcrumb, "Partner with us", "All businesses", and the "Business Unit 0N · Est." label.
- **FIND-005 · Careers label.** "Featured Openings" (`components/sections/Careers.tsx`).
- **FIND-006 · Form messages.** Contact success "Message received" / "Thank you for reaching out…" (`components/sections/Contact.tsx`) and newsletter "Get updates" / "Thanks — you're subscribed." (`components/NewsletterForm.tsx`).
- **FIND-007 · Side section-nav labels.** The left dot-nav labels (`components/SectionNav.tsx`).
- **FIND-008 · Misc.** Navbar "Contact Us" button and the "SCROLL" hint in the hero.

> Note: none of these are bugs — the site works. They're **CMS coverage gaps**: copy that today requires a code edit + redeploy rather than an admin edit.

---

## Notes / adjacent observations

- **Production depends on env vars.** This audit is against local (Supabase configured via `.env.local`). On Vercel the site only serves DB content if `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are set and the project was **redeployed** after adding them. If they're missing there, production silently shows the 9 **template** units + static text (the fallback), not your real data.
- **Auth session is short** (~1h Supabase default) — you'll re-login to `/admin` periodically. Not a content issue.

## STATUS
DONE — audit complete, no code changed. The system displays database content everywhere it's wired (verified live); ~10% of copy (listed above) is static-only and needs code to change.
