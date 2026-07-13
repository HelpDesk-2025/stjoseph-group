"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll parallax: translates its children vertically as the element passes
 * through the viewport. The ref sits on a static outer wrapper (measured) while
 * an inner motion layer carries the transform, so measurement never feeds back
 * on the transform. Disabled under prefers-reduced-motion.
 *
 * `offset` = pixels of travel; the child moves from +offset (entering) to
 * -offset (leaving). Positive feels like it drifts up as you scroll down.
 */
export default function Parallax({
  children,
  offset = 40,
  className = "",
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
