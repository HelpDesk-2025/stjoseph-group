/**
 * Seed the Supabase CMS tables from the static content in `lib/content.ts`.
 *
 *   npm run seed
 *
 * SAFE / ADDITIVE: this only inserts rows that don't already exist. It never
 * overwrites or deletes content you've edited in the admin, so it is safe to
 * run at any time (e.g. to populate a brand-new project). Existing site
 * sections, business units, and testimonials are left untouched.
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
import { fallbackGallery } from "../lib/unit-gallery";

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
  // ── Singleton sections → site_content (insert ONLY missing keys) ────────
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
  const { data: existingContent } = await supabase
    .from("site_content")
    .select("key");
  const existingKeys = new Set((existingContent ?? []).map((r) => r.key));
  const contentRows = Object.entries(siteContent)
    .filter(([k]) => !existingKeys.has(k))
    .map(([key, data]) => ({ key, data, updated_at: new Date().toISOString() }));
  if (contentRows.length) {
    const { error } = await supabase.from("site_content").insert(contentRows);
    if (error) throw error;
  }
  console.log(
    `✓ Content sections: ${contentRows.length} added, ${existingKeys.size} left untouched`
  );

  // ── Business units (insert ONLY missing slugs) ──────────────────────────
  const { data: existingUnits } = await supabase
    .from("business_units")
    .select("slug");
  const existingSlugs = new Set((existingUnits ?? []).map((r) => r.slug));
  const unitRows = businessUnits
    .filter((u) => !existingSlugs.has(u.slug))
    .map((u, i) => ({
      slug: u.slug,
      name: u.name,
      short: u.short,
      sector: u.sector,
      tagline: u.tagline,
      summary: u.summary,
      description: u.description,
      accent: u.accent,
      founded: u.founded,
      logo: null,
      page_logo: null,
      hero_image: null,
      gallery: fallbackGallery(u.slug, 1200),
      highlights: u.highlights,
      services: u.services,
      sort_order: existingSlugs.size + i,
      published: true,
      updated_at: new Date().toISOString(),
    }));
  if (unitRows.length) {
    const { error } = await supabase.from("business_units").insert(unitRows);
    if (error) throw error;
  }
  console.log(
    `✓ Business units: ${unitRows.length} added, ${existingSlugs.size} left untouched`
  );

  // ── Testimonials (seed ONLY if the table is empty) ──────────────────────
  const { count } = await supabase
    .from("testimonials")
    .select("*", { count: "exact", head: true });
  if (!count) {
    const rows = testimonials.map((t, i) => ({
      quote: t.quote,
      name: t.name,
      role: t.role,
      sort_order: i,
      published: true,
    }));
    const { error } = await supabase.from("testimonials").insert(rows);
    if (error) throw error;
    console.log(`✓ Testimonials: ${rows.length} added`);
  } else {
    console.log(`✓ Testimonials: ${count} already present, left untouched`);
  }

  console.log("\nDone (additive seed — nothing overwritten).");
}

main().catch((e) => {
  console.error("Seed failed:", e.message ?? e);
  process.exit(1);
});
