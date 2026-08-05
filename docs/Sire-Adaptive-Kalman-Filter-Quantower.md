# Sire Adaptive Kalman Filter Pro — Quantower

A Quantower-native order-flow pressure oscillator that combines an adaptive Kalman filter with session CVD, VWAP location, Initial Balance structure, and trend-day confirmation.

## Measurement model

The default composite pressure score is:

- Session CVD: 55%
- ATR-normalized VWAP location: 20%
- Initial Balance position: 15%
- Confirmed trend-day state: 10%

The four weights are configurable. Adaptive measurement noise increases during elevated volatility, reducing the filter's reaction to noisy price moves.

## Defaults

- Session: 09:30–16:00
- Initial Balance: first 60 minutes
- ATR length: 14
- Trend-day expansion threshold: session range >= 1.5 × Initial Balance range

Session times follow the timestamps supplied to the indicator by Quantower. Adjust them when your chart or connection uses another time zone.

## Trend-day classification

A bullish trend day requires:

1. The Initial Balance period has ended.
2. Price is above the Initial Balance high.
3. Price is above session VWAP.
4. Session cumulative delta is positive.
5. Session range is at least the configured multiple of the Initial Balance range.

The bearish classification uses the inverse conditions. Otherwise the dashboard reports `BALANCED / UNCONFIRMED`.

## Installation

1. Create a Quantower Indicator project using the Quantower Algo Visual Studio template.
2. Replace the template class with [`SireAdaptiveKalmanFilter.cs`](../quantower/SireAdaptiveKalmanFilter.cs).
3. Build against the `TradingPlatform.BusinessLayer.dll` from your Quantower installation.
4. Place the resulting DLL under:
   `Settings/Scripts/Indicators/SireAdaptiveKalmanFilter/`
5. Restart Quantower and add **Sire Adaptive Kalman Filter Pro** to a chart.

## Volume Analysis requirement

CVD requires Quantower Volume Analysis data. Enable or calculate Volume Analysis for the chart and ensure the data connection provides aggressor-side trade data.

The dashboard reports:

- `ORDER FLOW` when CVD data is available.
- `PRICE FALLBACK` when it is unavailable.

The fallback can be disabled in indicator settings. When enabled, it uses the original ATR-normalized price change measurement outside order-flow availability.

## Automatic data-mode switching

No separate mode-change indicator is required. SAKF Pro checks Quantower Volume Analysis data on every update and selects the active measurement automatically:

- `ORDER FLOW`: valid analyzed bid/ask delta is available, so the composite uses CVD together with VWAP location, Initial Balance position, and trend-day state.
- `PRICE FALLBACK`: valid delta is unavailable and **Fallback to price proxy** is enabled, so ATR-normalized price change replaces the order-flow measurement.
- Neutral measurement: valid delta is unavailable and **Fallback to price proxy** is disabled.

The indicator can detect Volume Analysis data, but it cannot enable or calculate the platform service itself. Enable Volume Analysis on the Quantower chart and use a data connection that supplies aggressor-side trade data. The dashboard's `Data` row confirms the mode currently in use.

## Dashboard

The dashboard reports current bias, momentum, CVD direction, VWAP position, Initial Balance relationship, day type, volatility regime, Kalman gain, and active data mode.

## Disclaimer

Educational software only. It is not financial advice and does not guarantee profitable signals.
