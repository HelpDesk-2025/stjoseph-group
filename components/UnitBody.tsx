"use client";

import Link from "next/link";
import type { BusinessUnit } from "@/lib/content";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import TiltCard from "@/components/TiltCard";
import { UnitIcon, CheckIcon, ArrowIcon } from "@/components/Icons";

export default function UnitBody({
  unit,
  related,
}: {
  unit: BusinessUnit;
  related: BusinessUnit[];
}) {
  return (
    <>
      {/* Overview + highlights */}
      <section className="relative py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div>
              <span className="eyebrow">Overview</span>
              <p className="mt-6 font-sans text-xl font-light leading-relaxed text-white sm:text-2xl">
                {unit.description}
              </p>
              <div className="mt-8 h-px w-full bg-white/10" />
              <p className="mt-8 font-mono text-sm leading-relaxed text-ink-200">
                {unit.summary} As part of St. Joseph Group, {unit.short} operates on
                the shared EOS® framework and the group&apos;s five core values —
                aligning every decision with our purpose of creating meaningful lives.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4">
              {unit.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-card border border-white/10 bg-navy-800/50 p-6"
                >
                  <Counter
                    value={h.value}
                    className="font-sans text-4xl font-bold"
                  />
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-300">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="relative border-y border-white/10 bg-navy-900/40 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">What We Do</span>
            <h2 className="mt-4 heading-lg text-white">
              Services &amp; capabilities
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {unit.services.map((s, i) => (
              <Reveal key={s} delay={i * 0.06}>
                <div
                  className="group flex items-center gap-4 rounded-card border border-white/10 bg-navy-800/40 p-6 transition-colors hover:border-white/25"
                  style={{ borderLeftColor: unit.accent, borderLeftWidth: 3 }}
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                    style={{ background: `${unit.accent}22`, color: unit.accent }}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="font-sans text-base font-medium text-white">
                    {s}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative py-20">
        <div className="container-x">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-card border border-white/10 p-10 text-center sm:p-16"
              style={{
                background: `linear-gradient(135deg, ${unit.accent}1f, rgba(10,10,31,0.6))`,
              }}
            >
              <h2 className="mx-auto max-w-2xl font-sans text-3xl font-medium text-white sm:text-4xl">
                Ready to build something meaningful with {unit.short}?
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/#contact" className="btn-primary">
                  Get in touch
                </Link>
                <Link href="/investor-relations" className="btn-ghost">
                  Investor relations
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related units */}
      <section className="relative pb-24">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="heading-lg text-white">Explore more businesses</h2>
              <Link
                href="/#business-units"
                className="hidden items-center gap-2 font-mono text-xs text-cyan hover:text-cyan-light sm:inline-flex"
              >
                View all 9 <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <TiltCard className="group h-full">
                  <Link
                    href={`/business-units/${r.slug}`}
                    className="relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-navy-800/50 p-6 transition-colors hover:border-white/25"
                  >
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10"
                      style={{ color: r.accent, background: `${r.accent}1a` }}
                    >
                      <UnitIcon slug={r.slug} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-sans text-base font-semibold text-white">
                      {r.name}
                    </h3>
                    <p className="mt-2 flex-1 font-mono text-[12px] text-ink-200">
                      {r.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-sm text-white group-hover:text-amber">
                      Explore <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
