import Link from "next/link";
import {
  company as staticCompany,
  businessUnits as staticBusinessUnits,
  type BusinessUnit,
} from "@/lib/content";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

export default function Footer({
  company = staticCompany,
  businessUnits = staticBusinessUnits,
}: {
  company?: typeof staticCompany;
  businessUnits?: BusinessUnit[];
}) {
  return (
    <footer className="relative border-t border-white/10 bg-navy">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo company={company} />
          <p className="body-text mt-5 max-w-xs">{company.intro}</p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            Businesses
          </h4>
          <ul className="mt-5 space-y-2.5">
            {businessUnits.slice(0, 5).map((u) => (
              <li key={u.slug}>
                <Link
                  href={`/business-units/${u.slug}`}
                  className="font-mono text-[13px] text-ink-200 transition-colors hover:text-white"
                >
                  {u.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            More Businesses
          </h4>
          <ul className="mt-5 space-y-2.5">
            {businessUnits.slice(5).map((u) => (
              <li key={u.slug}>
                <Link
                  href={`/business-units/${u.slug}`}
                  className="font-mono text-[13px] text-ink-200 transition-colors hover:text-white"
                >
                  {u.short}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/investor-relations"
                className="font-mono text-[13px] text-ink-200 transition-colors hover:text-white"
              >
                Investor Relations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            Get in Touch
          </h4>
          <ul className="mt-5 space-y-2.5">
            <li className="font-mono text-[13px] text-ink-200">{company.address}</li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="font-mono text-[13px] text-cyan transition-colors hover:text-cyan-light"
              >
                {company.email}
              </a>
            </li>
            <li className="font-mono text-[13px] text-ink-200">{company.phone}</li>
          </ul>

          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-300">
              Get updates
            </p>
            <div className="mt-3">
              <NewsletterForm source="footer" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="font-mono text-xs text-ink-300">
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-ink-300">
            {company.tagline} · Est. {company.established}
          </p>
        </div>
      </div>
    </footer>
  );
}
