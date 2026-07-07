"use client";

import { careers as staticCareers } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { CheckIcon, ArrowIcon } from "@/components/Icons";

export default function Careers({
  data = staticCareers,
}: {
  data?: typeof staticCareers;
}) {
  const careers = data;
  return (
    <section id="careers" className="section-light relative border-y border-white/10 bg-navy-900/40 py-24 sm:py-28">
      <div className="container-x lg:!pl-48">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <span className="eyebrow">{careers.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 heading-lg text-gradient-amber">{careers.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-ink-200">
                {careers.body}
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {careers.perks.map((p, i) => (
                <Reveal key={p} delay={0.12 + i * 0.05}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber/20 text-amber">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className="font-mono text-[13px] text-ink-100">{p}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-300">
                  Featured Openings
                </h3>
                <a href={careers.cta.href} className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan hover:text-cyan-light">
                  {careers.cta.label}
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
            <div className="space-y-3">
              {careers.openings.map((job, i) => (
                <Reveal key={job.role + job.unit} delay={i * 0.05}>
                  <a
                    href={careers.cta.href}
                    className="group flex items-center justify-between gap-4 rounded-card border border-white/10 bg-navy-800/50 p-5 transition-all duration-300 hover:border-amber/40 hover:bg-navy-800"
                  >
                    <div>
                      <p className="font-sans text-base font-medium text-white group-hover:text-amber">
                        {job.role}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-ink-300">
                        {job.unit} · {job.location}
                      </p>
                    </div>
                    <span className="flex items-center gap-3">
                      <span className="hidden rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-200 sm:inline">
                        {job.type}
                      </span>
                      <ArrowIcon className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-1 group-hover:text-amber" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
