import "server-only";
import type { User } from "@supabase/supabase-js";
import { createSSRServerClient } from "./supabase/ssr-server";

/** The currently logged-in Supabase user, or null. */
export async function getSessionUser(): Promise<User | null> {
  const supabase = createSSRServerClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

/**
 * True only if the caller is logged in AND has a row in `admins`.
 * This is the real security boundary — every admin write action calls it
 * before touching the service-role client.
 */
export async function isAdmin(): Promise<boolean> {
  const supabase = createSSRServerClient();
  if (!supabase) return false;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  return Boolean(data);
}
