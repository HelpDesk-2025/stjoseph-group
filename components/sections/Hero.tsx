"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { hero } from "@/lib/content";
import LogoMarquee from "@/components/sections/LogoMarquee";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse-slow rounded-full bg-amber/20 blur-3xl" />
    </div>
  ),
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* gradient wash for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-navy/70 via-navy/20 to-navy" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(204,123,29,0.18),transparent_70%)]" />

      {/* content — let empty areas pass pointer events through to the 3D canvas */}
      <div className="container-x pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="pointer-events-auto max-w-3xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-amber"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-sans text-4xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {hero.title}
            <br />
            <span className="text-gradient-amber">{hero.titleAccent}</span>
            <br />
            {hero.titleEnd}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl font-mono text-sm leading-relaxed text-ink-200 sm:text-[15px]"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href={hero.secondaryCta.href} className="btn-ghost">
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          {/* stats */}
          <motion.dl
            variants={item}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-card border border-white/10 bg-white/5 sm:grid-cols-4"
          >
            {hero.stats.map((s) => (
              <div key={s.label} className="bg-navy/40 px-5 py-5 backdrop-blur-sm">
                <dt className="font-sans text-2xl font-semibold text-white sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-300">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* business unit logos */}
          <motion.div variants={item} className="mt-8 max-w-2xl">
            <LogoMarquee />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-ink-300">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-amber" />
          </span>
        </div>
      </div>
    </section>
  );
}
