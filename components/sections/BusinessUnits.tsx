"use client";

import Link from "next/link";
import { businessUnits } from "@/lib/content";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { UnitIcon, ArrowIcon } from "@/components/Icons";

export default function BusinessUnits() {
  return (
    <section id="business-units" className="section-light relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40 [background-image:linear-gradient(rgba(4,4,16,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(4,4,16,0.05)_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="container-x relative lg:!pl-48">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Our Businesses"
            title="Nine business units, one purpose"
            intro="A diversified portfolio spanning the industries that shape everyday Filipino life — each a leader in its field, each creating meaningful lives."
          />
          <Reveal delay={0.1}>
            <span className="font-mono text-xs text-ink-300">
              [ 09 ] Operating Companies
            </span>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessUnits.map((u, i) => (
            <Reveal key={u.slug} delay={(i % 3) * 0.08}>
              <TiltCard className="group h-full">
                <Link
                  href={`/business-units/${u.slug}`}
                  className="relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-navy-800/50 p-6 shadow-soft transition-colors duration-300 hover:border-white/25"
                >
                  {/* accent glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: u.accent }}
                  />

                  <div className="flex items-start justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-xl border border-white/10"
                      style={{
                        color: u.accent,
                        background: `${u.accent}1a`,
                      }}
                    >
                      <UnitIcon slug={u.slug} />
                    </span>
                    <span className="font-mono text-[11px] text-ink-400">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 font-sans text-lg font-semibold leading-snug text-white">
                    {u.name}
                  </h3>
                  <p
                    className="mt-1 font-mono text-[11px] uppercase tracking-wider"
                    style={{ color: u.accent }}
                  >
                    {u.sector}
                  </p>
                  <p className="mt-4 flex-1 font-mono text-[13px] leading-relaxed text-ink-200">
                    {u.summary}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-white transition-colors group-hover:text-amber">
                    Explore
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
