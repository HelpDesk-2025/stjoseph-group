import Link from "next/link";
import { DASHBOARD_SECTIONS, COLLECTION_SECTIONS } from "@/app/admin/_lib/schemas";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-sans text-2xl font-semibold text-white">Content</h1>
      <p className="mt-2 font-mono text-[13px] text-ink-300">
        Edit the site’s text and settings. Changes go live immediately.
      </p>

      <h2 className="mt-10 font-mono text-[11px] uppercase tracking-widest text-amber">
        Collections
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {COLLECTION_SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-amber/40 hover:bg-white/[0.04]"
          >
            <p className="font-sans text-base font-medium text-white">{s.title}</p>
            <p className="mt-1 font-mono text-[11px] text-ink-300">{s.description}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 font-mono text-[11px] uppercase tracking-widest text-amber">
        Sections
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DASHBOARD_SECTIONS.map((s) => (
          <Link
            key={s.key}
            href={s.href!}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-amber/40 hover:bg-white/[0.04]"
          >
            <p className="font-sans text-sm font-medium text-white">{s.title}</p>
            <p className="mt-1 font-mono text-[11px] text-ink-300">Edit →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
