"use client";

import { useState } from "react";
import { contact as staticContact, company as staticCompany } from "@/lib/content";
import { submitContact } from "@/app/actions/contact";
import Reveal from "@/components/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({
  data = staticContact,
  company = staticCompany,
}: {
  data?: typeof staticContact;
  company?: typeof staticCompany;
}) {
  const contact = data;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const data = new FormData(e.currentTarget);

    setStatus("sending");
    const result = await submitContact(data);

    if (!result.ok) {
      setErrors(result.errors ?? {});
      setFormError(result.message ?? null);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("sent");
  }

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_0%_100%,rgba(204,123,29,0.12),transparent_60%)]" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">{contact.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 heading-lg text-gradient-amber">{contact.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-ink-200">
                {contact.body}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {contact.channels.map((c, i) => (
                <Reveal key={c.label} delay={0.12 + i * 0.05}>
                  <div className="rounded-card border border-white/10 bg-navy-800/50 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-300">
                      {c.label}
                    </p>
                    <a
                      href={`mailto:${c.value}`}
                      className="mt-1 block break-all font-mono text-[13px] text-cyan transition-colors hover:text-cyan-light"
                    >
                      {c.value}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-6 rounded-card border border-white/10 bg-navy-800/30 p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-300">
                  Head Office
                </p>
                <p className="mt-1 font-mono text-[13px] text-ink-100">
                  {company.address}
                </p>
                <p className="mt-1 font-mono text-[13px] text-ink-100">
                  {company.phone}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-card border border-white/10 bg-navy-800/50 p-8">
              {status === "sent" ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-amber/20 text-amber">
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-sans text-2xl font-semibold text-white">
                    Message received
                  </h3>
                  <p className="mt-3 max-w-xs font-mono text-[13px] text-ink-200">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-ghost mt-8"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <Field label="Full name" name="name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Juan dela Cruz"
                      className="field"
                    />
                  </Field>
                  <Field label="Email" name="email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="field"
                    />
                  </Field>
                  <Field label="Company (optional)" name="company">
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your organisation"
                      className="field"
                    />
                  </Field>
                  <Field label="Message" name="message" error={errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="How can we help?"
                      className="field resize-none"
                    />
                  </Field>

                  {formError && (
                    <p role="alert" className="font-mono text-[12px] text-[#FF6B6B]">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy/40 border-t-navy" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        :global(.field) {
          width: 100%;
          border-radius: 6px;
          border: 1px solid #4f515f;
          background: #1e1e33;
          padding: 12px 16px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 14px;
          color: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.field::placeholder) {
          color: #989898;
        }
        :global(.field:focus) {
          outline: none;
          border-color: #229bf1;
          box-shadow: 0 0 0 3px rgba(34, 155, 241, 0.15);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-sans text-sm font-medium text-white"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 font-mono text-[11px] text-[#FF6B6B]">
          {error}
        </p>
      )}
    </div>
  );
}
