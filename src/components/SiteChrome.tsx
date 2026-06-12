import Link from 'next/link';
import { CrownedCandle } from './CrownedCandle';

export const REPO_URL = 'https://github.com/otakgemuk/SireIndicators';
export const MAIN_SITE = 'https://siremammat.vercel.app';
export const DISCORD_URL = 'http://bit.ly/motdisc';

export function TickerBar() {
  return (
    <div className="border-b border-[#B87333]/25 bg-[#0a0703] py-1.5">
      <p className="text-center font-mono text-[11px] tracking-[0.2em] text-[#E8C46A]/80">
        ES · NQ · MES · MNQ — FREE PINE SCRIPT TOOLS — LEARN TO READ PRICE
      </p>
    </div>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#B87333]/30 bg-[#0E0A04]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <CrownedCandle size={26} />
          <span className="font-display text-xl font-semibold tracking-wide text-[#F5EDD8]">
            Sire<span className="text-[#E8C46A]">Indicators</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="hidden text-[#F5EDD8]/70 transition-colors hover:text-[#E8C46A] sm:block">
            SireMammat.com
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#B87333] px-4 py-1.5 font-mono text-xs tracking-wider text-[#E8C46A] transition-colors hover:bg-[#B87333] hover:text-[#0E0A04]"
          >
            GITHUB
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#B87333]/40 bg-[#16100a] p-6">
      <p className="mb-3 font-display text-sm font-semibold tracking-wide text-[#E8C46A]">♛ From the desk of SireMammat</p>
      <div className="text-sm leading-relaxed text-[#F5EDD8]/80">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#B87333]/25 bg-[#0a0703]">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 sm:grid-cols-3">
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold tracking-widest text-[#B87333]">EDUCATION</h4>
          <ul className="space-y-2 text-sm text-[#F5EDD8]/70">
            <li><a className="hover:text-[#E8C46A]" href={`${MAIN_SITE}/strategies`} target="_blank" rel="noopener noreferrer">Strategies</a></li>
            <li><a className="hover:text-[#E8C46A]" href={`${MAIN_SITE}/playbooks`} target="_blank" rel="noopener noreferrer">Playbooks</a></li>
            <li><a className="hover:text-[#E8C46A]" href={`${MAIN_SITE}/calculator`} target="_blank" rel="noopener noreferrer">Calculators</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold tracking-widest text-[#B87333]">ANALYSIS</h4>
          <ul className="space-y-2 text-sm text-[#F5EDD8]/70">
            <li><a className="hover:text-[#E8C46A]" href={MAIN_SITE} target="_blank" rel="noopener noreferrer">Market Analysis</a></li>
            <li><a className="hover:text-[#E8C46A]" href={REPO_URL} target="_blank" rel="noopener noreferrer">Indicator Source Code</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold tracking-widest text-[#B87333]">CONNECT</h4>
          <ul className="space-y-2 text-sm text-[#F5EDD8]/70">
            <li><a className="hover:text-[#E8C46A]" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">Discord Community</a></li>
            <li><a className="hover:text-[#E8C46A]" href={MAIN_SITE} target="_blank" rel="noopener noreferrer">SireMammat.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#B87333]/15 py-5 text-center">
        <p className="font-display text-sm text-[#F5EDD8]/60">♛ Learn to read price — free, always.</p>
        <p className="mt-1 font-mono text-[11px] text-[#F5EDD8]/40">
          © SireMammat (MightyOx Ventures) · Educational tools only · Not financial advice · Futures trading involves substantial risk
        </p>
      </div>
    </footer>
  );
}
