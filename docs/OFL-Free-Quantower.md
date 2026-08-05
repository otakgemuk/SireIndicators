# OFL Free - Quantower clean-room compatibility suite

> **Attribution notice:** The indicator is adopted from the free version of [https://orderflowlabs.com/](https://orderflowlabs.com/) OrderFlowLabs free indicators. This suite is an independent clean-room Quantower compatibility implementation and is not an official OrderFlowLabs product.

This project provides Quantower-native counterparts for the seven indicators exposed by the NinjaTrader OFLFree 2024.07.23.01 package:

- Sire OFL DDD
- Sire OFL Delta Towers
- Sire OFL Reconstructed Tape
- Sire OFL Single Prints
- Sire OFL Tape Reader
- Sire OFL MGI Weekly
- Sire OFL VWAP

## Important compatibility note

The supplied NinjaTrader archive contains generated registration glue plus an Agile.NET-protected DLL. Normal managed decompilation exposes the names, inputs, and plots, but its method bodies remain encrypted. These Quantower indicators are independent clean-room implementations based on the exposed interface and standard market-profile/order-flow definitions. They will not necessarily match the NinjaTrader package bar for bar.

## Data requirements

DDD, Delta Towers, Reconstructed Tape, and Tape Reader require Quantower Volume Analysis for true bid/ask delta. VWAP uses Volume Analysis volume when available and chart volume otherwise.

## Build and install

1. Create a Quantower Indicator class-library project targeting the framework used by the installed platform.
2. Add OFLFreeQuantower.cs.
3. Reference the installation's TradingPlatform.BusinessLayer.dll.
4. Build and copy the DLL to Settings/Scripts/Indicators/OFLFreeQuantower/.
5. Restart Quantower.

## Behavioral boundaries

- DDD uses diagonal ask-versus-lower-bid and bid-versus-upper-ask imbalance.
- Delta Towers plots bar delta percentage beyond static or rolling thresholds.
- Reconstructed Tape colors close-price points by delta direction and relative-volume Z-score.
- Single Prints is a 30-minute TPO bracket excess-zone approximation.
- Tape Reader smooths bar delta percentage.
- MGI Weekly provides weekly initial balance, extensions, current-week references, and prior-week HLC.
- VWAP provides session VWAP and three configurable weighted standard-deviation bands.

Educational software only. Not financial advice.
