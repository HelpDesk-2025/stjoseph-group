"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Fixed, behind-content parallax layer: soft colour orbs and thin geometric
 * shapes that drift (and rotate) as the page scrolls. Purely decorative —
 * pointer-events-none and disabled under prefers-reduced-motion. Sits behind
 * the (transparent) dark sections; hidden beneath the solid light sections.
 */
export default function ScrollDecor() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // several elements moving at different rates / directions
  const down = useTransform(scrollYProgress, [0, 1], ["0vh", "55vh"]);
  const downFast = useTransform(scrollYProgress, [0, 1], ["0vh", "85vh"]);
  const up = useTransform(scrollYProgress, [0, 1], ["0vh", "-45vh"]);
  const upSlow = useTransform(scrollYProgress, [0, 1], ["0vh", "-24vh"]);
  const driftX = useTransform(scrollYProgress, [0, 1], ["0vw", "12vw"]);
  const driftXBig = useTransform(scrollYProgress, [0, 1], ["0vw", "22vw"]);
  const driftXNeg = useTransform(scrollYProgress, [0, 1], ["0vw", "-10vw"]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const spinNeg = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const spinBig = useTransform(scrollYProgress, [0, 1], [0, 400]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* soft colour orbs */}
      <motion.div
        style={{ y: down, x: driftX }}
        className="absolute left-[6%] top-[14%] h-64 w-64 rounded-full bg-amber/20 blur-[100px]"
      />
      <motion.div
        style={{ y: up, x: driftXNeg }}
        className="absolute right-[8%] top-[48%] h-72 w-72 rounded-full bg-cyan/15 blur-[110px]"
      />
      <motion.div
        style={{ y: down }}
        className="absolute left-[42%] top-[82%] h-56 w-56 rounded-full bg-[#25AC1C]/15 blur-[100px]"
      />
      <motion.div
        style={{ y: upSlow, x: driftXBig }}
        className="absolute left-[78%] top-[8%] h-80 w-80 rounded-full bg-amber/10 blur-[130px]"
      />
      <motion.div
        style={{ y: downFast, x: driftXNeg }}
        className="absolute left-[20%] top-[38%] h-48 w-48 rounded-full bg-cyan/10 blur-[90px]"
      />

      {/* thin geometric shapes that drift + rotate */}
      <motion.div
        style={{ y: up, rotate: spin }}
        className="absolute right-[16%] top-[22%] h-28 w-28 rounded-[28%] border border-white/10"
      />
      <motion.div
        style={{ y: down, rotate: spinNeg }}
        className="absolute left-[12%] top-[58%] h-20 w-20 rounded-full border border-amber/25"
      />
      <motion.div
        style={{ y: up, x: driftX }}
        className="absolute left-[70%] top-[70%] h-14 w-14 rotate-45 border border-cyan/20"
      />
      <motion.div
        style={{ y: downFast, rotate: spinBig }}
        className="absolute left-[30%] top-[12%] h-10 w-10 rounded-[30%] border border-white/10"
      />
      <motion.div
        style={{ y: upSlow, rotate: spinNeg }}
        className="absolute right-[28%] top-[85%] h-24 w-24 rounded-full border border-dashed border-white/10"
      />
      <motion.div
        style={{ y: down, x: driftXBig }}
        className="absolute left-[52%] top-[45%] h-2 w-2 rounded-full bg-amber/60"
      />
      <motion.div
        style={{ y: up, x: driftXNeg }}
        className="absolute left-[86%] top-[62%] h-2.5 w-2.5 rounded-full bg-cyan/50"
      />

      {/* thin drifting lines */}
      <motion.div
        style={{ y: down, x: driftX }}
        className="absolute left-[8%] top-[40%] h-px w-32 bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <motion.div
        style={{ y: up, x: driftXNeg }}
        className="absolute right-[6%] top-[30%] h-px w-40 bg-gradient-to-r from-transparent via-amber/20 to-transparent"
      />
    </div>
  );
}
