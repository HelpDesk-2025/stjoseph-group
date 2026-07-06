"use client";

import { useEffect, useState } from "react";

// Only the sections between "Our Businesses" and "Careers" (inclusive).
const SECTIONS = [
  { id: "business-units", label: "Our Businesses" },
  { id: "purpose", label: "Purpose" },
  { id: "eos", label: "EOS" },
  { id: "strategy", label: "Strategy" },
  { id: "values", label: "Core Values" },
  { id: "journey", label: "Journey" },
  { id: "culture", label: "Culture" },
  { id: "testimonials", label: "Voices" },
  { id: "careers", label: "Careers" },
];

const FIRST = "business-units";
const LAST = "careers";

// Sections rendered on the light (cream) theme — the tab uses dark text here.
const LIGHT_SECTIONS = new Set([
  "business-units",
  "eos",
  "values",
  "culture",
  "careers",
]);

/**
 * Floating vertical tab on the left listing the section names. It only appears
 * while the viewport is within the Businesses → Careers range, tracks the
 * active section, and smooth-scrolls (via Lenis) when a label is clicked.
 */
export default function SectionNav() {
  const [active, setActive] = useState(FIRST);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const topOf = (id: string) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.scrollY + window.innerHeight / 2;

      // visibility: viewport middle within [first section top, last section bottom]
      const firstEl = document.getElementById(FIRST);
      const lastEl = document.getElementById(LAST);
      if (firstEl && lastEl) {
        const start = firstEl.getBoundingClientRect().top + window.scrollY;
        const end =
          lastEl.getBoundingClientRect().top + window.scrollY + lastEl.offsetHeight;
        setVisible(mid >= start && mid <= end);
      }

      // active: last section whose top has passed the viewport middle
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        if (topOf(s.id) <= mid) current = s.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // dark text when the current section is on the light (cream) theme
  const isLight = LIGHT_SECTIONS.has(active);

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed inset-x-0 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
    >
      <div className="container-x">
        <div
          className={`w-max transition-all duration-500 ease-out ${
            visible
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-4 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center gap-2.5 px-1 py-1.5"
                >
                  <span
                    className={`block shrink-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-1.5 w-1.5 bg-amber shadow-[0_0_10px_rgba(204,123,29,0.7)]"
                        : isLight
                          ? "h-1 w-1 bg-black/40 group-hover:bg-black"
                          : "h-1 w-1 bg-ink-400 group-hover:bg-ink-200"
                    }`}
                  />
                  <span
                    className={`whitespace-nowrap font-mono text-[11px] uppercase tracking-wider transition-colors ${
                      isActive
                        ? isLight
                          ? "text-black"
                          : "text-white"
                        : isLight
                          ? "text-black/55 group-hover:text-black"
                          : "text-ink-300 group-hover:text-white"
                    }`}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            );
          })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
