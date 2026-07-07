/**
 * Seed the Supabase CMS tables from the static content in `lib/content.ts`,
 * which stays the single source of truth. Safe to re-run: business units are
 * upserted by slug, testimonials are fully replaced.
 *
 *   npm run seed
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in
 * .env.local (see SUPABASE_SETUP.md).
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import {
  businessUnits,
  testimonials,
  company,
  hero,
  eos,
  meaningfulLives,
  strategy,
  coreValues,
  journey,
  greatPlace,
  careers,
  investor,
  contact,
  nav,
} from "../lib/content";

// Minimal .env.local loader (avoids adding a dotenv dependency).
try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  /* no .env.local — rely on the ambient environment */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Add them to .env.local — see SUPABASE_SETUP.md."
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

async function main() {
  // Singleton / structured sections → site_content (upsert by key).
  const siteContent: Record<string, unknown> = {
    company,
    hero,
    eos,
    meaningfulLives,
    strategy,
    coreValues,
    journey,
    greatPlace,
    careers,
    investor,
    contact,
    nav,
  };
  const contentRows = Object.entries(siteContent).map(([key, data]) => ({
    key,
    data,
    updated_at: new Date().toISOString(),
  }));
  const { error: scErr } = await supabase
    .from("site_content")
    .upsert(contentRows, { onConflict: "key" });
  if (scErr) throw scErr;
  console.log(`✓ Seeded ${contentRows.length} content sections`);

  // Business units — upsert by slug so edits re-sync without duplicating.
  const unitRows = businessUnits.map((u, i) => ({
    slug: u.slug,
    name: u.name,
    short: u.short,
    sector: u.sector,
    tagline: u.tagline,
    summary: u.summary,
    description: u.description,
    accent: u.accent,
    founded: u.founded,
    highlights: u.highlights,
    services: u.services,
    sort_order: i,
    published: true,
    updated_at: new Date().toISOString(),
  }));

  const { error: buErr } = await supabase
    .from("business_units")
    .upsert(unitRows, { onConflict: "slug" });
  if (buErr) throw buErr;
  console.log(`✓ Seeded ${unitRows.length} business units`);

  // Testimonials — replace wholesale (no natural key).
  const { error: delErr } = await supabase
    .from("testimonials")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) throw delErr;

  const testimonialRows = testimonials.map((t, i) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    sort_order: i,
    published: true,
  }));
  const { error: tErr } = await supabase
    .from("testimonials")
    .insert(testimonialRows);
  if (tErr) throw tErr;
  console.log(`✓ Seeded ${testimonialRows.length} testimonials`);

  console.log("\nDone. Your site will now serve CMS content from Supabase.");
}

main().catch((e) => {
  console.error("Seed failed:", e.message ?? e);
  process.exit(1);
});
