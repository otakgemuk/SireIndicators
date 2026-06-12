# ♛ SireIndicators

**Free Pine Script indicators for futures traders** — by SireMammat (MightyOx Ventures).

Live site: https://sire-indicators.vercel.app

## The Indicators

| Indicator | Version | Category | Source |
|---|---|---|---|
| Institutional ORB + Brooks Box | v3 | Breakout | [`Institutional ORB + Brooks Box v3`](./Institutional%20ORB%20%2B%20Brooks%20Box%20v3) |
| Raschke 12 Rules — SireMammat Edition | v1 | Trend | [`Raschke 12 Rules-SireMammatEdition`](./Raschke%2012%20Rules-SireMammatEdition) |

Each indicator has a full usage guide on the live site: signals, settings, install steps, and best practices.

## How To Install (TradingView)

1. Open TradingView → Pine Editor
2. Copy the source file contents from this repo
3. Paste into Pine Editor → "Add to chart"

## Publishing a New Indicator (maintainer workflow)

1. Add the Pine Script source file to the repo root
2. Open `src/data/indicators.ts` and add one new object to the `indicators` array (name, slug, signals, settings, how-to)
3. Commit and push — Vercel auto-deploys, and the site auto-generates the card + detail page

No other code changes needed.

## Disclaimer

Educational tools only. Not financial advice. Trading futures involves substantial risk of loss.
