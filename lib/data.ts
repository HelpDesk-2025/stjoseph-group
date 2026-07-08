import "server-only";
import {
  testimonials as staticTestimonials,
  businessUnits as staticBusinessUnits,
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
  ui,
  type BusinessUnit,
  type UnitMedia,
} from "@/lib/content";
import { getServerSupabase } from "@/lib/supabase/server";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/** A business unit as served to pages, including CMS-managed imagery. */
export type BusinessUnitWithImages = BusinessUnit & UnitMedia;

/**
 * Content fetchers with graceful fallback: when Supabase is connected AND has
 * rows, we serve from the database (the CMS); otherwise we serve the static
 * content in `lib/content.ts`. Any error also falls back to static, so the
 * site never breaks because of a database hiccup.
 */

/* ── Singleton / structured sections (site_content key → JSONB) ─────────── */

const staticByKey = {
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
  ui,
} as const;

export const SITE_CONTENT_KEYS = Object.keys(staticByKey) as SiteContentKey[];
export type SiteContentKey = keyof typeof staticByKey;

export async function getSiteContent<K extends SiteContentKey>(
  key: K
): Promise<(typeof staticByKey)[K]> {
  const fallback = staticByKey[key];
  const supabase = getServerSupabase();
  if (!supabase) return fallback;

  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("key", key)
      .maybeSingle();

    if (error || !data?.data) return fallback;

    // Arrays (nav, coreValues) replace wholesale when the DB has a non-empty
    // array; objects shallow-merge DB over static so half-filled rows never
    // drop fields the UI relies on.
    if (Array.isArray(fallback)) {
      return (Array.isArray(data.data) && data.data.length
        ? data.data
        : fallback) as (typeof staticByKey)[K];
    }
    return { ...fallback, ...(data.data as object) } as (typeof staticByKey)[K];
  } catch {
    return fallback;
  }
}

/* ── Testimonials ──────────────────────────────────────────────────────── */

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getServerSupabase();
  if (!supabase) return staticTestimonials;

  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("quote, name, role")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticTestimonials;
    return data as Testimonial[];
  } catch {
    return staticTestimonials;
  }
}

/* ── Business units ────────────────────────────────────────────────────── */

const BU_COLUMNS =
  "slug, name, short, sector, tagline, summary, description, accent, founded, highlights, services, logo, page_logo, hero_image, gallery";

export async function getBusinessUnits(): Promise<BusinessUnitWithImages[]> {
  const supabase = getServerSupabase();
  if (!supabase) return staticBusinessUnits;

  try {
    const { data, error } = await supabase
      .from("business_units")
      .select(BU_COLUMNS)
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticBusinessUnits;
    return data as unknown as BusinessUnitWithImages[];
  } catch {
    return staticBusinessUnits;
  }
}

export async function getBusinessUnit(
  slug: string
): Promise<BusinessUnitWithImages | null> {
  const staticUnit = staticBusinessUnits.find((u) => u.slug === slug) ?? null;
  const supabase = getServerSupabase();
  if (!supabase) return staticUnit;

  try {
    const { data, error } = await supabase
      .from("business_units")
      .select(BU_COLUMNS)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error || !data) return staticUnit;
    return data as unknown as BusinessUnitWithImages;
  } catch {
    return staticUnit;
  }
}

/** Slugs for generateStaticParams — union of static + DB, static as fallback. */
export async function getAllBusinessUnitSlugs(): Promise<string[]> {
  const staticSlugs = staticBusinessUnits.map((u) => u.slug);
  const supabase = getServerSupabase();
  if (!supabase) return staticSlugs;

  try {
    const { data, error } = await supabase
      .from("business_units")
      .select("slug")
      .eq("published", true);

    if (error || !data || data.length === 0) return staticSlugs;
    return Array.from(new Set([...staticSlugs, ...data.map((r) => r.slug)]));
  } catch {
    return staticSlugs;
  }
}
