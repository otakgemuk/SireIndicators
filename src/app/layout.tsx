import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SireIndicators Dashboard',
  description: 'Trading Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
