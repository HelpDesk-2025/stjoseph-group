import Link from "next/link";
import { DASHBOARD_SECTIONS } from "@/app/admin/_lib/schemas";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const available = DASHBOARD_SECTIONS.filter((s) => s.available);
  const upcoming = DASHBOARD_SECTIONS.filter((s) => !s.available);

  return (
    <div>
      <h1 className="font-sans text-2xl font-semibold text-white">Content</h1>
      <p className="mt-2 font-mono text-[13px] text-ink-300">
        Edit the site’s text and settings. Changes go live immediately.
      </p>

      <h2 className="mt-10 font-mono text-[11px] uppercase tracking-widest text-amber">
        Editable now
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {available.map((s) => (
          <Link
            key={s.key}
            href={s.href!}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-amber/40 hover:bg-white/[0.04]"
          >
            <p className="font-sans text-base font-medium text-white">{s.title}</p>
            <p className="mt-1 font-mono text-[11px] text-ink-300">Edit →</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 font-mono text-[11px] uppercase tracking-widest text-ink-400">
        Coming in later phases
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {upcoming.map((s) => (
          <div
            key={s.key}
            className="rounded-lg border border-white/5 bg-white/[0.01] p-4 opacity-60"
          >
            <p className="font-sans text-sm text-ink-100">{s.title}</p>
            <p className="mt-1 font-mono text-[10px] text-ink-400">Soon</p>
          </div>
        ))}
      </div>
    </div>
  );
}
