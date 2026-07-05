"use client";

import { greatPlace } from "@/lib/content";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

export default function GreatPlace() {
  return (
    <section id="culture" className="section-light relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_0%,rgba(34,155,241,0.12),transparent_60%)]" />
      <div className="container-x relative lg:!pl-48">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">{greatPlace.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 heading-lg text-white">
                {greatPlace.title.split("Great Place To Work®")[0]}
                <span className="text-gradient-cyan">Great Place To Work®</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-ink-200">
                {greatPlace.body}
              </p>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-3">
              {greatPlace.badges.map((b, i) => (
                <Reveal key={b} delay={0.12 + i * 0.06}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] text-ink-100">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-amber" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    {b}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {greatPlace.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-card border border-white/10 bg-navy-800/50 p-6 text-center transition-colors hover:border-cyan/40">
                  <Counter
                    value={s.value}
                    className="font-sans text-4xl font-bold text-gradient-cyan"
                  />
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-ink-300">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
