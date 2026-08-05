// ============================================================
// SIREINDICATORS — DATA LOADER
// Content lives in /data/indicators.json (the CMS file).
// Edit that JSON on GitHub web → commit → Vercel auto-deploys.
// This file only provides types + helpers. Don't edit content here.
// ============================================================

import data from '../../data/indicators.json';

export interface Indicator {
  slug: string;
  name: string;
  version: string;
  platform?: string;
  tagline: string;
  category: string;
  status: string;
  markets: string[];
  timeframes: string;
  description: string;
  features: string[];
  signals: { name: string; meaning: string }[];
  settings: { name: string; defaultValue: string; description: string }[];
  howToUse: string[];
  bestPractices: string[];
  sourceFile: string;
}

export const indicators: Indicator[] = data as Indicator[];

export function getIndicator(slug: string): Indicator | undefined {
  return indicators.find((i) => i.slug === slug);
}
