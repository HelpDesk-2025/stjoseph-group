import { company as staticCompany } from "@/lib/content";

export default function Logo({
  className = "",
  company = staticCompany,
}: {
  className?: string;
  company?: typeof staticCompany;
}) {
  const logo = (company as typeof staticCompany & { logo?: string }).logo;
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={company.name}
          className="h-9 w-9 rounded-md object-contain"
        />
      ) : (
        <span className="relative grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-amber to-amber-deep shadow-glow">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M12 2l2.4 5.2L20 8l-4 4 1 6-5-2.8L7 18l1-6-4-4 5.6-.8L12 2z"
              fill="#040410"
            />
          </svg>
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[15px] font-600 font-semibold tracking-tight text-white">
          {company.name}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-amber">
          {company.tagline}
        </span>
      </span>
    </span>
  );
}
