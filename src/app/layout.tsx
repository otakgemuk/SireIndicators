import type { Metadata } from 'next';
import { EB_Garamond, Libre_Baskerville, DM_Mono } from 'next/font/google';
import './globals.css';

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const baskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SireIndicators — Free Pine Script Indicators for Futures Traders',
  description:
    'Free TradingView indicators for ES, NQ, MES, MNQ futures. Opening range breakout systems, rule-based scoring engines, and price action tools by SireMammat.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${garamond.variable} ${baskerville.variable} ${dmMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
