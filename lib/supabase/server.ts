import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_ANON_KEY,
  isSupabaseServerConfigured,
} from "./env";

/**
 * Server-side Supabase client. Uses the service-role key when available so
 * server actions can insert rows and read unpublished content regardless of
 * RLS. Falls back to the anon key for read-only use. Returns `null` when the
 * project has not been connected yet, so callers can degrade gracefully.
 */
export function getServerSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL) return null;
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (!key) return null;
  return createClient(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export { isSupabaseServerConfigured };
