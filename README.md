# ♛ SireIndicators

**Free indicators for futures traders** — by SireMammat (MightyOx Ventures).

Live site: https://sire-indicators.vercel.app

## The Indicators

| Indicator | Version | Platform / Category | Source |
|---|---|---|---|
| Institutional ORB + Brooks Box | v3 | TradingView / Breakout | [`Source`](./scripts/institutional-orb-brooks-box.pine) |
| Raschke 12 Rules — SireMammat Edition | v1 | TradingView / Trend | [`Source`](./scripts/raschke-12-rules.pine) |
| LBR 3-10 Oscillator | v1 | TradingView / Momentum | [`Documentation`](./docs/LBR-3-10-Oscillator.md) · [`Source`](./scripts/lbr-3-10-oscillator.pine) |
| Sire Order Blocks | v1 | TradingView / ICT | [`Source`](./scripts/sire-order-blocks.pine) · [`Guide`](https://sire-indicators.vercel.app/indicators/sire-order-blocks) |
| Sire Adaptive Kalman Filter Pro | v1 | Quantower / Order Flow | [`Documentation`](./docs/Sire-Adaptive-Kalman-Filter-Quantower.md) · [`Source`](./quantower/SireAdaptiveKalmanFilter.cs) |

Each indicator includes source and usage guidance. The live site contains TradingView-focused guides; Quantower installation instructions are in the repository documentation.

## How To Install a TradingView Indicator

1. Open TradingView → Pine Editor.
2. Copy the relevant source file from `scripts/`.
3. Paste it into Pine Editor and select **Add to chart**.

## How To Install a Quantower Indicator

Follow the [Sire Adaptive Kalman Filter Pro guide](./docs/Sire-Adaptive-Kalman-Filter-Quantower.md) to compile and install the C# indicator.

## Disclaimer

Educational tools only. Not financial advice. Trading futures involves substantial risk of loss.
