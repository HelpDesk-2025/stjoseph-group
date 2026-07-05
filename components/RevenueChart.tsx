"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { investor } from "@/lib/content";

export default function RevenueChart() {
  const data = investor.performance;
  const max = Math.max(...data.map((d) => d.revenue));
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="rounded-card border border-white/10 bg-navy-800/50 p-8">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="font-sans text-lg font-semibold text-white">
            Group Revenue
          </h3>
          <p className="mt-1 font-mono text-[11px] text-ink-300">
            in ₱ Billions · FY2020–FY2024
          </p>
        </div>
        <span className="font-mono text-[11px] text-cyan">+62% over 5 years</span>
      </div>

      <div className="mt-10 flex h-64 items-end justify-between gap-3 sm:gap-6">
        {data.map((d, i) => {
          const h = (d.revenue / max) * 100;
          const isActive = active === i;
          return (
            <div
              key={d.year}
              className="group relative flex h-full flex-1 flex-col items-center justify-end"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* tooltip */}
              <div
                className={`absolute -top-2 z-10 -translate-y-full rounded-md border border-white/15 bg-navy px-3 py-1.5 font-mono text-xs text-white transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                ₱{d.revenue}B
              </div>

              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[64px] rounded-t-md transition-colors duration-200"
                style={{
                  background: isActive
                    ? "linear-gradient(180deg, #E89F00, #CC7B1D)"
                    : "linear-gradient(180deg, #CC7B1D, #7a3f08)",
                }}
              />
              <span className="mt-3 font-mono text-[11px] text-ink-300">
                {d.year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
