# Connecting Supabase

This project is wired for Supabase but ships with **graceful fallback**: until
you complete the steps below, the site runs on the static content in
`lib/content.ts` and the contact/newsletter forms accept input without
persisting it. Once the environment variables are set, everything switches to
the database automatically — no code changes needed.

## What's wired

| Feature | Table | Where |
| --- | --- | --- |
| Contact form | `contact_messages` | `app/actions/contact.ts` → `components/sections/Contact.tsx` |
| Newsletter / careers signups | `signups` | `app/actions/subscribe.ts` → `components/NewsletterForm.tsx` (footer) |
| Testimonials (CMS) | `testimonials` | `lib/data.ts` → `app/page.tsx` → `Testimonials` |
| Business units (CMS) | `business_units` | `lib/data.ts` (`getBusinessUnits()`) — table + fetcher ready¹ |

¹ `getBusinessUnits()` and the `business_units` table/seed are provided. The
homepage grid, footer, and `/business-units/[slug]` detail pages still import
directly from `lib/content.ts`. To serve them from Supabase, fetch with
`getBusinessUnits()` in those server components and pass the data down (same
pattern used for testimonials in `app/page.tsx`).

## 1. Create the project

1. Go to <https://supabase.com/dashboard> and create a new project.
2. Choose a region close to your users (e.g. **Southeast Asia (Singapore)**).
3. Wait for it to finish provisioning.

> Alternatively, provision Supabase through the **Vercel Marketplace**
> (Vercel Dashboard → Storage → Marketplace → Supabase), which auto-injects the
> env vars into your Vercel project.

## 2. Add environment variables

Copy `.env.example` to `.env.local` and fill in the values from
**Dashboard → Project Settings → API**:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role secret key>
```

`.env.local` is gitignored. For production, add the same variables in your host
(e.g. Vercel → Project → Settings → Environment Variables).

## 3. Create the tables

Open **Dashboard → SQL Editor**, paste the contents of
`supabase/migrations/0001_init.sql`, and run it. This creates the four tables
and their Row Level Security policies (public can submit forms and read
published content; nobody can read others' messages via the anon key).

## 4. Seed CMS content (optional)

Populate `business_units` and `testimonials` from `lib/content.ts`:

```bash
npm run seed
```

Safe to re-run: the seed is **additive** — it only inserts sections, business
units, or testimonials that don't already exist, and never overwrites or
deletes content you've edited in the admin.

## 5. Run it

```bash
npm run dev
```

- Submit the contact form → a row appears in **Table Editor → contact_messages**.
- Subscribe in the footer → a row in **signups**.
- After seeding, testimonials are served from the database.

## Security notes

- The **service-role key** bypasses RLS and must stay server-side only. It's
  read exclusively in `lib/supabase/server.ts` and the seed script, never in a
  `NEXT_PUBLIC_` variable or client component.
- The **anon key** is safe in the browser; RLS restricts it to inserting
  form/signup rows and selecting published content.
