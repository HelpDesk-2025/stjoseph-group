"use server";

import { isAdmin } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase/server";

export type UploadResult = { ok: boolean; url?: string; error?: string };

const BUCKET = "site-images";

/**
 * Upload an image to Supabase Storage and return its public URL.
 * Guarded by isAdmin(); uses the service-role client so no storage RLS write
 * policy is required. `folder` groups files (e.g. "business-units").
 */
export async function uploadImage(
  folder: string,
  formData: FormData
): Promise<UploadResult> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file provided." };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Please choose an image file." };
  }
  if (file.size > 10 * 1024 * 1024) {
    return { ok: false, error: "Image must be under 10MB." };
  }

  const supabase = getServerSupabase();
  if (!supabase) return { ok: false, error: "Database not configured." };

  const safeFolder = (folder || "misc").replace(/[^a-z0-9-]/gi, "").toLowerCase();
  const ext = (file.name.split(".").pop() || "jpg").replace(/[^a-z0-9]/gi, "").toLowerCase();
  // Time-based unique name (Date.now avoided in some contexts, fine in an action).
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const path = `${safeFolder}/${unique}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) return { ok: false, error: error.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
