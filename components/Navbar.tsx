"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  nav as staticNav,
  company as staticCompany,
  ui as staticUi,
  businessUnits as staticBusinessUnits,
} from "@/lib/content";
import Logo from "./Logo";
import UnitLogo from "./UnitLogo";
import { ArrowIcon } from "./Icons";

type NavUnit = {
  slug: string;
  name: string;
  short: string;
  sector: string;
  accent: string;
  logo?: string | null;
  page_logo?: string | null;
};

export default function Navbar({
  nav = staticNav,
  company = staticCompany,
  navCta = staticUi.navCta,
  businessUnits = staticBusinessUnits,
}: {
  nav?: typeof staticNav;
  company?: typeof staticCompany;
  navCta?: string;
  businessUnits?: NavUnit[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [bizOpen, setBizOpen] = useState(false); // desktop businesses dropdown
  const bizRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close the dropdown on outside click, Escape, or scroll.
  useEffect(() => {
    if (!bizOpen) return;
    const onDown = (e: MouseEvent) => {
      if (bizRef.current && !bizRef.current.contains(e.target as Node)) {
        setBizOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setBizOpen(false);
    const onScroll = () => setBizOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [bizOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-navy/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label={`${company.name} home`} className="shrink-0">
          <Logo company={company} />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            if (item.href.includes("business-units")) {
              return (
                <li key={item.href} ref={bizRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setBizOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={bizOpen}
                    className="group relative flex items-center gap-1.5 py-2 font-sans text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 20 20"
                      className={`h-3 w-3 transition-transform duration-200 ${bizOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 8l5 5 5-5" />
                    </svg>
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-amber transition-transform duration-200 ${
                        bizOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {bizOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full z-50 mt-3 origin-top-left"
                      >
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900/95 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] ring-1 ring-black/40 backdrop-blur-xl">
                          <div className="border-b border-white/[0.06] px-5 py-3.5">
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
                              Our Businesses
                            </p>
                            <p className="mt-0.5 font-sans text-[13px] text-ink-300">
                              {businessUnits.length} companies, one group
                            </p>
                          </div>

                          <ul className="grid w-[560px] max-w-[82vw] grid-cols-2 gap-0.5 p-2">
                            {businessUnits.map((u) => (
                              <li key={u.slug}>
                                <Link
                                  href={`/business-units/${u.slug}`}
                                  onClick={() => setBizOpen(false)}
                                  className="group/item flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-white/[0.06]"
                                >
                                  <span
                                    className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-white p-1.5 ring-1 ring-black/5"
                                    style={{ color: u.accent }}
                                  >
                                    <UnitLogo
                                      logo={u.page_logo ?? u.logo}
                                      slug={u.slug}
                                      name={u.name}
                                      className="h-full w-full"
                                    />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block truncate font-sans text-[13.5px] font-medium text-white transition-colors group-hover/item:text-amber">
                                      {u.name}
                                    </span>
                                    <span className="block truncate font-mono text-[10.5px] uppercase tracking-wide text-ink-400">
                                      {u.sector}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href={item.href}
                            onClick={() => setBizOpen(false)}
                            className="flex items-center justify-center gap-2 border-t border-white/[0.06] px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-300 transition-colors hover:bg-white/[0.03] hover:text-amber"
                          >
                            Overview on the home page
                            <ArrowIcon className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative py-2 font-sans text-sm text-white/85 transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-amber transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link href="/#contact" className="btn-primary">
            {navCta}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-md text-white lg:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-navy/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {nav.map((item) => {
                if (item.href.includes("business-units")) {
                  return (
                    <li key={item.href}>
                      <p className="px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                        {item.label}
                      </p>
                      <ul className="ml-3 space-y-0.5 border-l border-white/10 pl-3">
                        {businessUnits.map((u) => (
                          <li key={u.slug}>
                            <Link
                              href={`/business-units/${u.slug}`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/5"
                            >
                              <span
                                className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-md bg-white p-1"
                                style={{ color: u.accent }}
                              >
                                <UnitLogo
                                  logo={u.logo ?? u.page_logo}
                                  slug={u.slug}
                                  name={u.name}
                                  className="h-full w-full"
                                />
                              </span>
                              <span className="font-sans text-[14px] text-white/85">
                                {u.short}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 font-sans text-base text-white/90 hover:bg-white/5 hover:text-amber"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2">
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  {navCta}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
