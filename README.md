# ♛ SireIndicators

**Free Pine Script indicators for futures traders** — by SireMammat (MightyOx Ventures).

Live site: https://sire-indicators.vercel.app

## The Indicators

| Indicator | Version | Category | Source |
|---|---|---|---|
| Institutional ORB + Brooks Box | v3 | Breakout | [`Institutional ORB + Brooks Box v3`](./Institutional%20ORB%20%2B%20Brooks%20Box%20v3) |
| Raschke 12 Rules — SireMammat Edition | v1 | Trend | [`Raschke 12 Rules-SireMammatEdition`](./Raschke%2012%20Rules-SireMammatEdition) |

Each indicator has a full usage guide on the live site: signals, settings, install steps, and best practices.

## ✏️ Updating Content (the CMS)

**All site content lives in one file: [`data/indicators.json`](./data/indicators.json)**

### To edit an existing indicator
1. Open `data/indicators.json` on GitHub (works on mobile)
2. Click the pencil icon → edit → Commit changes
3. Vercel auto-deploys in ~2 minutes. Done.

### To publish a NEW indicator
1. Add the Pine Script source file to the repo root
2. Edit `data/indicators.json` → copy an existing indicator block → paste → update the fields (slug must be unique, `sourceFile` must match the Pine filename exactly)
3. Commit — the site auto-generates the card + full guide page

No code changes ever needed. The JSON fields:

| Field | What it controls |
|---|---|
| `slug` | URL: `/indicators/{slug}` |
| `name`, `version`, `tagline` | Card + page header |
| `category`, `status`, `markets`, `timeframes` | Badges |
| `description` | Overview paragraph |
| `features` | Feature bullet list |
| `signals` | Signal guide table |
| `settings` | Settings table |
| `howToUse` | Numbered install/usage steps |
| `bestPractices` | ♛ callout box |
| `sourceFile` | Filename of the Pine source in repo root |

## How To Install an Indicator (TradingView)

1. Open TradingView → Pine Editor
2. Copy the source file contents from this repo
3. Paste into Pine Editor → "Add to chart"

## Disclaimer

Educational tools only. Not financial advice. Trading futures involves substantial risk of loss.
