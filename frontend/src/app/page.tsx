'use client';

import { useEffect, useState } from 'react';
import { useIndicatorStore } from '@/store/indicatorStore';

export default function Home() {
  const { dashboard, settings, setDashboard, isLoading } = useIndicatorStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    const mockDashboard = {
      timestamp: new Date(),
      symbol: settings.symbol,
      timeframe: settings.timeframe,
      lastUpdate: new Date(),
      dataQuality: 'LIVE' as const,
      orb: {
        timestamp: new Date(),
        dayType: 'BREAKOUT' as const,
        openingRangeHigh: 4665,
        openingRangeLow: 4620,
        openingRangeWidth: 45,
        vwap: 4642.5,
        ema20: 4640,
        adrConsumption: 65,
        adrConsumptionLevel: 'HIGH' as const,
        gapStatus: 'UP_GAP' as const,
        timeOfDayQuality: 'PRIME' as const,
        relativeVolume: 'SURGE' as const,
        currentSignal: null,
        signals: [],
      },
      raschke: {
        timestamp: new Date(),
        trend: 'BULL' as const,
        bullScore: 10,
        bearScore: 2,
        ruleStatus: [],
        ema9: 4645,
        ema20: 4640,
        ema50: 4630,
        emaStackAlignment: 'ALIGNED' as const,
        rsi: 65,
        atr: 8.5,
        currentSignal: null,
        signals: [],
      },
    };

    setDashboard(mockDashboard as any);
  }, [settings.symbol, settings.timeframe, setDashboard]);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold text-dark font-bold">♛</div>
            <h1 className="text-xl font-bold">SireIndicators</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-block h-12 w-12 rounded-full border-4 border-slate-300 border-t-brand-gold animate-spin" />
              <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                <p className="text-xs uppercase text-slate-600 dark:text-slate-400">Symbol</p>
                <p className="mt-2 text-2xl font-bold">{settings.symbol}</p>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                <p className="text-xs uppercase text-slate-600 dark:text-slate-400">Timeframe</p>
                <p className="mt-2 text-2xl font-bold">{settings.timeframe}m</p>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                <p className="text-xs uppercase text-slate-600 dark:text-slate-400">ADR Used</p>
                <p className="mt-2 text-2xl font-bold">{dashboard?.orb.adrConsumption.toFixed(0)}%</p>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                <p className="text-xs uppercase text-slate-600 dark:text-slate-400">Day Type</p>
                <p className="mt-2 text-2xl font-bold">{dashboard?.orb.dayType}</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 text-center text-slate-600 dark:text-slate-400">
              <p className="text-lg font-semibold">Dashboard Ready</p>
              <p className="mt-1 text-sm">Replace mock data with your API endpoint to get started</p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-4 text-center text-xs text-slate-600 dark:text-slate-400">
        <p>SireIndicators v1.0 • Professional Trading Dashboard</p>
      </footer>
    </div>
  );
}
