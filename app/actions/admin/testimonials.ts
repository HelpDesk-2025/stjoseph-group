"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase/server";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Result = { ok: boolean; error?: string };

/** Replace the full testimonials list (matches the seed's wholesale approach). */
export async function saveTestimonials(dataJson: string): Promise<Result> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized." };
  const supabase = getServerSupabase();
  if (!supabase) return { ok: false, error: "Database not configured." };

  let list: any[];
  try {
    list = JSON.parse(dataJson);
  } catch {
    return { ok: false, error: "Invalid data." };
  }
  if (!Array.isArray(list)) return { ok: false, error: "Invalid data." };

  const del = await supabase
    .from("testimonials")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (del.error) return { ok: false, error: del.error.message };

  if (list.length) {
    const rows = list.map((t, i) => ({
      quote: t.quote ?? "",
      name: t.name ?? "",
      role: t.role ?? "",
      published: t.published !== false,
      sort_order: i,
    }));
    const ins = await supabase.from("testimonials").insert(rows);
    if (ins.error) return { ok: false, error: ins.error.message };
  }

  revalidatePath("/");
  return { ok: true };
}
