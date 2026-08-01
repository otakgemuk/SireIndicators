# LBR 3-10 Oscillator

## Overview

The SireIndicators LBR 3-10 Oscillator is a momentum analysis tool based on Linda Bradford Raschke's classic 3-10 oscillator.

It measures the relationship between short-term and intermediate momentum to identify acceleration, deceleration, directional bias, and exhaustion.

## Source Code

TradingView Pine Script source:

[`LBR310.pine`](../LBR310.pine)

## Calculation

Fast momentum:

`SMA(3) - SMA(10)`

Signal:

`SMA(Fast, 16)`

Histogram:

`Fast - Signal`

The oscillator is designed to measure momentum change rather than traditional overbought or oversold conditions.

## Reading The Indicator

### Zero Line Bias

Above zero:
- Positive momentum bias
- Favor long-side confirmation

Below zero:
- Negative momentum bias
- Favor short-side confirmation

### Signal Crosses

Fast crossing above Signal:
- Momentum improving
- Potential bullish shift

Fast crossing below Signal:
- Momentum weakening
- Potential bearish shift

## Histogram

Expanding histogram:
- Momentum acceleration
- Stronger directional pressure

Contracting histogram:
- Momentum slowing
- Possible consolidation or exhaustion

## Divergence Detection

The indicator includes automatic pivot divergence detection.

Bullish divergence:
- Price creates a lower low
- Oscillator creates a higher low

Bearish divergence:
- Price creates a higher high
- Oscillator creates a lower high

Divergence should be combined with market structure and execution confirmation.

## Trading Framework

Use the LBR 3-10 as a momentum confirmation layer:

Context → Structure → Momentum → Execution → Risk Management

Recommended combinations:

- VWAP
- Support and resistance
- Volume analysis
- Market structure

## Alerts

Included alerts:

- Zero line crosses
- Signal crosses
- Bullish divergence
- Bearish divergence

## Classification

Category: Momentum / Confirmation

Style: Intraday and Swing

Markets: Futures, Stocks, Forex, Crypto

The oscillator does not predict price. It helps identify when momentum supports a trading decision.
