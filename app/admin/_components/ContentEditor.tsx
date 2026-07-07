"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Field, SectionSchema } from "@/app/admin/_lib/schemas";
import { saveSiteContent } from "@/app/actions/admin/content";
import ImageField from "@/app/admin/_components/ImageField";
import GalleryField from "@/app/admin/_components/GalleryField";

/* eslint-disable @typescript-eslint/no-explicit-any */

const inputCls =
  "w-full rounded-md border border-white/15 bg-navy-800 px-3 py-2 font-sans text-sm text-white placeholder:text-ink-300 focus:border-cyan focus:outline-none";

// Immutable set at a nested path.
function setIn(obj: any, path: (string | number)[], value: any): any {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  const clone = Array.isArray(obj) ? [...obj] : { ...(obj ?? {}) };
  clone[head] = setIn(obj?.[head], rest, value);
  return clone;
}

function emptyFor(field: Field): any {
  switch (field.kind) {
    case "text":
    case "textarea":
      return "";
    case "stringlist":
      return [];
    case "group":
      return Object.fromEntries(field.fields.map((f) => [f.name, emptyFor(f)]));
    case "objectlist":
      return [];
  }
}
function emptyItem(fields: Field[]): any {
  return Object.fromEntries(fields.map((f) => [f.name, emptyFor(f)]));
}

export default function ContentEditor({
  schema,
  initial,
  onSave,
}: {
  schema: SectionSchema;
  initial: any;
  /** Override the save behavior (e.g. business units). Defaults to saveSiteContent. */
  onSave?: (json: string) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [data, setData] = useState<any>(initial ?? (schema.rootList ? [] : {}));
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const update = (path: (string | number)[], value: any) =>
    setData((prev: any) => setIn(prev, path, value));

  const handleSave = () => {
    setMsg(null);
    setErr(null);
    start(async () => {
      const json = JSON.stringify(data);
      const res = onSave
        ? await onSave(json)
        : await saveSiteContent(schema.key, json);
      if (res.ok) {
        setMsg("Saved. Changes are live.");
        router.refresh();
      } else {
        setErr(res.error ?? "Save failed.");
      }
    });
  };

  const getAt = (path: (string | number)[]) =>
    path.reduce((acc, k) => acc?.[k], data);

  function renderField(field: Field, path: (string | number)[]) {
    const value = getAt(path);

    switch (field.kind) {
      case "text":
        return (
          <label className="block">
            <span className="mb-1.5 block font-sans text-[13px] font-medium text-white">
              {field.label}
            </span>
            <input
              className={inputCls}
              value={value ?? ""}
              onChange={(e) => update(path, e.target.value)}
            />
          </label>
        );
      case "textarea":
        return (
          <label className="block">
            <span className="mb-1.5 block font-sans text-[13px] font-medium text-white">
              {field.label}
            </span>
            <textarea
              className={`${inputCls} resize-y`}
              rows={3}
              value={value ?? ""}
              onChange={(e) => update(path, e.target.value)}
            />
          </label>
        );
      case "group":
        return (
          <fieldset className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <legend className="px-1 font-mono text-[11px] uppercase tracking-widest text-amber">
              {field.label}
            </legend>
            <div className="mt-2 space-y-4">
              {field.fields.map((f) => (
                <div key={f.name}>{renderField(f, [...path, f.name])}</div>
              ))}
            </div>
          </fieldset>
        );
      case "stringlist": {
        const arr: string[] = Array.isArray(value) ? value : [];
        return (
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
              {field.label}
            </span>
            <div className="mt-3 space-y-2">
              {arr.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputCls}
                    value={item ?? ""}
                    onChange={(e) => update([...path, i], e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => update(path, arr.filter((_, j) => j !== i))}
                    className="shrink-0 rounded-md border border-white/15 px-3 text-ink-200 hover:border-red-400 hover:text-red-400"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => update(path, [...arr, ""])}
              className="mt-3 rounded-md border border-white/15 px-3 py-1.5 font-mono text-[11px] text-ink-100 hover:border-amber hover:text-amber"
            >
              + Add
            </button>
          </div>
        );
      }
      case "image":
        return (
          <ImageField
            label={field.label}
            value={value ?? ""}
            folder={field.folder}
            onChange={(url) => update(path, url)}
          />
        );
      case "imagelist":
        return (
          <GalleryField
            label={field.label}
            value={Array.isArray(value) ? value : []}
            folder={field.folder}
            onChange={(urls) => update(path, urls)}
          />
        );
      case "objectlist": {
        const arr: any[] = Array.isArray(value) ? value : [];
        const move = (i: number, dir: -1 | 1) => {
          const j = i + dir;
          if (j < 0 || j >= arr.length) return;
          const next = [...arr];
          [next[i], next[j]] = [next[j], next[i]];
          update(path, next);
        };
        return (
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
              {field.label}
            </span>
            <div className="mt-3 space-y-4">
              {arr.map((_, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-navy-800/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-ink-300">
                      {field.itemLabel} {i + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => move(i, -1)} className="rounded px-2 text-ink-300 hover:text-white" aria-label="Move up">↑</button>
                      <button type="button" onClick={() => move(i, 1)} className="rounded px-2 text-ink-300 hover:text-white" aria-label="Move down">↓</button>
                      <button
                        type="button"
                        onClick={() => update(path, arr.filter((_, j) => j !== i))}
                        className="rounded px-2 text-ink-300 hover:text-red-400"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {field.fields.map((f) => (
                      <div key={f.name}>{renderField(f, [...path, i, f.name])}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => update(path, [...arr, emptyItem(field.fields)])}
              className="mt-3 rounded-md border border-white/15 px-3 py-1.5 font-mono text-[11px] text-ink-100 hover:border-amber hover:text-amber"
            >
              + Add {field.itemLabel.toLowerCase()}
            </button>
          </div>
        );
      }
    }
  }

  const rootField: Field | null = schema.rootList
    ? ({
        name: "",
        label: schema.title,
        kind: schema.rootList.kind,
        itemLabel: schema.rootList.itemLabel,
        fields: schema.rootList.fields ?? [],
      } as Field)
    : null;

  return (
    <div className="space-y-6">
      {rootField
        ? renderField(rootField, [])
        : (schema.fields ?? []).map((f) => (
            <div key={f.name}>{renderField(f, [f.name])}</div>
          ))}

      <div className="sticky bottom-0 -mx-4 flex items-center gap-4 border-t border-white/10 bg-navy/90 px-4 py-4 backdrop-blur">
        <button
          type="button"
          onClick={handleSave}
          disabled={pending}
          className="rounded-md bg-amber px-5 py-2.5 font-sans text-sm font-medium text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {msg && <span className="font-mono text-[12px] text-cyan">{msg}</span>}
        {err && <span className="font-mono text-[12px] text-red-400">{err}</span>}
      </div>
    </div>
  );
}
