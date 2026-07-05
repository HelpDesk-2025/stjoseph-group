type IconProps = { className?: string };

const base = "h-6 w-6";

export function UnitIcon({ slug, className }: { slug: string; className?: string }) {
  const cls = className ?? base;
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "realty-development":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01" />
        </svg>
      );
    case "construction-infrastructure":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M3 21h18M6 21V10l6-3 6 3v11M12 7V3M4 14h16" />
        </svg>
      );
    case "hospitality-resorts":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M3 21V7l9-4 9 4v14M3 21h18M9 21v-6h6v6M7 10h.01M12 10h.01M17 10h.01" />
        </svg>
      );
    case "healthcare":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M12 21s-7-4.5-9.3-9C1.4 9 3 5.5 6.3 5.5 8.4 5.5 12 8 12 8s3.6-2.5 5.7-2.5C21 5.5 22.6 9 21.3 12 19 16.5 12 21 12 21z" />
          <path d="M12 9v5M9.5 11.5h5" />
        </svg>
      );
    case "education":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M12 4L2 9l10 5 10-5-10-5zM6 11v5c0 1 3 3 6 3s6-2 6-3v-5M22 9v5" />
        </svg>
      );
    case "agri-ventures":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M12 21V9M12 9c0-3 2-5 6-5 0 4-3 6-6 6M12 13c0-2-2-4-6-4 0 3 3 5 6 5" />
        </svg>
      );
    case "retail-trading":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M4 7h16l-1 13H5L4 7zM8 7V5a4 4 0 018 0v2" />
        </svg>
      );
    case "financial-services":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M3 21h18M4 10h16M5 10l7-6 7 6M6 10v11M18 10v11M10 10v11M14 10v11" />
        </svg>
      );
    case "logistics-mobility":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <path d="M2 7h11v10H2zM13 10h4l4 3v4h-8M6 20a2 2 0 100-4 2 2 0 000 4zM18 20a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className ?? "h-4 w-4"} fill="none">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className ?? "h-4 w-4"} fill="none">
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
