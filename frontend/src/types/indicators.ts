export type ConfluenceGrade = 'A+' | 'A' | 'B' | 'C';
export type SignalDirection = 'BULL' | 'BEAR' | 'NEUTRAL';
export type DayType = 'COIL' | 'BREAKOUT' | 'TRADING_RANGE';

export interface ORBSignal {
  id: string;
  type: 'BRK_UP' | 'BRK_DOWN' | 'FAIL_UP' | 'FAIL_DOWN' | 'RT_UP' | 'RT_DOWN';
  timestamp: Date;
  price: number;
  confluenceScore: number;
  confluenceGrade: ConfluenceGrade;
  volume: number;
  volumeMultiplier: number;
  description: string;
  action: 'BUY' | 'SELL' | 'WAIT';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface RaschkeSignal {
  id: string;
  type: 'LONG' | 'SHORT' | 'PULLBACK' | 'FAILED_BREAKOUT' | 'EXHAUSTION' | 'DIVERGENCE';
  timestamp: Date;
  bullScore: number;
  bearScore: number;
  signalQuality: 'STRONG' | 'SOLID' | 'MODERATE' | 'WEAK';
  rulesMet: string[];
  description: string;
  action: 'BUY' | 'SELL' | 'WAIT';
  confidence: number;
}

export interface ORBDashboard {
  timestamp: Date;
  dayType: DayType;
  openingRangeHigh: number;
  openingRangeLow: number;
  openingRangeWidth: number;
  vwap: number;
  ema20: number;
  adrConsumption: number;
  adrConsumptionLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  gapStatus: 'UP_GAP' | 'DOWN_GAP' | 'FILLED' | 'NONE';
  timeOfDayQuality: 'PRIME' | 'NEUTRAL' | 'CAUTION';
  relativeVolume: 'NORMAL' | 'SURGE' | 'SPIKE';
  currentSignal: ORBSignal | null;
  signals: ORBSignal[];
}

export interface RaschkeDashboard {
  timestamp: Date;
  trend: 'BULL' | 'BEAR' | 'NEUTRAL';
  bullScore: number;
  bearScore: number;
  ruleStatus: Array<{ rule: string; isMet: boolean; strength: number }>;
  ema9: number;
  ema20: number;
  ema50: number;
  emaStackAlignment: 'PERFECT' | 'ALIGNED' | 'MIXED' | 'MISALIGNED';
  rsi: number;
  atr: number;
  currentSignal: RaschkeSignal | null;
  signals: RaschkeSignal[];
}

export interface IndicatorDashboard {
  timestamp: Date;
  orb: ORBDashboard;
  raschke: RaschkeDashboard;
  symbol: string;
  timeframe: string;
  lastUpdate: Date;
  dataQuality: 'LIVE' | 'DELAYED' | 'OFFLINE';
}
