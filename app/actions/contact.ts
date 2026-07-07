"use server";

import { getServerSupabase } from "@/lib/supabase/server";

export type ContactState = {
  ok: boolean;
  stored: boolean;
  errors?: Record<string, string>;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handle a contact-form submission. Validates server-side, then inserts into
 * the `contact_messages` table. If Supabase is not connected yet the
 * submission is accepted (stored: false) so the marketing UX still works.
 */
export async function submitContact(formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!message) errors.message = "Please enter a message.";
  if (Object.keys(errors).length) return { ok: false, stored: false, errors };

  const supabase = getServerSupabase();
  if (!supabase) {
    console.warn("[contact] Supabase not configured — message not persisted.");
    return { ok: true, stored: false };
  }

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    company: company || null,
    message,
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return {
      ok: false,
      stored: false,
      message: "Something went wrong sending your message. Please try again.",
    };
  }

  return { ok: true, stored: true };
}
