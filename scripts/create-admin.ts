/**
 * Create (or re-grant) an admin account. Credentials are stored securely in
 * Supabase Auth (auth.users); this script also inserts the authorization grant
 * into the `admins` table. Safe to re-run.
 *
 *   npm run create-admin -- admin@example.com "a-strong-password"
 *   # or set ADMIN_EMAIL / ADMIN_PASSWORD in .env.local and run:
 *   npm run create-admin
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// Minimal .env.local loader (no dotenv dependency).
try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* rely on ambient env */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.argv[2] || process.env.ADMIN_EMAIL;
const password = process.argv[3] || process.env.ADMIN_PASSWORD;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.");
  process.exit(1);
}
if (!email || !password) {
  console.error('Usage: npm run create-admin -- <email> "<password>"  (or set ADMIN_EMAIL/ADMIN_PASSWORD)');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function main() {
  let userId: string | undefined;

  const { data: created, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (created?.user) {
    userId = created.user.id;
    console.log(`✓ Created auth user ${email}`);
  } else if (error && /already been registered|already exists/i.test(error.message)) {
    // Look up the existing user and (re)apply the password + admin grant.
    let page = 1;
    while (!userId) {
      const { data: list, error: listErr } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
      if (listErr) throw listErr;
      const found = list.users.find((u) => u.email?.toLowerCase() === email!.toLowerCase());
      if (found) userId = found.id;
      if (!list.users.length || list.users.length < 200) break;
      page += 1;
    }
    if (!userId) throw error;
    await supabase.auth.admin.updateUserById(userId, { password, email_confirm: true });
    console.log(`✓ User ${email} already existed — password reset and grant ensured`);
  } else if (error) {
    throw error;
  }

  const { error: grantErr } = await supabase
    .from("admins")
    .upsert({ user_id: userId, email }, { onConflict: "user_id" });
  if (grantErr) throw grantErr;

  console.log(`✓ Admin grant ensured for ${email}`);
  console.log("\nDone. Sign in at /admin/login");
}

main().catch((e) => {
  console.error("create-admin failed:", e.message ?? e);
  process.exit(1);
});
