"use client";

import { coreValues as staticCoreValues, ui as staticUi } from "@/lib/content";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function CoreValues({
  items = staticCoreValues,
  header = staticUi.coreValues,
}: {
  items?: typeof staticCoreValues;
  header?: typeof staticUi.coreValues;
}) {
  const coreValues = items;
  return (
    <section id="values" className="section-light relative border-y border-white/10 bg-navy-900/40 py-24 sm:py-28">
      <div className="container-x lg:!pl-48">
        <SectionHeader
          eyebrow={header.eyebrow}
          title={header.title}
          intro={header.intro}
          center
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {coreValues.map((v, i) => (
            <Reveal key={v.num} delay={i * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-card border border-white/10 bg-navy-800/50 p-6 transition-all duration-300 hover:border-amber/40 hover:bg-navy-800">
                <span className="block font-sans text-5xl font-bold text-white/10 transition-colors duration-300 group-hover:text-amber/40">
                  {v.num}
                </span>
                <h3 className="mt-4 font-sans text-lg font-semibold text-white">
                  {v.title}
                </h3>
                <p className="mt-3 font-mono text-[12px] leading-relaxed text-ink-200">
                  {v.desc}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-amber to-amber-light transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
