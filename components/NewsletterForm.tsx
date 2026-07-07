"use client";

import { useState } from "react";
import { subscribe } from "@/app/actions/subscribe";

export default function NewsletterForm({
  source = "footer",
}: {
  source?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    data.set("source", source);

    setStatus("sending");
    const result = await subscribe(data);
    if (!result.ok) {
      setError(result.error ?? "Something went wrong.");
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="font-mono text-[13px] text-cyan">
        Thanks — you&rsquo;re subscribed.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          aria-label="Email address"
          placeholder="you@company.com"
          className="min-w-0 flex-1 rounded-md border border-white/15 bg-navy-800 px-3 py-2 font-mono text-[13px] text-white placeholder:text-ink-300 focus:border-cyan focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 rounded-md bg-amber px-4 py-2 font-sans text-[13px] font-medium text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "…" : "Subscribe"}
        </button>
      </div>
      {error && (
        <p role="alert" className="font-mono text-[11px] text-[#FF6B6B]">
          {error}
        </p>
      )}
    </form>
  );
}
