"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { journey as staticJourney } from "@/lib/content";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function Journey({
  data = staticJourney,
}: {
  data?: typeof staticJourney;
}) {
  const journey = data;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-24 sm:py-28">
      <div className="container-x lg:!pl-48">
        <SectionHeader
          eyebrow={journey.eyebrow}
          title={journey.title}
          intro={journey.intro}
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-0">
          {/* center line (desktop) / left line (mobile) */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
            <motion.div
              style={{ height }}
              className="w-px bg-gradient-to-b from-amber via-amber to-cyan"
            />
          </div>

          <div className="space-y-12">
            {journey.milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${
                    left ? "" : "sm:[direction:rtl]"
                  }`}
                >
                  {/* dot */}
                  <span className="absolute -left-[29px] top-1.5 z-10 h-4 w-4 rounded-full border-2 border-amber bg-navy sm:left-1/2 sm:-translate-x-1/2" />

                  <Reveal delay={0.05}>
                    <div
                      className={`rounded-card border border-white/10 bg-navy-800/50 p-6 [direction:ltr] transition-colors hover:border-amber/40 ${
                        left ? "sm:text-right" : ""
                      }`}
                    >
                      <span className="font-sans text-3xl font-bold text-gradient-amber">
                        {m.year}
                      </span>
                      <h3 className="mt-2 font-sans text-lg font-semibold text-white">
                        {m.title}
                      </h3>
                      <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink-200">
                        {m.desc}
                      </p>
                    </div>
                  </Reveal>
                  <div className="hidden sm:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
