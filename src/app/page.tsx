import Link from 'next/link';
import { indicators } from '@/data/indicators';
import { TickerBar, SiteNav, SiteFooter, Callout, REPO_URL } from '@/components/SiteChrome';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F5EDD8]">
      <TickerBar />
      <SiteNav />

      {/* Hero */}
      <section className="border-b border-[#B87333]/20">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-[#B87333]">
            The Indicator Library
          </p>
          <h1 className="font-display text-4xl font-semibold md:text-6xl">
            Trade Price Action.{' '}
            <span className="text-[#E8C46A]">Not Hope.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[#F5EDD8]/70">
            Battle-tested TradingView indicators for ES, NQ, MES and MNQ futures —
            built on Al Brooks price action, opening range structure, and objective
            rule-based scoring. Free, always. By SireMammat.
          </p>
        </div>
      </section>

      {/* Stat cards bar */}
      <section className="border-b border-[#B87333]/20 bg-[#080b12]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px md:grid-cols-4">
          <Stat label="Indicators" value={String(indicators.length)} />
          <Stat label="Markets" value="ES · NQ · MES · MNQ" />
          <Stat label="Price" value="Free" />
          <Stat label="Platform" value="TradingView" />
        </div>
      </section>

      {/* Indicator grid */}
      <main className="mx-auto max-w-5xl px-6 py-14">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[#B87333]">
          — The Library
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {indicators.map((ind) => (
            <Link
              key={ind.slug}
              href={`/indicators/${ind.slug}`}
              className="group rounded-lg border border-[#B87333]/30 bg-[#111827] p-6 transition-all hover:border-[#E8C46A] hover:shadow-[0_0_30px_rgba(184,115,51,0.15)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-[#B87333]/15 px-2 py-0.5 font-mono text-xs text-[#E8C46A]">
                  {ind.category}
                </span>
                <span className="font-mono text-xs text-[#F5EDD8]/50">
                  {ind.version} · {ind.status}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#F5EDD8] group-hover:text-[#E8C46A]">
                {ind.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#F5EDD8]/70">{ind.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ind.markets.map((m) => (
                  <span
                    key={m}
                    className="rounded border border-[#B87333]/40 px-2 py-0.5 font-mono text-xs text-[#F5EDD8]/60"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-5 font-mono text-sm font-semibold text-[#B87333] group-hover:text-[#E8C46A]">
                VIEW GUIDE →
              </p>
            </Link>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-10">
          <Callout>
            Every tool here exists because I needed it on my own charts first. No repaints, no
            black boxes — the full Pine source is open in{' '}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-[#E8C46A] underline">
              the repo
            </a>
            . New indicators land here as they survive live trading. — Sire
          </Callout>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0B0F19] px-6 py-5 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B87333]">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-[#F5EDD8]">{value}</p>
    </div>
  );
}
