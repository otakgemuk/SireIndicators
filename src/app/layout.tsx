import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
