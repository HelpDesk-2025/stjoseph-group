"use client";

import { useState, useTransition } from "react";
import { uploadImage } from "@/app/actions/admin/upload";

export default function ImageField({
  label,
  value,
  folder = "misc",
  onChange,
}: {
  label: string;
  value: string;
  folder?: string;
  onChange: (url: string) => void;
}) {
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    const fd = new FormData();
    fd.set("file", file);
    start(async () => {
      const res = await uploadImage(folder, fd);
      if (res.ok && res.url) onChange(res.url);
      else setErr(res.error ?? "Upload failed.");
    });
  };

  return (
    <div>
      <span className="mb-1.5 block font-sans text-[13px] font-medium text-white">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md border border-white/10 bg-navy-800">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center font-mono text-[10px] text-ink-400">
              none
            </div>
          )}
        </div>
        <label className="cursor-pointer rounded-md border border-white/15 px-3 py-1.5 font-mono text-[11px] text-ink-100 hover:border-amber hover:text-amber">
          {pending ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={pending} />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-mono text-[11px] text-ink-300 hover:text-red-400"
          >
            Remove
          </button>
        )}
      </div>
      {err && <p className="mt-1 font-mono text-[11px] text-red-400">{err}</p>}
    </div>
  );
}
