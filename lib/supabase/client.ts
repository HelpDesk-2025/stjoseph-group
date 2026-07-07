"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./env";

let browserClient: SupabaseClient | null = null;

/**
 * Browser Supabase client (anon key, RLS-protected). Memoised so we only ever
 * create one instance. Returns `null` until the project is connected.
 */
export function getBrowserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!browserClient) {
    browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return browserClient;
}
