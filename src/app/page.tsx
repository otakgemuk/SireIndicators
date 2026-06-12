import Link from 'next/link';
import { indicators } from '@/data/indicators';

const REPO_URL = 'https://github.com/otakgemuk/SireIndicators';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0E0A04] text-[#F5EDD8]">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-[#B87333]/30 bg-[#0E0A04]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#B87333]">♛</span>
            <span className="text-lg font-bold tracking-wide">SireIndicators</span>
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#B87333] px-4 py-1.5 text-sm text-[#E8C46A] transition-colors hover:bg-[#B87333] hover:text-[#0E0A04]"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#B87333]/20">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#B87333]">
            Free Pine Script Indicators
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Trade Price Action.{' '}
            <span className="text-[#E8C46A]">Not Hope.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#F5EDD8]/70">
            Battle-tested TradingView indicators for ES, NQ, MES and MNQ futures —
            built on Al Brooks price action, opening range structure, and objective
            rule-based scoring. Free, always. By SireMammat.
          </p>
        </div>
      </section>

      {/* Indicator grid */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-6 text-sm uppercase tracking-[0.25em] text-[#B87333]">
          The Library · {indicators.length} indicator{indicators.length === 1 ? '' : 's'}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {indicators.map((ind) => (
            <Link
              key={ind.slug}
              href={`/indicators/${ind.slug}`}
              className="group rounded-lg border border-[#B87333]/30 bg-[#16100a] p-6 transition-all hover:border-[#E8C46A] hover:shadow-[0_0_30px_rgba(184,115,51,0.15)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-[#B87333]/15 px-2 py-0.5 text-xs text-[#E8C46A]">
                  {ind.category}
                </span>
                <span className="text-xs text-[#F5EDD8]/50">
                  {ind.version} · {ind.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#F5EDD8] group-hover:text-[#E8C46A]">
                {ind.name}
              </h3>
              <p className="mt-2 text-sm text-[#F5EDD8]/70">{ind.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ind.markets.map((m) => (
                  <span
                    key={m}
                    className="rounded border border-[#B87333]/40 px-2 py-0.5 text-xs text-[#F5EDD8]/60"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm font-semibold text-[#B87333] group-hover:text-[#E8C46A]">
                View guide →
              </p>
            </Link>
          ))}
        </div>

        {/* Coming soon */}
        <div className="mt-8 rounded-lg border border-dashed border-[#B87333]/30 p-6 text-center text-sm text-[#F5EDD8]/50">
          More indicators in development — follow{' '}
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-[#E8C46A] underline">
            the repo
          </a>{' '}
          for new releases.
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#B87333]/20 py-6 text-center text-xs text-[#F5EDD8]/50">
        <p>♛ SireIndicators · by SireMammat (MightyOx Ventures) · Learn to read price — free, always.</p>
        <p className="mt-1">Educational tools only. Not financial advice. Trading futures involves substantial risk.</p>
      </footer>
    </div>
  );
}
