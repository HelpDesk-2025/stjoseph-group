"use server";

import { redirect } from "next/navigation";
import { createSSRServerClient } from "@/lib/supabase/ssr-server";

/** Sign the admin out and return to the login page. */
export async function signOut() {
  const supabase = createSSRServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
