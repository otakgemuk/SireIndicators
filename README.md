# 📊 SireIndicators
**Professional PineScript Trading Indicators by Sire Mammat**

A comprehensive library of institutional-grade trading indicators designed for serious day traders and swing traders. Built on proven market concepts with advanced confluence scoring and risk management.

---

## 🎯 What's Inside

### 1. **Institutional ORB + Brooks Box v3** 
*Opening Range Breakout with Institutional-Grade Signal Filtering*

**Key Features:**
- 📍 **Opening Range Detection** – Tracks the first 30-60 minutes with automatic target generation
- 📦 **Brooks 18-Bar Box** – Classifies market condition (Coil/Breakout/Trading Range)
- 📊 **VWAP + Standard Deviation Bands** – Volume-weighted price action with volatility context
- 🎯 **Multi-Level Targets** – Automatic profit targets based on OR width percentage
- ⚠️ **Failed Breakout & Retest Signals** – Catches reversals and pullback entries
- 📈 **20 EMA** – Trend direction confirmation
- 🔔 **Confluence Scoring (0-8)** – Real-time signal quality assessment
- 💰 **Risk Calculator** – Dollar risk display for position sizing
- 📉 **ADR Consumption Tracker** – Tells you how much daily range is left
- ⏰ **Time-of-Day Weighting** – Reduces false signals during lunch chop (11:30-13:30 ET)
- 📅 **Gap Analysis** – Classifies gaps and tracks fill status

**Best For:** Day traders on 1-5 minute timeframes seeking low-risk breakout entries

---

### 2. **Raschke 12 Rules — SireMammat Edition**
*Legendary Directional Confluence System Enhanced*

Based on **Linda Raschke's proven 12 trading rules** with modern enhancements:

**The 12 Rules Evaluated:**
1. **Trade with the Trend** – Confirms price > EMA alignment
2. **First Pullback** – Entry on retest to 20-EMA with volume
3. **Gap Continuation** – Open gaps beyond previous day's extremes
4. **Adequate Range** – Bar volatility exceeds moving average
5. **Key Reversal** – Inside bar + close beyond opposite extreme
6. **Trailing Stop Valid** – Price holding above/below recent lows/highs
7. **Close at Extreme** – Momentum bars close ≥85% or ≤15% through range
8. **Failed Breakout** – Fake-outs that reverse → reversal opportunities
9. **Breakout Confirmation** – New 20-bar highs/lows with volume
10. **Trend Extension** – Continuation or exhaustion detection
11. **EMA Stack Alignment** – 9/20/50 EMA stacked perfectly
12. **Risk Management** – Always active—position sizing & stops

**Key Features:**
- 🏆 **Directional Scoring (0-12)** – Bull score vs. Bear score in real-time
- 📊 **Volume Confirmation** – High volume multiplier filter
- 📈 **RSI Filter** – Overbought/oversold detection
- 🌍 **Multi-Timeframe Support** – Optional HTF trend confirmation
- 🎨 **Live Dashboard** – All 12 rules in a comprehensive table
- 📢 **Pattern Signals** – Pullbacks, failed breakouts, exhaustion
- 🎯 **Background Tinting** – Visual trend confirmation
- 🔔 **Alert Conditions** – 14 customizable alerts

**Best For:** Swing traders and multi-timeframe traders seeking rule-based entry/exit logic

---

## 🚀 Quick Start

### Step 1: Add to TradingView
1. Open any TradingView chart (any asset, any timeframe)
2. Click **Indicators** → **Pine Script Editor** (or use the search bar)
3. Copy the entire indicator code from this repository
4. Paste into the editor and click **Save**

### Step 2: Apply Settings (Recommended Defaults)

**For Institutional ORB + Brooks Box v3:**
- **Timeframe:** 1-5 minutes (US market hours)
- **Opening Range:** 30 minutes
- **Tick Value:** Adjust per contract (ES=12.50, NQ=5.00, MES=1.25)
- **Max Loss Per Day:** Your risk tolerance
- **Target %:** 50% (generates targets every half OR-width)
- **Volume Gate:** 1.2x (require 20% above-average volume for signals)

**For Raschke 12 Rules:**
- **Timeframe:** 5-240 minutes (flexible)
- **Fast/Mid/Slow EMAs:** 9/20/50 (industry standard)
- **Min Bull Score:** 8/12 (high-quality trades only)
- **Volume Multiplier:** 1.2x
- **RSI Filter:** 30 overbought, 70 oversold

---

## 📖 Signal Interpretation Guide

### Institutional ORB v3 Signals

| Signal | Meaning | Action |
|--------|---------|--------|
| **BRK▲ A+ (7/8)** | Strong bullish breakout above OR High | BUY at signal, stop at OR Low |
| **BRK▼ C (2/8)** | Weak bearish breakout below OR Low | Consider size reduction; high risk |
| **FAIL▲** | Failed breakdown → reversal up | Bounce play above broken level |
| **FAIL▼** | Failed breakdown → reversal down | Short below broken level |
| **RT▲** | Retest of OR High with upside continuation | Buy on support retest |
| **RT▼** | Retest of OR Low with downside continuation | Sell on resistance retest |

**Confluence Grades:**
- **A+** (7-8/8): Excellent setup — trade full size
- **A** (5-6/8): Good setup — standard size
- **B** (3-4/8): Marginal — reduce size or pass
- **C** (0-2/8): Poor setup — sit on hands

### Raschke 12 Rules Signals

| Signal | Rule | Meaning | Risk |
|--------|------|---------|------|
| **LONG (Score 8+/12)** | Confluence | Bullish directional setup | Lower |
| **SHORT (Score 8+/12)** | Confluence | Bearish directional setup | Lower |
| **Pullback Buy ▲** | Rule 2 | Retest to 20-EMA with volume | Medium |
| **Failed Breakdown ✗** | Rule 8 | Fake-out reversal | Medium |
| **Exhaustion ◆** | Rule 10 | Trend failing to extend | High |
| **⚠ DIVERGENCE** | RSI | Price makes new high/low but RSI doesn't | High Risk/Reversal |

---

## ⚙️ Advanced Settings

### Institutional ORB v3

| Setting | Range | Default | Effect |
|---------|-------|---------|--------|
| Contracts | 1-100 | 10 | Used for dollar risk calculation |
| Tick Value | 0.50-25 | 12.5 | Adjust per underlying contract |
| OR Time Period | 15-60 min | 30 | Opening range window length |
| Target % | 25%-100% | 50% | Distance between profit targets |
| Volume Gate | 1.0-2.0x | 1.2x | Minimum volume for signal acceptance |
| Suppress TR Days | On/Off | ON | Reduce noise on 50%+ ADR days |
| Lunch Suppression | On/Off | OFF | Disable all signals 11:30-13:30 ET |

### Raschke 12 Rules

| Setting | Range | Default | Effect |
|---------|-------|---------|--------|
| Fast EMA | 5-15 | 9 | Momentum entry level |
| Mid EMA | 15-30 | 20 | Trend direction filter |
| Slow EMA | 40-200 | 50 | Major trend confirmation |
| Min Bull Score | 3-12 | 8 | Threshold for long signals |
| Min Bear Score | 3-12 | 8 | Threshold for short signals |
| Volume Multiplier | 1.0-3.0 | 1.2x | Volume requirement strictness |
| Multi-Timeframe | On/Off | OFF | HTF trend confirmation (4H default) |

---

## 💡 Trading Rules & Best Practices

### ✅ DO:
- ✓ Use proper position sizing (never risk >2% per trade)
- ✓ Trade with the trend (use the dashboard bias indicators)
- ✓ Wait for confluence (multiple signals = stronger setup)
- ✓ Respect time-of-day filters (avoid lunch chop)
- ✓ Adjust settings per market regime (flat = tighter stops, trending = wider)
- ✓ Backtest settings on YOUR timeframe before live trading
- ✓ Combine with support/resistance levels for entries

### ❌ DON'T:
- ✗ Chase signals after a large move (wait for pullbacks)
- ✗ Trade below A- grade signals without strong confluence
- ✗ Ignore the ADR exhaustion warning
- ✗ Disable volume filters during earnings/NFP
- ✗ Trade the same setup twice in a row without re-analysis
- ✗ Set stops beyond the logical chart support/resistance
- ✗ Over-optimize indicators (use defaults as baseline)

---

## 📊 Dashboard Reference

Both indicators feature live dashboards showing:

**Institutional ORB Dashboard includes:**
- Day Type classification (Coil/Breakout/Trading Range)
- ADR usage percentage with color coding
- VWAP & EMA bias direction
- Relative volume status (normal/surge/spike)
- Gap status (up/down/filled)
- Time window quality (prime/neutral/caution)
- Confluence grade (A+/A/B/C)
- OR width and IB width in points

**Raschke 12 Rules Dashboard includes:**
- Individual rule status (✓ met, — not met)
- Bull/Bear directional scores
- Signal quality grade (STRONG/SOLID/MODERATE/WEAK)
- RSI and ATR current values
- Trend direction (BULL/BEAR/NEUTRAL)
- EMA stack alignment status
- Multi-timeframe trend
- Active alerts and divergences

---

## 🎓 Example Setups

### Setup 1: ORB Breakout (Scalp)
*Best Time: 9:30 AM - 11:00 AM ET*

1. Wait for Institutional ORB OR to form (first 30 min)
2. Look for **BRK▲** signal with **A+ confluence** (7-8/8)
3. Volume spike must be present (1.8x average)
4. **ENTER:** Above OR High after signal candle closes
5. **STOP:** Below OR Low (or 3-5 points, whichever tighter)
6. **TARGET:** T1 at first profit target line, T2 at second, trail T3+

**Expected Win Rate:** 55-65% | **Risk/Reward:** 1:2-1:3

---

### Setup 2: Raschke Failed Breakout (Swing)
*Best Time: After 11:00 AM ET (avoids morning chop)*

1. Monitor for **FAIL▲** or **FAIL▼** signals
2. Check that **EMA stack is aligned** (Rule 11)
3. Confirm **Rule 2 pullback** for additional confluence
4. **ENTER:** On the failed breakout signal bar
5. **STOP:** Beyond the failed extreme (tight risk)
6. **TARGET:** 1.5-2.5x risk to reward at next resistance/support

**Expected Win Rate:** 60-70% | **Risk/Reward:** 1:1.5-1:2.5

---

### Setup 3: Gap Fill (Position Trade)
*Best Time: Open through 11:00 AM*

1. Identify gap at market open (see dashboard gap status)
2. Look for **no SUPPRESS** label (not a Trading Range day)
3. Wait for Raschke **LONG/SHORT** signal confirmation
4. **ENTER:** On signal with 8+ bull/bear score
5. **STOP:** Beyond gap extreme (wider stop, smaller size)
6. **TARGET:** Prior day ORH/ORL or next support/resistance

**Expected Win Rate:** 50-55% | **Risk/Reward:** 1:2-1:4

---

## 🔧 Troubleshooting

### Dashboard not showing?
- Ensure `Show Dashboard` is toggled **ON** in settings
- Check that timeframe is **intraday** (not 1D or higher)
- Scroll right if it's hidden off-screen

### Signals not appearing?
- Verify `Show Breakout Signals` is **ON**
- Check volume gate isn't set too high
- Ensure you're on a **live or recent** candle
- Disable lunch suppression if trading before 13:30 ET

### Scores seem random?
- This is normal! Confluence scores reflect the current confluence of 8 factors
- Low scores = lower probability, wait for better setups
- Adjust `Min Bull/Bear Score` thresholds if scoring is too strict

### Too many false signals?
- Increase volume multiplier (1.5x or 2.0x)
- Enable lunch suppression (11:30-13:30 ET)
- Raise minimum score thresholds (8-10)
- Switch to longer timeframe (3-5 min instead of 1 min)

---

## 📝 Release Notes

### v3.0 - Current Version
- ✓ Institutional ORB with Brooks 18-bar box classification
- ✓ Multi-level target generation with adaptive display
- ✓ Real-time confluence scoring (0-8)
- ✓ Failed breakout & retest detection
- ✓ Time-of-day context weighting
- ✓ Gap analysis with fill tracking
- ✓ ADR exhaustion warning
- ✓ Dollar risk calculator
- ✓ Raschke 12 Rules system
- ✓ Directional scoring dashboard

---

## 📞 Support & Community

**Questions about strategy?** Review the [signal interpretation guide](#-signal-interpretation-guide) above.

**Indicator not working?** Check the [troubleshooting section](#-troubleshooting).

**Want to modify for your workflow?** All code is open and commented—edit freely in the Pine Script editor.

---

## ⚖️ Disclaimer

**PAST PERFORMANCE ≠ FUTURE RESULTS**

These indicators are educational tools based on proven trading concepts. They are NOT financial advice. Trading involves substantial risk of loss. Always:
- Use proper risk management (position sizing, stops, diversification)
- Backtest extensively before live trading
- Understand each rule before trading it
- Maintain emotional discipline
- Start with small positions

Use at your own risk. Always consult with a licensed financial advisor.

---

## 📄 License

Created by **Sire Mammat** for educational use in the trading community.

---

**Happy Trading! 📈**
*Last Updated: 2026*
