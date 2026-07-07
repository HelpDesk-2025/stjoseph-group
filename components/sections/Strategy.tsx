"use client";

import { strategy as staticStrategy } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function Strategy({
  data = staticStrategy,
}: {
  data?: typeof staticStrategy;
}) {
  const { coreFocus, mission, vision } = data;
  return (
    <section id="strategy" className="relative py-24 sm:py-28">
      <div className="container-x lg:!pl-48">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Core Focus (spans full width feel) */}
          <Reveal className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-card border border-amber/30 bg-gradient-to-br from-amber/[0.12] via-navy-800/40 to-navy-800/40 p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-amber/20 blur-3xl" />
              <span className="eyebrow">{coreFocus.label}</span>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-300">
                    Purpose · Cause · Passion
                  </p>
                  <p className="mt-2 font-sans text-2xl font-medium text-white sm:text-3xl">
                    {coreFocus.purpose}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-300">
                    Our Niche
                  </p>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-ink-100">
                    {coreFocus.niche}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mission */}
          <Reveal delay={0.05} className="lg:col-span-2">
            <div className="h-full rounded-card border border-white/10 bg-navy-800/50 p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan/15 text-cyan">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                  {mission.label}
                </span>
              </div>
              <p className="mt-6 font-sans text-lg font-light leading-relaxed text-white sm:text-xl">
                {mission.text}
              </p>
            </div>
          </Reveal>

          {/* Vision */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-card border border-white/10 bg-navy-800/50 p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-amber/15 text-amber">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                  {vision.label}
                </span>
              </div>
              <p className="mt-6 font-sans text-base font-light leading-relaxed text-white">
                {vision.text}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
