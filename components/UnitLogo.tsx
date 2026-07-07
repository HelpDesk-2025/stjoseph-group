import { UnitIcon } from "@/components/Icons";

/**
 * Renders a business unit's uploaded logo, falling back to its branded SVG
 * icon when no logo is set. Used in the hero marquee and on unit pages.
 */
export default function UnitLogo({
  logo,
  slug,
  name,
  className = "",
}: {
  logo?: string | null;
  slug: string;
  name?: string;
  className?: string;
}) {
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo} alt={name ?? ""} className={`${className} object-contain`} />
    );
  }
  return <UnitIcon slug={slug} className={className} />;
}
