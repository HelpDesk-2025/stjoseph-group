"use client";

import { motion } from "framer-motion";
import { meaningfulLives as staticMeaningfulLives } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function MeaningfulLives({
  data = staticMeaningfulLives,
}: {
  data?: typeof staticMeaningfulLives;
}) {
  const meaningfulLives = data;
  return (
    <section id="purpose" className="relative overflow-hidden py-24 sm:py-28">
      {/* animated aurora backdrop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-[120px]"
        style={{
          background:
            "conic-gradient(from 0deg, #CC7B1D, #229BF1, #93D4FF, #CC7B1D)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-x relative lg:!pl-48">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow">{meaningfulLives.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-sans text-4xl font-medium leading-tight sm:text-6xl">
              <span className="text-gradient-amber">
                {meaningfulLives.title}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-2xl font-mono text-sm leading-relaxed text-ink-200 sm:text-[15px]">
              {meaningfulLives.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {meaningfulLives.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-card border border-white/10 bg-navy-800/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40">
                <div className="mb-5 h-px w-12 bg-amber transition-all duration-300 group-hover:w-20" />
                <h3 className="font-sans text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink-200">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
