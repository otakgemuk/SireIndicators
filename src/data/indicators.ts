// ============================================================
// SIREINDICATORS LIBRARY — SINGLE SOURCE OF TRUTH
// To publish a new indicator: add one object to this array.
// The site auto-generates the card + detail page. No other
// code changes needed.
// ============================================================

export interface Indicator {
  slug: string;
  name: string;
  version: string;
  tagline: string;
  category: 'Breakout' | 'Trend' | 'Momentum' | 'Volume' | 'Structure';
  status: 'Stable' | 'Beta' | 'In Development';
  markets: string[];
  timeframes: string;
  description: string;
  features: string[];
  signals: { name: string; meaning: string }[];
  settings: { name: string; defaultValue: string; description: string }[];
  howToUse: string[];
  bestPractices: string[];
  sourceFile: string; // filename in repo root
}

export const indicators: Indicator[] = [
  {
    slug: 'institutional-orb-brooks-box',
    name: 'Institutional ORB + Brooks Box',
    version: 'v3',
    tagline: 'Opening Range Breakout with confluence scoring and Al Brooks price action context',
    category: 'Breakout',
    status: 'Stable',
    markets: ['ES', 'NQ', 'MES', 'MNQ'],
    timeframes: '1m – 15m (intraday)',
    description:
      'A complete opening-range trading system. It builds the opening range, classifies the day type (Coil, Breakout, Trading Range), then grades every breakout with a confluence score from A+ to C using gap analysis, VWAP positioning, relative volume, time-of-day quality, and ADR consumption. Brooks Box logic frames the session in Al Brooks price action context so you only take breakouts with institutional participation behind them.',
    features: [
      'Confluence scoring engine (0–8 points) graded A+ / A / B / C',
      'Automatic day-type classification: COIL, BREAKOUT, TRADING RANGE',
      'Initial Balance extensions with measured-move targets',
      'Gap analysis: up gap, down gap, gap fill tracking',
      'Relative volume gate — signals suppressed without volume confirmation',
      'ADR consumption meter to avoid late-day chasing',
      'Time-of-day quality filter (prime / neutral / caution windows)',
      'Optional suppression of trading-range days and lunch chop',
    ],
    signals: [
      { name: 'BRK ▲ / BRK ▼', meaning: 'Opening range breakout up / down with confluence grade attached' },
      { name: 'FAIL ▲ / FAIL ▼', meaning: 'Failed breakout — fade opportunity back into the range' },
      { name: 'RT ▲ / RT ▼', meaning: 'Successful retest of the broken range edge — second-entry opportunity' },
      { name: 'A+ / A grade', meaning: 'Full confluence — highest probability, full size' },
      { name: 'B / C grade', meaning: 'Partial confluence — reduced size or skip' },
    ],
    settings: [
      { name: 'OR Time Period', defaultValue: '30 min', description: 'Length of the opening range window from session open' },
      { name: 'Volume Gate', defaultValue: '1.2x', description: 'Minimum relative volume multiple required to print a signal' },
      { name: 'Target Percent', defaultValue: '50%', description: 'Measured-move target as a percentage of OR width' },
      { name: 'Suppress TR Days', defaultValue: 'On', description: 'Hide breakout signals when the day classifies as Trading Range' },
      { name: 'Contracts', defaultValue: '10', description: 'Position size used for the dollar P/L readout' },
      { name: 'Tick Value', defaultValue: '12.50', description: 'Per-tick dollar value (ES default)' },
    ],
    howToUse: [
      'Open TradingView and go to Pine Editor (bottom panel).',
      'Copy the full source from the file linked below and paste it into the editor.',
      'Click "Add to chart". Set your chart to a 1m–15m intraday timeframe on ES/NQ/MES/MNQ.',
      'Wait for the opening range to complete (default first 30 minutes of the session).',
      'Only consider signals graded A or A+ when starting out — the grade prints with each signal.',
      'Use the dashboard panel to check day type, ADR consumption, and volume status before entry.',
    ],
    bestPractices: [
      'A+ breakouts on BREAKOUT-classified days are the bread-and-butter trade.',
      'Skip signals after 70% ADR consumption — the move is mostly done.',
      'FAIL signals work best on COIL days that trap early breakout traders.',
      'Respect the volume gate. No volume, no trade — that is the institutional footprint filter.',
    ],
    sourceFile: 'Institutional ORB + Brooks Box v3',
  },
  {
    slug: 'raschke-12-rules',
    name: 'Raschke 12 Rules — SireMammat Edition',
    version: 'v1',
    tagline: "Linda Raschke's classic playbook converted into a 12-rule scoring engine",
    category: 'Trend',
    status: 'Stable',
    markets: ['ES', 'NQ', 'MES', 'MNQ'],
    timeframes: '5m – 1H',
    description:
      "Linda Raschke's trading principles encoded into an objective bull/bear scoring engine. Each of the 12 rules is checked in real time — EMA stack alignment, momentum, volume, range expansion and more — and produces a live Bull Score and Bear Score from 0–12. When a side reaches the minimum threshold with volume confirmation, the indicator prints a graded signal: from full trend entries to pullback continuations, failed-breakout fades, and exhaustion warnings.",
    features: [
      'Live Bull Score and Bear Score (0–12) with rule-by-rule checklist',
      'Triple EMA stack analysis (9 / 20 / 50) with alignment states',
      'Signal quality grading: STRONG, SOLID, MODERATE, WEAK',
      'Six signal types covering trend, pullback, fade, and exhaustion setups',
      'Volume confirmation gate on every signal',
      'RSI and ATR context in the dashboard panel',
    ],
    signals: [
      { name: 'LONG / SHORT', meaning: 'Bull or Bear score reached threshold with full confirmation — trend entry' },
      { name: 'PULLBACK', meaning: 'Continuation entry after a retrace to the EMA stack within an active trend' },
      { name: 'FAILED BREAKOUT', meaning: 'Breakout failed and reversed — fade signal against trapped traders' },
      { name: 'EXHAUSTION', meaning: 'Trend over-extended — take profits or tighten stops, do not initiate' },
      { name: 'DIVERGENCE', meaning: 'Price/momentum divergence detected — early reversal warning' },
    ],
    settings: [
      { name: 'Fast EMA', defaultValue: '9', description: 'Fast moving average of the stack' },
      { name: 'Mid EMA', defaultValue: '20', description: 'Mid moving average of the stack' },
      { name: 'Slow EMA', defaultValue: '50', description: 'Slow moving average / trend filter' },
      { name: 'Min Bull Score', defaultValue: '8', description: 'Minimum score (of 12) required to print a LONG signal' },
      { name: 'Min Bear Score', defaultValue: '8', description: 'Minimum score (of 12) required to print a SHORT signal' },
      { name: 'Volume Multiplier', defaultValue: '1.2x', description: 'Relative volume required for signal confirmation' },
    ],
    howToUse: [
      'Open TradingView and go to Pine Editor (bottom panel).',
      'Copy the full source from the file linked below and paste it into the editor.',
      'Click "Add to chart". Works best on 5m–1H charts on index futures.',
      'Watch the rule checklist panel — a score of 8+ on either side arms that direction.',
      'Enter on the printed signal, not on the score alone. The signal includes volume confirmation.',
      'Use EXHAUSTION and DIVERGENCE prints as exit management, not as entries.',
    ],
    bestPractices: [
      'STRONG-grade signals with a PERFECT EMA stack are the highest-probability entries.',
      'PULLBACK signals in an established trend outperform fresh breakout entries.',
      'When both Bull and Bear scores are below 6, stand aside — the market has no edge.',
      'Score 8 is the floor, not the target. 10–12 readings are where the real trades live.',
    ],
    sourceFile: 'Raschke 12 Rules-SireMammatEdition',
  },
];

export function getIndicator(slug: string): Indicator | undefined {
  return indicators.find((i) => i.slug === slug);
}
