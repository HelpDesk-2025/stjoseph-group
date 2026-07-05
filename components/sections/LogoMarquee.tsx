"use client";

import Link from "next/link";
import { businessUnits } from "@/lib/content";
import { UnitIcon } from "@/components/Icons";

/**
 * Logos-only marquee of the business units. Designed to sit inside the
 * (dark) hero section as a subtle brand strip along the bottom.
 */
export default function LogoMarquee() {
  // Duplicated once so the -50% keyframe loops seamlessly.
  const track = [...businessUnits, ...businessUnits];

  return (
    <div className="group relative flex w-full overflow-hidden [--gap:1.5rem]">
      {/* edge fades into the navy hero */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />

      <ul className="flex w-max shrink-0 animate-marquee items-center gap-[var(--gap)] pr-[var(--gap)] group-hover:[animation-play-state:paused]">
        {track.map((u, i) => (
          <li key={`${u.slug}-${i}`} aria-hidden={i >= businessUnits.length}>
            <Link
              href={`/business-units/${u.slug}`}
              aria-label={u.name}
              title={u.short}
              className="grid h-12 w-12 place-items-center text-white opacity-50 transition-opacity duration-300 hover:opacity-100"
            >
              <UnitIcon slug={u.slug} className="h-9 w-9" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
