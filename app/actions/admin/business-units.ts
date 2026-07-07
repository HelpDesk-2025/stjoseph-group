"use server";

import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isAdmin } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase/server";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Result = { ok: boolean; error?: string };

function revalidateAll(slug?: string) {
  revalidatePath("/");
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/business-units/${slug}`);
}

async function client(): Promise<{ supabase: SupabaseClient | null; error?: string }> {
  if (!(await isAdmin())) return { supabase: null, error: "Unauthorized." };
  const supabase = getServerSupabase();
  if (!supabase) return { supabase: null, error: "Database not configured." };
  return { supabase };
}

export async function saveBusinessUnit(slug: string, dataJson: string): Promise<Result> {
  const { supabase, error: authError } = await client();
  if (!supabase) return { ok: false, error: authError };

  let d: any;
  try {
    d = JSON.parse(dataJson);
  } catch {
    return { ok: false, error: "Invalid data." };
  }

  const { error } = await supabase
    .from("business_units")
    .update({
      name: d.name,
      short: d.short,
      sector: d.sector,
      tagline: d.tagline,
      summary: d.summary,
      description: d.description,
      accent: d.accent,
      founded: d.founded,
      highlights: d.highlights ?? [],
      services: d.services ?? [],
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) return { ok: false, error: error.message };
  revalidateAll(slug);
  return { ok: true };
}

export async function setBusinessUnitPublished(
  slug: string,
  published: boolean
): Promise<Result> {
  const { supabase, error: authError } = await client();
  if (!supabase) return { ok: false, error: authError };
  const { error } = await supabase
    .from("business_units")
    .update({ published, updated_at: new Date().toISOString() })
    .eq("slug", slug);
  if (error) return { ok: false, error: error.message };
  revalidateAll(slug);
  return { ok: true };
}

export async function reorderBusinessUnits(slugs: string[]): Promise<Result> {
  const { supabase, error: authError } = await client();
  if (!supabase) return { ok: false, error: authError };
  for (let i = 0; i < slugs.length; i++) {
    const { error } = await supabase
      .from("business_units")
      .update({ sort_order: i })
      .eq("slug", slugs[i]);
    if (error) return { ok: false, error: error.message };
  }
  revalidateAll();
  return { ok: true };
}

export async function createBusinessUnit(dataJson: string): Promise<Result> {
  const { supabase, error: authError } = await client();
  if (!supabase) return { ok: false, error: authError };

  let d: any;
  try {
    d = JSON.parse(dataJson);
  } catch {
    return { ok: false, error: "Invalid data." };
  }
  if (!d.slug || !/^[a-z0-9-]+$/.test(d.slug)) {
    return { ok: false, error: "Slug must be lowercase letters, numbers, and hyphens." };
  }

  const { data: last } = await supabase
    .from("business_units")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = (last?.[0]?.sort_order ?? -1) + 1;

  const { error } = await supabase.from("business_units").insert({
    slug: d.slug,
    name: d.name ?? "New unit",
    short: d.short ?? d.name ?? "New unit",
    sector: d.sector ?? "",
    tagline: d.tagline ?? "",
    summary: d.summary ?? "",
    description: d.description ?? "",
    accent: d.accent ?? "#CC7B1D",
    founded: d.founded ?? "",
    highlights: d.highlights ?? [],
    services: d.services ?? [],
    sort_order: nextOrder,
    published: true,
  });
  if (error) return { ok: false, error: error.message };
  revalidateAll(d.slug);
  return { ok: true };
}

export async function deleteBusinessUnit(slug: string): Promise<Result> {
  const { supabase, error: authError } = await client();
  if (!supabase) return { ok: false, error: authError };
  const { error } = await supabase.from("business_units").delete().eq("slug", slug);
  if (error) return { ok: false, error: error.message };
  revalidateAll(slug);
  return { ok: true };
}
