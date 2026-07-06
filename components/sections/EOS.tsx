"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { eos } from "@/lib/content";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function EOS() {
  const [active, setActive] = useState(0);
  const n = eos.components.length;

  return (
    <section id="eos" className="section-light relative border-y border-white/10 bg-navy-900/50 py-24 sm:py-28">
      <div className="container-x lg:!pl-48">
        <SectionHeader
          eyebrow={eos.eyebrow}
          title={eos.title}
          intro={eos.intro}
          gradient="cyan"
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Interactive orbital diagram */}
          <Reveal>
            <div
              className="relative mx-auto aspect-square w-full max-w-md"
              style={{ perspective: "1100px" }}
            >
              {/* Tilted disc spinning in 3D around its vertical axis */}
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d", rotateX: 62 }}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              >
                {/* rings sit on the tilted plane */}
                <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
                <div className="absolute inset-[14%] rounded-full border border-white/10" />

                {/* nodes — orbit in depth; label counter-rotates to face the camera */}
                {eos.components.map((c, i) => {
                  const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
                  const x = 50 + Math.cos(angle) * 42;
                  const y = 50 + Math.sin(angle) * 42;
                  const isActive = active === i;
                  return (
                    <button
                      key={c.key}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-label={c.title}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%`, transformStyle: "preserve-3d" }}
                    >
                      {/* undo the spin first, then the tilt (nested for correct order) */}
                      <motion.span
                        className="block"
                        style={{ transformStyle: "preserve-3d" }}
                        animate={{ rotateZ: -360 }}
                        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                      >
                        <motion.span
                          className={`flex h-16 w-16 items-center justify-center rounded-full border text-center font-sans text-[11px] font-semibold transition-colors duration-300 ${
                            isActive
                              ? "border-amber bg-amber text-navy shadow-glow"
                              : "border-white/15 bg-navy-800 text-white hover:border-amber/50"
                          }`}
                          animate={{ rotateX: -62, scale: isActive ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {c.title}
                        </motion.span>
                      </motion.span>
                    </button>
                  );
                })}
              </motion.div>

              {/* center hub — stays flat, facing the camera */}
              <div className="keep-dark pointer-events-none absolute left-1/2 top-1/2 z-30 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-amber/40 bg-navy text-center shadow-glow">
                <span className="font-sans text-2xl font-bold text-amber">EOS®</span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-ink-300">
                  6 Key
                  <br />
                  Components
                </span>
              </div>
            </div>
          </Reveal>

          {/* detail panel */}
          <Reveal delay={0.1}>
            <div className="min-h-[220px] rounded-card border border-white/10 bg-navy-800/50 p-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                Component {String(active + 1).padStart(2, "0")} / 06
              </span>
              <motion.h3
                key={eos.components[active].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-4 font-sans text-3xl font-semibold text-white"
              >
                {eos.components[active].title}
              </motion.h3>
              <motion.p
                key={eos.components[active].desc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mt-4 font-mono text-sm leading-relaxed text-ink-200"
              >
                {eos.components[active].desc}
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-2">
                {eos.components.map((c, i) => (
                  <button
                    key={c.key}
                    onClick={() => setActive(i)}
                    className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                      active === i
                        ? "bg-amber text-navy"
                        : "bg-white/5 text-ink-300 hover:text-white"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
