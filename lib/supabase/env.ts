/**
 * Central place to read Supabase environment variables and know whether the
 * project has been connected yet. Until a Supabase project exists and these
 * are set (see SUPABASE_SETUP.md), the site keeps running on the static
 * content in `lib/content.ts` and forms degrade gracefully.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** True when the public (browser-safe) credentials are present. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** True when server-side (privileged) writes/reads are possible. */
export const isSupabaseServerConfigured = Boolean(
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
);
