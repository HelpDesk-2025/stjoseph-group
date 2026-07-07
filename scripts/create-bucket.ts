/**
 * Create the public `site-images` Storage bucket (idempotent). Public read;
 * writes only happen server-side via the service-role client in the upload
 * action, so no extra RLS policies are needed.
 *
 *   npm run create-bucket
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* rely on ambient env */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function main() {
  const { error } = await supabase.storage.createBucket("site-images", {
    public: true,
    fileSizeLimit: "10MB",
  });
  if (error && !/already exists/i.test(error.message)) throw error;
  console.log(
    error ? "✓ Bucket 'site-images' already exists" : "✓ Created public bucket 'site-images'"
  );
}

main().catch((e) => {
  console.error("create-bucket failed:", e.message ?? e);
  process.exit(1);
});
