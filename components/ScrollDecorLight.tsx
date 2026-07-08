"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Section-scoped parallax decor tuned for a LIGHT background — the counterpart
 * to ScrollDecor (which is hidden behind solid light sections). Absolutely
 * positioned inside a `relative overflow-hidden` section, behind the content.
 * Soft warm orbs + thin dark geometric shapes that drift and rotate on scroll.
 * pointer-events-none; disabled under prefers-reduced-motion.
 */
export default function ScrollDecorLight() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const down = useTransform(scrollYProgress, [0, 1], ["-8vh", "8vh"]);
  const up = useTransform(scrollYProgress, [0, 1], ["8vh", "-8vh"]);
  const driftX = useTransform(scrollYProgress, [0, 1], ["-4vw", "6vw"]);
  const driftXNeg = useTransform(scrollYProgress, [0, 1], ["4vw", "-6vw"]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const spinNeg = useTransform(scrollYProgress, [0, 1], [0, -140]);

  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* soft warm orbs */}
      <motion.div
        style={{ y: down, x: driftX }}
        className="absolute left-[4%] top-[12%] h-64 w-64 rounded-full bg-amber/20 blur-[100px]"
      />
      <motion.div
        style={{ y: up, x: driftXNeg }}
        className="absolute right-[6%] top-[55%] h-72 w-72 rounded-full bg-[#CC7B1D]/12 blur-[120px]"
      />
      <motion.div
        style={{ y: down }}
        className="absolute left-[46%] top-[80%] h-56 w-56 rounded-full bg-[#229BF1]/10 blur-[110px]"
      />

      {/* thin dark geometric shapes */}
      <motion.div
        style={{ y: up, rotate: spin }}
        className="absolute right-[12%] top-[18%] h-28 w-28 rounded-[28%] border border-black/10"
      />
      <motion.div
        style={{ y: down, rotate: spinNeg }}
        className="absolute left-[8%] top-[62%] h-20 w-20 rounded-full border border-amber/40"
      />
      <motion.div
        style={{ y: up, x: driftX }}
        className="absolute left-[64%] top-[30%] h-14 w-14 rotate-45 border border-black/10"
      />
      <motion.div
        style={{ y: down, x: driftXNeg }}
        className="absolute left-[30%] top-[16%] h-2 w-2 rounded-full bg-amber/60"
      />
      <motion.div
        style={{ y: up }}
        className="absolute right-[22%] top-[72%] h-2.5 w-2.5 rounded-full bg-navy/30"
      />
      <motion.div
        style={{ y: down, x: driftX }}
        className="absolute left-[10%] top-[42%] h-px w-32 bg-gradient-to-r from-transparent via-black/15 to-transparent"
      />
    </div>
  );
}
