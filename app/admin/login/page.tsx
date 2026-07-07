"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSSRBrowserClient } from "@/lib/supabase/ssr-client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "not-admin") {
      setError("That account is not an admin.");
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createSSRBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center bg-navy px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-sans text-2xl font-semibold text-white">Admin sign in</h1>
        <p className="mt-2 font-mono text-[13px] text-ink-300">
          St. Joseph Group, Inc. content management
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <label className="block">
            <span className="mb-1.5 block font-sans text-[13px] font-medium text-white">Email</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/15 bg-navy-800 px-3 py-2.5 font-sans text-sm text-white focus:border-cyan focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-sans text-[13px] font-medium text-white">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/15 bg-navy-800 px-3 py-2.5 font-sans text-sm text-white focus:border-cyan focus:outline-none"
            />
          </label>

          {error && (
            <p role="alert" className="font-mono text-[12px] text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-amber px-5 py-2.5 font-sans text-sm font-medium text-navy transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
