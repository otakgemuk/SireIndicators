import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { indicators, getIndicator } from '@/data/indicators';
import { TickerBar, SiteNav, SiteFooter, Callout, REPO_URL } from '@/components/SiteChrome';
import CopyScriptButton from '@/components/CopyScriptButton';

export function generateStaticParams() {
  return indicators.map((i) => ({ slug: i.slug }));
}

export default function IndicatorPage({ params }: { params: { slug: string } }) {
  const ind = getIndicator(params.slug);
  if (!ind) notFound();

  const hasSource = ind.sourceFile.trim().length > 0;
  const sourceUrl = hasSource
    ? `${REPO_URL}/blob/main/${ind.sourceFile.split('/').map(encodeURIComponent).join('/')}`
    : null;
  const scriptPath = hasSource ? ind.sourceFile : null;
  const platform = ind.platform ?? 'TradingView';
  const sourceDirectory = hasSource ? ind.sourceFile.split('/').slice(0, -1).join('/') : '';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F5EDD8]">
      <TickerBar />
      <SiteNav />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Eyebrow + title */}
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-[#B87333]">
          {platform} · {ind.category} · {ind.version} · {ind.status}
        </p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">{ind.name}</h1>
        <p className="mt-3 text-lg leading-relaxed text-[#F5EDD8]/70">{ind.tagline}</p>
        <p className="mt-2 font-mono text-xs text-[#F5EDD8]/50">Timeframes: {ind.timeframes}</p>

        {/* CTA */}
        <div className="mt-7 flex flex-wrap gap-3">
          {hasSource ? (
            <>
              <CopyScriptButton scriptPath={scriptPath!} indicatorName={ind.name} />
              <a
                href={sourceUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-[#B87333] px-6 py-3 font-mono text-sm tracking-wide text-[#E8C46A] transition-colors hover:bg-[#B87333]/10"
              >
                VIEW ON GITHUB →
              </a>
            </>
          ) : (
            <span className="rounded border border-[#B87333]/40 px-6 py-3 font-mono text-sm tracking-wide text-[#F5EDD8]/50">
              SOURCE COMING SOON
            </span>
          )}
          <a
            href={`${REPO_URL}/tree/main/${sourceDirectory}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#B87333] px-6 py-3 font-mono text-sm tracking-wide text-[#E8C46A] transition-colors hover:bg-[#B87333]/10"
          >
            REPO
          </a>
        </div>

        {ind.attributionUrl && (
          <aside className="mt-8 rounded-lg border border-[#E8C46A]/50 bg-[#E8C46A]/10 p-5" role="note" aria-label="Source attribution">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C46A]">Attribution notice</p>
            <p className="mt-2 text-sm leading-relaxed text-[#F5EDD8]/85">
              The indicator is adopted from the free version of{' '}
              <a href={ind.attributionUrl} target="_blank" rel="noopener noreferrer" className="text-[#E8C46A] underline">
                https://orderflowlabs.com/
              </a>{' '}
              OrderFlowLabs free indicators.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#F5EDD8]/60">
              This is an independent clean-room Quantower compatibility implementation and is not an official OrderFlowLabs product.
            </p>
          </aside>
        )}

        {/* Overview */}
        <Section title="Overview">
          <p className="leading-relaxed text-[#F5EDD8]/80">{ind.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ind.markets.map((m) => (
              <span key={m} className="rounded border border-[#B87333]/40 px-2 py-0.5 font-mono text-xs text-[#F5EDD8]/60">{m}</span>
            ))}
          </div>
        </Section>

        {ind.theoryReference && (
          <Section title="Theory Reference">
            <div className="overflow-hidden rounded-lg border border-[#B87333]/30 bg-white p-3">
              <Image
                src={ind.theoryReference.image}
                alt={ind.theoryReference.alt}
                width={553}
                height={666}
                className="mx-auto h-auto w-auto max-w-full"
                sizes="(max-width: 768px) 90vw, 553px"
              />
            </div>
            <div className="mt-4 rounded-lg border border-[#E8C46A]/50 bg-[#E8C46A]/10 p-5" role="note" aria-label="Theory reference disclosure">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C46A]">Reference disclaimer</p>
              <p className="mt-2 text-sm leading-relaxed text-[#F5EDD8]/85">{ind.theoryReference.disclaimer}</p>
            </div>
          </Section>
        )}

        {/* Features */}
        <Section title="Features">
          <ul className="space-y-2.5">
            {ind.features.map((f) => (
              <li key={f} className="flex gap-3 leading-relaxed text-[#F5EDD8]/80">
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
                className={`flex flex-col gap-1 px-4 py-3.5 md:flex-row md:items-center md:gap-6 ${i % 2 === 0 ? 'bg-[#111827]' : 'bg-[#0B0F19]'}`}
              >
                <span className="w-48 shrink-0 font-mono text-sm font-semibold text-[#E8C46A]">{s.name}</span>
                <span className="text-sm leading-relaxed text-[#F5EDD8]/75">{s.meaning}</span>
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
                className={`flex flex-col gap-1 px-4 py-3.5 md:flex-row md:items-center md:gap-6 ${i % 2 === 0 ? 'bg-[#111827]' : 'bg-[#0B0F19]'}`}
              >
                <span className="w-44 shrink-0 text-sm font-semibold text-[#F5EDD8]">{s.name}</span>
                <span className="w-20 shrink-0 font-mono text-sm text-[#E8C46A]">{s.defaultValue}</span>
                <span className="text-sm leading-relaxed text-[#F5EDD8]/70">{s.description}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* How to use */}
        <Section title="How To Use">
          <ol className="space-y-4">
            {ind.howToUse.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B87333] font-mono text-sm font-bold text-[#0B0F19]">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed text-[#F5EDD8]/80">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Best practices */}
        <Section title="Best Practices">
          <Callout>
            <ul className="space-y-2.5">
              {ind.bestPractices.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-[#B87333]">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Callout>
        </Section>

        {/* Back link */}
        <div className="mt-14 text-center">
          <Link href="/" className="font-mono text-sm text-[#E8C46A] hover:underline">← BACK TO ALL INDICATORS</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-6 font-display text-2xl font-semibold text-[#F5EDD8]">{title}</h2>
      {children}
    </section>
  );
}
