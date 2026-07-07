"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  reorderBusinessUnits,
  setBusinessUnitPublished,
  deleteBusinessUnit,
  createBusinessUnit,
} from "@/app/actions/admin/business-units";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function BusinessUnitsList({ initial }: { initial: any[] }) {
  const [rows, setRows] = useState<any[]>(initial);
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [newSlug, setNewSlug] = useState("");
  const [newName, setNewName] = useState("");
  const router = useRouter();

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>) => {
    setErr(null);
    start(async () => {
      const res = await fn();
      if (!res.ok) setErr(res.error ?? "Action failed.");
      else router.refresh();
    });
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    setRows(next);
    run(() => reorderBusinessUnits(next.map((r) => r.slug)));
  };

  return (
    <div>
      {err && <p className="mb-4 font-mono text-[12px] text-red-400">{err}</p>}

      <div className="space-y-2">
        {rows.map((u, i) => (
          <div
            key={u.slug}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3"
          >
            <div className="flex flex-col">
              <button
                onClick={() => move(i, -1)}
                disabled={pending || i === 0}
                className="px-1 text-ink-300 hover:text-white disabled:opacity-30"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={pending || i === rows.length - 1}
                className="px-1 text-ink-300 hover:text-white disabled:opacity-30"
                aria-label="Move down"
              >
                ↓
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-sm font-medium text-white">{u.name}</p>
              <p className="truncate font-mono text-[11px] text-ink-300">/{u.slug}</p>
            </div>

            <button
              onClick={() => run(() => setBusinessUnitPublished(u.slug, !u.published))}
              disabled={pending}
              className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${
                u.published
                  ? "bg-cyan/15 text-cyan"
                  : "bg-white/5 text-ink-300"
              }`}
            >
              {u.published ? "Published" : "Hidden"}
            </button>

            <Link
              href={`/admin/business-units/${u.slug}`}
              className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[11px] text-ink-100 hover:border-amber hover:text-amber"
            >
              Edit
            </Link>

            <button
              onClick={() => {
                if (confirm(`Delete "${u.name}"? This cannot be undone.`))
                  run(() => deleteBusinessUnit(u.slug));
              }}
              disabled={pending}
              className="rounded-md border border-white/15 px-2.5 py-1.5 font-mono text-[11px] text-ink-300 hover:border-red-400 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-amber">Add a unit</p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="block">
            <span className="mb-1 block font-sans text-[12px] text-ink-200">Slug</span>
            <input
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              placeholder="new-unit"
              className="rounded-md border border-white/15 bg-navy-800 px-3 py-2 font-mono text-sm text-white focus:border-cyan focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-sans text-[12px] text-ink-200">Name</span>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Unit"
              className="rounded-md border border-white/15 bg-navy-800 px-3 py-2 font-sans text-sm text-white focus:border-cyan focus:outline-none"
            />
          </label>
          <button
            onClick={() => {
              if (!newSlug.trim()) return;
              run(() =>
                createBusinessUnit(
                  JSON.stringify({ slug: newSlug.trim(), name: newName.trim() || newSlug.trim() })
                )
              );
              setNewSlug("");
              setNewName("");
            }}
            disabled={pending}
            className="rounded-md bg-amber px-4 py-2 font-sans text-sm font-medium text-navy hover:opacity-90 disabled:opacity-60"
          >
            Add unit
          </button>
        </div>
      </div>
    </div>
  );
}
