"use server";

import { getServerSupabase } from "@/lib/supabase/server";

export type SubscribeState = {
  ok: boolean;
  stored: boolean;
  error?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Capture a newsletter / careers signup into the `signups` table.
 * `source` records where the signup came from (e.g. "footer", "careers").
 * Degrades gracefully (stored: false) until Supabase is connected.
 */
export async function subscribe(formData: FormData): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();
  const source = String(formData.get("source") ?? "footer").trim() || "footer";

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, stored: false, error: "Please enter a valid email address." };
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    console.warn("[subscribe] Supabase not configured — signup not persisted.");
    return { ok: true, stored: false };
  }

  // Ignore duplicate emails for the same source (unique constraint → 23505).
  const { error } = await supabase
    .from("signups")
    .insert({ email, source });

  if (error && error.code !== "23505") {
    console.error("[subscribe] insert failed:", error.message);
    return { ok: false, stored: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true, stored: true };
}
