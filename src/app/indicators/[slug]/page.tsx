import Link from 'next/link';
import { notFound } from 'next/navigation';
import { indicators, getIndicator } from '@/data/indicators';

const REPO_URL = 'https://github.com/otakgemuk/SireIndicators';

export function generateStaticParams() {
  return indicators.map((i) => ({ slug: i.slug }));
}

export default function IndicatorPage({ params }: { params: { slug: string } }) {
  const ind = getIndicator(params.slug);
  if (!ind) notFound();

  const sourceUrl = `${REPO_URL}/blob/main/${encodeURIComponent(ind.sourceFile)}`;

  return (
    <div className="min-h-screen bg-[#0E0A04] text-[#F5EDD8]">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-[#B87333]/30 bg-[#0E0A04]/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80">
            <span className="text-2xl text-[#B87333]">♛</span>
            <span className="text-lg font-bold tracking-wide">SireIndicators</span>
          </Link>
          <Link href="/" className="text-sm text-[#E8C46A] hover:underline">
            ← All indicators
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Title */}
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="rounded bg-[#B87333]/15 px-2 py-0.5 text-xs text-[#E8C46A]">{ind.category}</span>
          <span className="text-xs text-[#F5EDD8]/50">{ind.version} · {ind.status} · {ind.timeframes}</span>
        </div>
        <h1 className="text-3xl font-bold md:text-4xl">{ind.name}</h1>
        <p className="mt-2 text-[#F5EDD8]/70">{ind.tagline}</p>

        {/* Get the source CTA */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-[#B87333] px-5 py-2.5 font-semibold text-[#0E0A04] transition-colors hover:bg-[#E8C46A]"
          >
            Get Pine Script Source →
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#B87333] px-5 py-2.5 text-[#E8C46A] transition-colors hover:bg-[#B87333]/10"
          >
            View Repo
          </a>
        </div>

        {/* Overview */}
        <Section title="Overview">
          <p className="leading-relaxed text-[#F5EDD8]/80">{ind.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ind.markets.map((m) => (
              <span key={m} className="rounded border border-[#B87333]/40 px-2 py-0.5 text-xs text-[#F5EDD8]/60">{m}</span>
            ))}
          </div>
        </Section>

        {/* Features */}
        <Section title="Features">
          <ul className="space-y-2">
            {ind.features.map((f) => (
              <li key={f} className="flex gap-3 text-[#F5EDD8]/80">
                <span className="text-[#B87333]">▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Signal guide */}
        <Section title="Signal Guide">
          <div className="overflow-hidden rounded-lg border border-[#B87333]/30">
            {ind.signals.map((s, i) => (
              <div
                key={s.name}
                className={`flex flex-col gap-1 px-4 py-3 md:flex-row md:items-center md:gap-6 ${i % 2 === 0 ? 'bg-[#16100a]' : 'bg-[#0E0A04]'}`}
              >
                <span className="w-44 shrink-0 font-mono text-sm font-semibold text-[#E8C46A]">{s.name}</span>
                <span className="text-sm text-[#F5EDD8]/75">{s.meaning}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Settings */}
        <Section title="Key Settings">
          <div className="overflow-hidden rounded-lg border border-[#B87333]/30">
            {ind.settings.map((s, i) => (
              <div
                key={s.name}
                className={`flex flex-col gap-1 px-4 py-3 md:flex-row md:items-center md:gap-6 ${i % 2 === 0 ? 'bg-[#16100a]' : 'bg-[#0E0A04]'}`}
              >
                <span className="w-44 shrink-0 text-sm font-semibold text-[#F5EDD8]">{s.name}</span>
                <span className="w-20 shrink-0 font-mono text-sm text-[#E8C46A]">{s.defaultValue}</span>
                <span className="text-sm text-[#F5EDD8]/70">{s.description}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* How to install / use */}
        <Section title="How To Use">
          <ol className="space-y-3">
            {ind.howToUse.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B87333] text-sm font-bold text-[#0E0A04]">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-[#F5EDD8]/80">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Best practices */}
        <Section title="Best Practices">
          <div className="rounded-lg border border-[#B87333]/40 bg-[#16100a] p-5">
            <p className="mb-3 text-sm font-semibold text-[#E8C46A]">♛ From the desk of SireMammat</p>
            <ul className="space-y-2">
              {ind.bestPractices.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-[#F5EDD8]/80">
                  <span className="text-[#B87333]">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-[#E8C46A] hover:underline">← Back to all indicators</Link>
        </div>
      </main>

      <footer className="border-t border-[#B87333]/20 py-6 text-center text-xs text-[#F5EDD8]/50">
        <p>♛ SireIndicators · by SireMammat (MightyOx Ventures)</p>
        <p className="mt-1">Educational tools only. Not financial advice. Trading futures involves substantial risk.</p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-sm uppercase tracking-[0.25em] text-[#B87333]">{title}</h2>
      {children}
    </section>
  );
}
