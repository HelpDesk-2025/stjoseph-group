"use client";

import { useState, useTransition } from "react";
import { uploadImage } from "@/app/actions/admin/upload";

export default function GalleryField({
  label,
  value,
  folder = "misc",
  onChange,
}: {
  label: string;
  value: string[];
  folder?: string;
  onChange: (urls: string[]) => void;
}) {
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const urls = Array.isArray(value) ? value : [];

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    const fd = new FormData();
    fd.set("file", file);
    start(async () => {
      const res = await uploadImage(folder, fd);
      if (res.ok && res.url) onChange([...urls, res.url]);
      else setErr(res.error ?? "Upload failed.");
    });
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= urls.length) return;
    const next = [...urls];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
        {label}
      </span>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {urls.map((url, i) => (
          <div key={url + i} className="group relative overflow-hidden rounded-md border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-1.5 py-1">
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} className="text-white/80 hover:text-white" aria-label="Move left">←</button>
                <button type="button" onClick={() => move(i, 1)} className="text-white/80 hover:text-white" aria-label="Move right">→</button>
              </div>
              <button
                type="button"
                onClick={() => onChange(urls.filter((_, j) => j !== i))}
                className="text-white/80 hover:text-red-400"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <label className="grid aspect-[4/3] cursor-pointer place-items-center rounded-md border border-dashed border-white/20 font-mono text-[11px] text-ink-300 hover:border-amber hover:text-amber">
          {pending ? "…" : "+ Add"}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={pending} />
        </label>
      </div>
      {err && <p className="mt-2 font-mono text-[11px] text-red-400">{err}</p>}
    </div>
  );
}
