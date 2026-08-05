# ♛ SireIndicators

**Free TradingView and Quantower indicators for futures traders** — by SireMammat (MightyOx Ventures).

Live site: https://sire-indicators.vercel.app

## The Indicators

| Indicator | Version | Category | Source |
|---|---|---|---|
| Institutional ORB + Brooks Box | v3 | Breakout | [`Source`](./scripts/institutional-orb-brooks-box.pine) |
| Raschke 12 Rules — SireMammat Edition | v1 | Trend | [`Source`](./scripts/raschke-12-rules.pine) |
| LBR 3-10 Oscillator | v1 | Momentum | [`Documentation`](./docs/LBR-3-10-Oscillator.md) · [`Source`](./scripts/lbr-3-10-oscillator.pine) |
| Sire Order Blocks | v1 | ICT / Smart Money | [`Source`](./scripts/sire-order-blocks.pine) · [`Guide`](https://sire-indicators.vercel.app/indicators/sire-order-blocks) |

The live site contains 21 full indicator guides with signals, settings, installation steps, data requirements, and best practices for TradingView and Quantower.


## How To Install a TradingView Indicator

1. Open TradingView → Pine Editor
2. Copy the source file contents from this repo
3. Paste into Pine Editor → "Add to chart"

## How To Install a Quantower Indicator

Use the linked Quantower guide, compile against the `TradingPlatform.BusinessLayer.dll` supplied by your installation, and place the resulting DLL in the indicated `Settings/Scripts/Indicators/` folder.

## Disclaimer

Educational tools only. Not financial advice. Trading futures involves substantial risk of loss.
