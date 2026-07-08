"use client";

import Link from "next/link";
import {
  businessUnits as staticBusinessUnits,
  type BusinessUnit,
  type UnitMedia,
} from "@/lib/content";
import UnitLogo from "@/components/UnitLogo";

/**
 * Logos-only marquee of the business units. Designed to sit inside the
 * (dark) hero section as a subtle brand strip along the bottom.
 */
export default function LogoMarquee({
  units = staticBusinessUnits,
}: {
  units?: (BusinessUnit & UnitMedia)[];
}) {
  const businessUnits = units;
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
              className="grid h-20 w-20 place-items-center text-white opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
              <UnitLogo logo={u.logo} slug={u.slug} name={u.name} className="h-16 w-16" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
