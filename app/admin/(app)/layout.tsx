import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin, getSessionUser } from "@/lib/auth";
import { signOut } from "@/app/actions/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const user = await getSessionUser();

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-sans text-sm font-semibold text-white">
            SJG Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="font-mono text-[12px] text-ink-300 hover:text-white"
            >
              View site ↗
            </Link>
            <span className="hidden font-mono text-[12px] text-ink-400 sm:inline">
              {user?.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[11px] text-ink-100 hover:border-white/40 hover:text-white"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
