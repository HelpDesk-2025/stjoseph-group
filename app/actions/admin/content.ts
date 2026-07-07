"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase/server";
import { SITE_CONTENT_KEYS, type SiteContentKey } from "@/lib/data";

export type SaveResult = { ok: boolean; error?: string };

/**
 * Persist a site_content section. Guarded by isAdmin() BEFORE any service-role
 * write — this is the security boundary. On success, revalidates the routes
 * that render this content.
 */
export async function saveSiteContent(
  key: string,
  dataJson: string
): Promise<SaveResult> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized." };

  if (!SITE_CONTENT_KEYS.includes(key as SiteContentKey)) {
    return { ok: false, error: "Unknown section." };
  }

  let data: unknown;
  try {
    data = JSON.parse(dataJson);
  } catch {
    return { ok: false, error: "Invalid data." };
  }

  const supabase = getServerSupabase();
  if (!supabase) return { ok: false, error: "Database not configured." };

  const { error } = await supabase
    .from("site_content")
    .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: "key" });

  if (error) return { ok: false, error: error.message };

  // Home renders most sections; layout renders nav/company; investor its own page.
  revalidatePath("/");
  revalidatePath("/", "layout");
  revalidatePath("/investor-relations");
  return { ok: true };
}
