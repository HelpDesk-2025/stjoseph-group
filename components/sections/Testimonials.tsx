"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[i];

  const go = (d: number) => {
    setDir(d);
    setI((prev) => (prev + d + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-28">
      <div className="container-x lg:!pl-48">
        <SectionHeader
          eyebrow="In Their Words"
          title="Voices from across the group"
          center
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <svg
            className="mx-auto mb-6 h-10 w-10 text-amber/50"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c0 2.5-1 3.5-3 4.5 4 0 7-3 7-8V6H7.5zm10 0C15 6 13 8 13 10.5s2 4.5 4.5 4.5c0 2.5-1 3.5-3 4.5 4 0 7-3 7-8V6h-4z" />
          </svg>

          <div className="relative min-h-[220px] overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-center"
              >
                <p className="font-sans text-xl font-light leading-relaxed text-white sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-8">
                  <p className="font-sans text-base font-semibold text-amber">
                    {t.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-ink-300">{t.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-amber hover:text-amber"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5l-5 5 5 5" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDir(idx > i ? 1 : -1);
                    setI(idx);
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === i ? "w-6 bg-amber" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-amber hover:text-amber"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 5l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
