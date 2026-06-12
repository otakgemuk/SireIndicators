import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SireIndicators Trading Dashboard',
  description: 'Professional trading dashboard for Institutional ORB and Raschke 12 Rules',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme') || 'dark';
              if (theme === 'dark') document.documentElement.classList.add('dark');
            } catch (e) {}
          `,
        }} />
      </head>
      <body className="bg-surface text-primary dark:bg-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
