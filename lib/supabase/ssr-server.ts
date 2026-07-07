import "server-only";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./env";

/**
 * User-scoped Supabase client for Server Components, Route Handlers, and Server
 * Actions. Reads the auth session from cookies (anon key + user JWT → RLS
 * applies). Returns null until Supabase is configured.
 *
 * Writing cookies only works in Route Handlers / Server Actions / middleware;
 * from a Server Component the setAll call throws and is safely ignored (the
 * middleware refreshes the session).
 */
export function createSSRServerClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          /* called from a Server Component — ignore; middleware handles refresh */
        }
      },
    },
  });
}
