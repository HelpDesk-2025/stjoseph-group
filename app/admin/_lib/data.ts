import "server-only";
import { getServerSupabase } from "@/lib/supabase/server";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Admin-only fetchers using the service-role client — they return ALL rows
 * (including unpublished), unlike the public fetchers in lib/data.ts.
 * Only ever called from admin routes, which are guarded.
 */

export async function getBusinessUnitsAdmin(): Promise<any[]> {
  const s = getServerSupabase();
  if (!s) return [];
  const { data } = await s
    .from("business_units")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getBusinessUnitAdmin(slug: string): Promise<any | null> {
  const s = getServerSupabase();
  if (!s) return null;
  const { data } = await s
    .from("business_units")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data ?? null;
}

export async function getTestimonialsAdmin(): Promise<any[]> {
  const s = getServerSupabase();
  if (!s) return [];
  const { data } = await s
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}
