"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { businessUnits as staticBusinessUnits, type BusinessUnit } from "@/lib/content";
import { fallbackGallery } from "@/lib/unit-gallery";
import Reveal from "@/components/Reveal";
import ScrollDecorLight from "@/components/ScrollDecorLight";
import { UnitIcon, ArrowIcon } from "@/components/Icons";

const AUTO_PLAY_DURATION = 5000;

type UnitWithImages = BusinessUnit & {
  hero_image?: string | null;
  gallery?: string[] | null;
};

export default function BusinessUnits({
  units = staticBusinessUnits,
}: {
  units?: UnitWithImages[];
}) {
  const businessUnits = units;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [subImage, setSubImage] = useState(0);

  // reset to the hero shot whenever the active unit changes
  useEffect(() => {
    setSubImage(0);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % businessUnits.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + businessUnits.length) % businessUnits.length
    );
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (dir: number) => ({
      zIndex: 0,
      y: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const active = businessUnits[activeIndex];
  // Prefer uploaded images (hero first, then gallery); fall back to defaults.
  const dbImages = [active.hero_image, ...(active.gallery ?? [])].filter(
    Boolean
  ) as string[];
  const gallery = dbImages.length ? dbImages : fallbackGallery(active.slug);

  return (
    <section
      id="business-units"
      className="relative overflow-hidden border-y border-black/[0.06] bg-[#f6f3ee] py-24 text-navy sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40 [background-image:linear-gradient(rgba(4,4,16,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(4,4,16,0.05)_1px,transparent_1px)] [background-size:60px_60px]" />

      <ScrollDecorLight />

      <div className="container-x relative lg:!pl-48">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + vertical tabs */}
          <div className="order-2 flex flex-col lg:order-1 lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Our Businesses</span>
              <h2 className="mt-4 heading-lg text-navy">
                Nine business units,
                <br />
                one purpose
              </h2>
              <p className="mt-5 max-w-md font-mono text-[13px] leading-relaxed text-ink-500">
                A diversified portfolio spanning the industries that shape
                everyday Filipino life — each a leader in its field.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-col">
              {businessUnits.map((u, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={u.slug}
                    onClick={() => handleTabClick(index)}
                    className={`group relative flex items-start gap-4 border-t border-black/10 py-4 pl-5 text-left transition-colors duration-500 first:border-t-0 ${
                      isActive ? "text-navy" : "text-navy/45 hover:text-navy"
                    }`}
                  >
                    {/* progress rail */}
                    <span className="absolute bottom-0 left-0 top-0 w-[2px] bg-black/10">
                      {isActive && (
                        <motion.span
                          key={`progress-${index}-${isPaused}`}
                          className="absolute left-0 top-0 w-full origin-top"
                          style={{ background: u.accent }}
                          initial={{ height: "0%" }}
                          animate={{ height: isPaused ? "0%" : "100%" }}
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </span>

                    <span className="mt-1.5 font-mono text-[10px] tabular-nums opacity-50">
                      /0{index + 1}
                    </span>

                    <div className="flex flex-1 flex-col gap-1.5">
                      <span className="font-sans text-lg font-medium tracking-tight sm:text-xl">
                        {u.name}
                      </span>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <span
                              className="block font-mono text-[10px] uppercase tracking-wider"
                              style={{ color: u.accent }}
                            >
                              {u.sector}
                            </span>
                            <p className="mt-2 max-w-sm font-mono text-[12.5px] leading-relaxed text-ink-500">
                              {u.summary}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: gallery */}
          <div className="order-1 flex h-full flex-col justify-center lg:order-2 lg:col-span-7">
            <div
              className="group/gallery relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#0b0b1a] shadow-[0_20px_60px_rgba(4,4,16,0.18)] md:aspect-[4/3] md:rounded-xl lg:aspect-[16/12]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 h-full w-full cursor-pointer"
                    onClick={handleNext}
                  >
                    {/* branded fallback layer (always rendered underneath) */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${active.accent} 0%, #0b0b1a 78%)`,
                      }}
                    />
                    <UnitIcon
                      slug={active.slug}
                      className="absolute right-6 top-6 h-28 w-28 text-white/10"
                    />

                    {/* photo — crossfades between thumbnails; hides on error */}
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={subImage}
                        src={gallery[subImage] ?? gallery[0]}
                        alt={active.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 block h-full w-full object-cover transition-transform duration-700 group-hover/gallery:scale-105"
                      />
                    </AnimatePresence>

                    {/* legibility gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* caption */}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                      <div>
                        <span className="font-mono text-[11px] tabular-nums text-white/60">
                          /0{activeIndex + 1}
                        </span>
                        <h3 className="mt-1 max-w-xs font-sans text-2xl font-semibold leading-tight text-white md:text-3xl">
                          {active.name}
                        </h3>
                        <span
                          className="mt-1 block font-mono text-[11px] uppercase tracking-wider"
                          style={{ color: active.accent }}
                        >
                          {active.sector}
                        </span>
                        <Link
                          href={`/business-units/${active.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-medium text-white transition-colors hover:text-amber-light"
                        >
                          Explore {active.short}
                          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/gallery:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* prev / next */}
                <div className="absolute bottom-6 right-6 z-20 flex gap-2 md:bottom-8 md:right-8 md:gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous business unit"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90 md:h-12 md:w-12"
                  >
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5l-5 5 5 5" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next business unit"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90 md:h-12 md:w-12"
                  >
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 5l5 5-5 5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* thumbnail strip */}
              <div className="mt-3 grid grid-cols-3 gap-3 md:mt-4">
                {gallery.map((url, idx) => (
                  <button
                    key={url + idx}
                    onClick={() => setSubImage(idx)}
                    aria-label={`View image ${idx + 1} of ${active.name}`}
                    style={{ background: active.accent }}
                    className={`relative aspect-[4/3] overflow-hidden rounded-md transition-all duration-300 ${
                      subImage === idx
                        ? "opacity-100"
                        : "opacity-60 hover:opacity-100 hover:-translate-y-0.5"
                    }`}
                  >
                    <img
                      src={url}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
