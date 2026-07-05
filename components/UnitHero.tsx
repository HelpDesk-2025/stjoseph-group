"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BusinessUnit } from "@/lib/content";
import { UnitIcon } from "@/components/Icons";

const UnitScene = dynamic(() => import("@/components/three/UnitScene"), {
  ssr: false,
});

export default function UnitHero({
  unit,
  index,
}: {
  unit: BusinessUnit;
  index: number;
}) {
  return (
    <section className="relative min-h-[85svh] overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <UnitScene color={unit.accent} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-navy/60 via-navy/30 to-navy" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 70% 20%, ${unit.accent}22, transparent 60%)`,
        }}
      />

      <div className="container-x relative z-10 flex min-h-[85svh] flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-ink-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/#business-units" className="hover:text-white">
              Businesses
            </Link>
            <span>/</span>
            <span className="text-white">{unit.short}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span
              className="grid h-14 w-14 place-items-center rounded-xl border border-white/15"
              style={{ color: unit.accent, background: `${unit.accent}1a` }}
            >
              <UnitIcon slug={unit.slug} className="h-7 w-7" />
            </span>
            <div>
              <span
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: unit.accent }}
              >
                {unit.sector}
              </span>
              <p className="font-mono text-[11px] text-ink-400">
                Business Unit 0{index + 1} · Est. {unit.founded}
              </p>
            </div>
          </div>

          <h1 className="mt-7 font-sans text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
            {unit.name}
          </h1>
          <p className="mt-5 max-w-xl font-sans text-lg font-light text-ink-100">
            {unit.tagline}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/#contact" className="btn-primary">
              Partner with us
            </Link>
            <Link href="/#business-units" className="btn-ghost">
              All businesses
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
