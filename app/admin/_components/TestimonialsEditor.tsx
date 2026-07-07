"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveTestimonials } from "@/app/actions/admin/testimonials";

/* eslint-disable @typescript-eslint/no-explicit-any */

type Item = { quote: string; name: string; role: string; published: boolean };

const inputCls =
  "w-full rounded-md border border-white/15 bg-navy-800 px-3 py-2 font-sans text-sm text-white focus:border-cyan focus:outline-none";

export default function TestimonialsEditor({ initial }: { initial: any[] }) {
  const [items, setItems] = useState<Item[]>(
    initial.map((t) => ({
      quote: t.quote ?? "",
      name: t.name ?? "",
      role: t.role ?? "",
      published: t.published !== false,
    }))
  );
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const update = (i: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => setItems((prev) => prev.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };
  const add = () =>
    setItems((prev) => [...prev, { quote: "", name: "", role: "", published: true }]);

  const onSave = () => {
    setMsg(null);
    setErr(null);
    start(async () => {
      const res = await saveTestimonials(JSON.stringify(items));
      if (res.ok) {
        setMsg("Saved. Changes are live.");
        router.refresh();
      } else {
        setErr(res.error ?? "Save failed.");
      }
    });
  };

  return (
    <div className="space-y-4">
      {items.map((t, i) => (
        <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] text-ink-300">Testimonial {i + 1}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(i, -1)} className="px-2 text-ink-300 hover:text-white" aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} className="px-2 text-ink-300 hover:text-white" aria-label="Move down">↓</button>
              <button
                onClick={() => update(i, { published: !t.published })}
                className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${
                  t.published ? "bg-cyan/15 text-cyan" : "bg-white/5 text-ink-300"
                }`}
              >
                {t.published ? "Published" : "Hidden"}
              </button>
              <button onClick={() => remove(i)} className="px-2 text-ink-300 hover:text-red-400" aria-label="Remove">×</button>
            </div>
          </div>
          <div className="space-y-3">
            <textarea
              className={`${inputCls} resize-y`}
              rows={3}
              placeholder="Quote"
              value={t.quote}
              onChange={(e) => update(i, { quote: e.target.value })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className={inputCls}
                placeholder="Name"
                value={t.name}
                onChange={(e) => update(i, { name: e.target.value })}
              />
              <input
                className={inputCls}
                placeholder="Role"
                value={t.role}
                onChange={(e) => update(i, { role: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={add}
        className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[11px] text-ink-100 hover:border-amber hover:text-amber"
      >
        + Add testimonial
      </button>

      <div className="sticky bottom-0 -mx-4 flex items-center gap-4 border-t border-white/10 bg-navy/90 px-4 py-4 backdrop-blur">
        <button
          onClick={onSave}
          disabled={pending}
          className="rounded-md bg-amber px-5 py-2.5 font-sans text-sm font-medium text-navy hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {msg && <span className="font-mono text-[12px] text-cyan">{msg}</span>}
        {err && <span className="font-mono text-[12px] text-red-400">{err}</span>}
      </div>
    </div>
  );
}
