import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/ssr-middleware";

/**
 * Protects /admin routes: refreshes the session, then requires a logged-in
 * user who is present in the `admins` table. Non-admins are bounced to the
 * login page. This is a UX gate — the real enforcement is isAdmin() inside
 * each admin server action.
 */
export async function middleware(request: NextRequest) {
  const { response, user, supabase } = await updateSession(request);
  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";

  if (!user) {
    if (isLoginRoute) return response;
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  let admin = false;
  if (supabase) {
    const { data } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    admin = Boolean(data);
  }

  if (!admin) {
    if (isLoginRoute) return response;
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "not-admin");
    return NextResponse.redirect(url);
  }

  // Logged-in admin visiting the login page → send to the dashboard.
  if (isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
