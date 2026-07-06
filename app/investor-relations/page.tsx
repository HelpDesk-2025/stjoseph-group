import type { Metadata } from "next";
import Link from "next/link";
import { investor } from "@/lib/content";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import RevenueChart from "@/components/RevenueChart";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Investor Relations",
  description: investor.intro,
};

export default function InvestorRelationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(204,123,29,0.15),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="container-x relative">
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-ink-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Investor Relations</span>
          </nav>
          <Reveal>
            <span className="eyebrow">{investor.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 max-w-3xl heading-xl text-gradient-amber">
              {investor.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-ink-200 sm:text-[15px]">
              {investor.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative py-12">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {investor.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07}>
              <div className="h-full rounded-card border border-white/10 bg-navy-800/50 p-6">
                <Counter
                  value={m.value}
                  className="font-sans text-4xl font-bold text-white"
                />
                <p className="mt-2 font-mono text-[12px] font-medium text-ink-100">
                  {m.label}
                </p>
                <p className="mt-1 font-mono text-[11px] text-amber">{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Performance chart */}
      <section className="relative py-16">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <RevenueChart />
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">Financial Performance</span>
              <h2 className="mt-4 heading-lg text-white">
                Consistent, disciplined growth
              </h2>
              <p className="mt-5 font-mono text-sm leading-relaxed text-ink-200">
                Over the past five years, St. Joseph Group, Inc. has delivered steady
                revenue expansion across its diversified portfolio — driven by
                operational discipline, prudent capital allocation, and a
                relentless focus on long-term value creation.
              </p>
              <ul className="mt-6 space-y-2 font-mono text-[13px] text-ink-100">
                <li>· Diversification lowers concentration risk</li>
                <li>· EOS®-driven accountability across all units</li>
                <li>· Investment-grade balance sheet</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Governance */}
      <section className="relative border-y border-white/10 bg-navy-900/40 py-20">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Governance &amp; Stewardship</span>
            <h2 className="mt-4 heading-lg text-white">
              Built on trust and accountability
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {investor.governance.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08}>
                <div className="h-full rounded-card border border-white/10 bg-navy-800/50 p-8 transition-colors hover:border-amber/40">
                  <span className="font-mono text-xs text-amber">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-sans text-xl font-semibold text-white">
                    {g.title}
                  </h3>
                  <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink-200">
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="relative py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Reports &amp; Filings</span>
              <h2 className="mt-4 heading-lg text-white">Download center</h2>
              <p className="mt-5 max-w-sm font-mono text-sm leading-relaxed text-ink-200">
                Access our latest financial results, annual reports, and governance
                documents. (Placeholder links — connect to your document store.)
              </p>
            </Reveal>
          </div>
          <div className="space-y-3">
            {investor.reports.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <a
                  href="#"
                  className="group flex items-center justify-between gap-4 rounded-card border border-white/10 bg-navy-800/50 p-5 transition-all duration-300 hover:border-amber/40 hover:bg-navy-800"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-amber/15 text-amber">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
                        <path d="M14 3v6h6" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-sans text-base font-medium text-white group-hover:text-amber">
                        {r.title}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-ink-300">
                        {r.type} · {r.size}
                      </p>
                    </div>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-ink-200 transition-colors group-hover:border-amber group-hover:text-amber">
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 3v10m0 0l-4-4m4 4l4-4M4 17h12" />
                    </svg>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IR contact */}
      <section className="relative pb-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-card border border-white/10 bg-gradient-to-br from-amber/10 to-navy-800/50 p-10 sm:p-14">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="font-sans text-3xl font-medium text-white sm:text-4xl">
                    {investor.contact.name}
                  </h2>
                  <p className="mt-4 font-mono text-sm text-ink-200">
                    For investor inquiries, financial information, and partnership
                    opportunities.
                  </p>
                </div>
                <div className="space-y-4">
                  <a
                    href={`mailto:${investor.contact.email}`}
                    className="flex items-center gap-3 font-mono text-sm text-cyan hover:text-cyan-light"
                  >
                    <span className="text-ink-300">Email</span>
                    {investor.contact.email}
                  </a>
                  <p className="flex items-center gap-3 font-mono text-sm text-ink-100">
                    <span className="text-ink-300">Phone</span>
                    {investor.contact.phone}
                  </p>
                  <Link href="/#contact" className="btn-primary mt-2">
                    Contact IR team <ArrowIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
