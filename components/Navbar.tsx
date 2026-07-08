"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  nav as staticNav,
  company as staticCompany,
  ui as staticUi,
  businessUnits as staticBusinessUnits,
} from "@/lib/content";
import Logo from "./Logo";

type NavUnit = { slug: string; name: string; short: string };

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

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
            const isBiz = item.href.includes("business-units");
            if (isBiz) {
              return (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1 py-2 font-sans text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 8l5 5 5-5" />
                    </svg>
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-amber transition-transform duration-200 group-hover:scale-x-100" />
                  </Link>
                  {/* dropdown */}
                  <div className="pointer-events-none absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                    <ul className="w-72 rounded-xl border border-white/10 bg-navy/95 p-2 shadow-2xl backdrop-blur-xl">
                      {businessUnits.map((u) => (
                        <li key={u.slug}>
                          <Link
                            href={`/business-units/${u.slug}`}
                            className="block rounded-lg px-3 py-2 font-sans text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-amber"
                          >
                            {u.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 font-sans text-base text-white/90 hover:bg-white/5 hover:text-amber"
                  >
                    {item.label}
                  </Link>
                  {item.href.includes("business-units") && (
                    <ul className="mb-1 ml-3 space-y-0.5 border-l border-white/10 pl-4">
                      {businessUnits.map((u) => (
                        <li key={u.slug}>
                          <Link
                            href={`/business-units/${u.slug}`}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-3 py-2 font-mono text-[13px] text-white/70 hover:text-amber"
                          >
                            {u.short}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
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
