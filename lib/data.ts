import "server-only";
import {
  testimonials as staticTestimonials,
  businessUnits as staticBusinessUnits,
  type BusinessUnit,
} from "@/lib/content";
import { getServerSupabase } from "@/lib/supabase/server";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/**
 * Content fetchers with graceful fallback: when Supabase is connected AND has
 * rows, we serve from the database (the CMS); otherwise we serve the static
 * content in `lib/content.ts`. Any error also falls back to static, so the
 * site never breaks because of a database hiccup.
 */

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

export async function getBusinessUnits(): Promise<BusinessUnit[]> {
  const supabase = getServerSupabase();
  if (!supabase) return staticBusinessUnits;

  try {
    const { data, error } = await supabase
      .from("business_units")
      .select(
        "slug, name, short, sector, tagline, summary, description, accent, founded, highlights, services"
      )
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticBusinessUnits;
    return data as BusinessUnit[];
  } catch {
    return staticBusinessUnits;
  }
}
