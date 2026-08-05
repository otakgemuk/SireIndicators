using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using TradingPlatform.BusinessLayer;

namespace SireIndicators.Quantower.OFLFree
{
    internal static class OflMath
    {
        public static double Clamp(double value, double min, double max)
        { return value < min ? min : value > max ? max : value; }

        public static DateTime SessionDate(DateTime time, int hour, int minute)
        {
            var start = new TimeSpan(hour, minute, 0);
            return time.TimeOfDay >= start ? time.Date : time.Date.AddDays(-1);
        }

        public static DateTime WeekStart(DateTime time)
        {
            int days = ((int)time.DayOfWeek + 6) % 7;
            return time.Date.AddDays(-days);
        }
    }

    public sealed class SireDiagonalDeltaDivergence : Indicator
    {
        [InputParameter("Imbalance ratio", 10, 1.1, 20, 0.1, 1)] public double ImbalanceRatio = 3.0;
        [InputParameter("Minimum diagonal delta", 20, 0, 100000000, 10, 0)] public double MinimumDelta = 100;
        [InputParameter("Signal offset (ticks)", 30, 1, 20, 1, 0)] public int SignalOffsetTicks = 2;

        public SireDiagonalDeltaDivergence()
        {
            Name = "Sire OFL DDD";
            Description = "Clean-room diagonal bid/ask imbalance divergence signals.";
            SeparateWindow = false;
            AddLineSeries("DDD Buy", Color.LimeGreen, 3, LineStyle.Points);
            AddLineSeries("DDD Sell", Color.Red, 3, LineStyle.Points);
        }

        protected override void OnUpdate(UpdateArgs args)
        {
            SetValue(double.NaN, 0); SetValue(double.NaN, 1);
            var va = GetVolumeAnalysisData();
            if (va == null || va.PriceLevels == null || va.PriceLevels.Count < 2) return;
            var levels = va.PriceLevels.OrderBy(x => x.Key).ToArray();
            double buy = 0, sell = 0;
            for (int i = 1; i < levels.Length; i++)
            {
                double ask = levels[i].Value.BuyVolume, lowerBid = levels[i - 1].Value.SellVolume;
                if (ask - lowerBid >= MinimumDelta && ask >= Math.Max(1, lowerBid) * ImbalanceRatio)
                    buy += ask - lowerBid;
                double bid = levels[i - 1].Value.SellVolume, upperAsk = levels[i].Value.BuyVolume;
                if (bid - upperAsk >= MinimumDelta && bid >= Math.Max(1, upperAsk) * ImbalanceRatio)
                    sell += bid - upperAsk;
            }
            double tick = Symbol == null ? 0 : Symbol.TickSize;
            if (buy > sell && Close() >= Open())
            {
                SetValue(Low() - SignalOffsetTicks * tick, 0);
                LinesSeries[0].SetMarker(0, new IndicatorLineMarker(Color.LimeGreen, bottomIcon: IndicatorLineMarkerIconType.UpArrow));
            }
            if (sell > buy && Close() <= Open())
            {
                SetValue(High() + SignalOffsetTicks * tick, 1);
                LinesSeries[1].SetMarker(0, new IndicatorLineMarker(Color.Red, upperIcon: IndicatorLineMarkerIconType.DownArrow));
            }
        }
    }

    public sealed class SireDeltaTowers : Indicator
    {
        [InputParameter("Delta threshold (%)", 10, 0, 100, 1, 0)] public double DeltaThreshold = 20;
        [InputParameter("Use dynamic threshold", 20)] public bool UseDynamicThreshold = true;
        [InputParameter("Dynamic lookback", 30, 2, 500, 1, 0)] public int DynamicLookback = 20;
        private readonly Queue<double> history = new Queue<double>();
        private DateTime activeTime;
        private double candidateAbsPercent;

        public SireDeltaTowers()
        {
            Name = "Sire OFL Delta Towers";
            Description = "Clean-room positive and negative delta tower histogram.";
            SeparateWindow = true;
            AddLineSeries("Positive Tower", Color.LimeGreen, 3, LineStyle.Histogramm);
            AddLineSeries("Negative Tower", Color.Red, 3, LineStyle.Histogramm);
            AddLineSeries("Zero", Color.Gray, 1, LineStyle.Dot);
        }

        protected override void OnUpdate(UpdateArgs args)
        {
            if (activeTime != default(DateTime) && Time() != activeTime)
            {
                history.Enqueue(candidateAbsPercent);
                while (history.Count > DynamicLookback) history.Dequeue();
            }
            activeTime = Time();
            var va = GetVolumeAnalysisData();
            double volume = va != null && va.Total != null ? va.Total.Volume : 0;
            double delta = va != null && va.Total != null ? va.Total.Delta : 0;
            double percent = volume > 0 ? 100.0 * delta / volume : 0;
            candidateAbsPercent = Math.Abs(percent);
            double threshold = UseDynamicThreshold && history.Count > 1 ? Math.Max(DeltaThreshold, history.Average()) : DeltaThreshold;
            SetValue(percent >= threshold ? percent : 0, 0);
            SetValue(percent <= -threshold ? percent : 0, 1);
            SetValue(0, 2);
        }
    }

    public sealed class SireReconstructedTape : Indicator
    {
        [InputParameter("Lookback", 10, 5, 500, 1, 0)] public int Lookback = 50;
        [InputParameter("Large print Z-score", 20, 0.5, 10, 0.1, 1)] public double LargePrintZ = 2.0;
        private readonly Queue<double> volumes = new Queue<double>();
        private DateTime activeTime;
        private double candidateVolume;

        public SireReconstructedTape()
        {
            Name = "Sire OFL Reconstructed Tape";
            Description = "Clean-room delta-colored close-price tape with relative-volume classes.";
            SeparateWindow = false;
            AddLineSeries("Tape", Color.Gray, 3, LineStyle.Points);
        }

        protected override void OnUpdate(UpdateArgs args)
        {
            if (activeTime != default(DateTime) && Time() != activeTime)
            {
                volumes.Enqueue(candidateVolume);
                while (volumes.Count > Lookback) volumes.Dequeue();
            }
            activeTime = Time();
            var va = GetVolumeAnalysisData();
            candidateVolume = va != null && va.Total != null && va.Total.Volume > 0 ? va.Total.Volume : Volume();
            double delta = va != null && va.Total != null ? va.Total.Delta : Close() - Open();
            double mean = volumes.Count > 0 ? volumes.Average() : candidateVolume;
            double variance = volumes.Count > 1 ? volumes.Sum(x => (x - mean) * (x - mean)) / volumes.Count : 0;
            double z = variance > 0 ? (candidateVolume - mean) / Math.Sqrt(variance) : 0;
            Color color = delta >= 0
                ? (z >= LargePrintZ ? Color.Lime : z >= 1 ? Color.Green : Color.DarkSeaGreen)
                : (z >= LargePrintZ ? Color.Red : z >= 1 ? Color.OrangeRed : Color.IndianRed);
            SetValue(Close());
            LinesSeries[0].SetMarker(0, color);
        }
    }

    public sealed class SireSinglePrints : Indicator
    {
        [InputParameter("TPO period (minutes)", 10, 5, 120, 5, 0)] public int TpoMinutes = 30;
        private DateTime bucket;
        private double bucketHigh = double.NaN, bucketLow = double.NaN;
        private double previousHigh = double.NaN, previousLow = double.NaN;
        private double priorHigh = double.NaN, priorLow = double.NaN;
        private double zoneHigh = double.NaN, zoneLow = double.NaN;

        public SireSinglePrints()
        {
            Name = "Sire OFL Single Prints";
            Description = "Clean-room TPO bracket excess-zone approximation.";
            SeparateWindow = false;
            AddLineSeries("Single Print High", Color.OrangeRed, 2, LineStyle.StepLine);
            AddLineSeries("Single Print Low", Color.DodgerBlue, 2, LineStyle.StepLine);
        }

        protected override void OnUpdate(UpdateArgs args)
        {
            long periodTicks = TimeSpan.FromMinutes(TpoMinutes).Ticks;
            DateTime currentBucket = new DateTime(Time().Ticks - Time().Ticks % periodTicks);
            if (bucket != default(DateTime) && currentBucket != bucket)
            {
                if (!double.IsNaN(priorHigh))
                {
                    if (previousHigh > Math.Max(priorHigh, High()))
                    { zoneHigh = previousHigh; zoneLow = Math.Max(priorHigh, High()); }
                    else if (previousLow < Math.Min(priorLow, Low()))
                    { zoneHigh = Math.Min(priorLow, Low()); zoneLow = previousLow; }
                }
                priorHigh = previousHigh; priorLow = previousLow;
                previousHigh = bucketHigh; previousLow = bucketLow;
                bucketHigh = High(); bucketLow = Low();
            }
            else
            {
                bucketHigh = double.IsNaN(bucketHigh) ? High() : Math.Max(bucketHigh, High());
                bucketLow = double.IsNaN(bucketLow) ? Low() : Math.Min(bucketLow, Low());
            }
            bucket = currentBucket;
            SetValue(zoneHigh, 0); SetValue(zoneLow, 1);
        }
    }

    public sealed class SireTapeReader : Indicator
    {
        [InputParameter("Lookback", 10, 1, 500, 1, 0)] public int Lookback = 20;
        private readonly Queue<double> values = new Queue<double>();
        private DateTime activeTime;
        private double candidate;

        public SireTapeReader()
        {
            Name = "Sire OFL Tape Reader";
            Description = "Clean-room moving average of order-flow delta percentage.";
            SeparateWindow = true;
            AddLineSeries("Tape Average", Color.DodgerBlue, 2, LineStyle.Solid);
            AddLineSeries("Zero", Color.Gray, 1, LineStyle.Dot);
        }

        protected override void OnUpdate(UpdateArgs args)
        {
            if (activeTime != default(DateTime) && Time() != activeTime)
            {
                values.Enqueue(candidate);
                while (values.Count > Lookback) values.Dequeue();
            }
            activeTime = Time();
            var va = GetVolumeAnalysisData();
            double volume = va != null && va.Total != null ? va.Total.Volume : 0;
            double delta = va != null && va.Total != null ? va.Total.Delta : 0;
            candidate = volume > 0 ? 100.0 * delta / volume : 0;
            double average = (values.Sum() + candidate) / (values.Count + 1);
            SetValue(average, 0); SetValue(0, 1);
            LinesSeries[0].SetMarker(0, average >= 0 ? Color.LimeGreen : Color.Red);
        }
    }

    public sealed class SireMarketGuideWeekly : Indicator
    {
        [InputParameter("Weekly IB duration (minutes)", 10, 15, 1440, 15, 0)] public int WeeklyIbMinutes = 60;
        private DateTime week;
        private double open, high, low, ibHigh, ibLow;
        private double priorHigh = double.NaN, priorLow = double.NaN, priorClose = double.NaN;

        public SireMarketGuideWeekly()
        {
            Name = "Sire OFL MGI Weekly";
            Description = "Clean-room weekly initial balance, extensions, and prior-week references.";
            SeparateWindow = false;
            AddLineSeries("WIB High", Color.Gold, 2, LineStyle.StepLine);
            AddLineSeries("WIB Mid", Color.Goldenrod, 1, LineStyle.Dot);
            AddLineSeries("WIB Low", Color.Gold, 2, LineStyle.StepLine);
            AddLineSeries("WIB +100%", Color.DarkOrange, 1, LineStyle.Dot);
            AddLineSeries("WIB -100%", Color.DarkOrange, 1, LineStyle.Dot);
            AddLineSeries("Prior Week High", Color.MediumPurple, 1, LineStyle.StepLine);
            AddLineSeries("Prior Week Low", Color.MediumPurple, 1, LineStyle.StepLine);
            AddLineSeries("Prior Week Close", Color.Plum, 1, LineStyle.Dot);
            AddLineSeries("Week Open", Color.CornflowerBlue, 1, LineStyle.StepLine);
            AddLineSeries("Week Mid", Color.SteelBlue, 1, LineStyle.Dot);
        }

        protected override void OnUpdate(UpdateArgs args)
        {
            DateTime currentWeek = OflMath.WeekStart(Time());
            if (week != default(DateTime) && currentWeek != week)
            {
                priorHigh = high; priorLow = low; priorClose = Close(1);
                open = Open(); high = High(); low = Low(); ibHigh = High(); ibLow = Low();
            }
            else if (week == default(DateTime))
            { open = Open(); high = High(); low = Low(); ibHigh = High(); ibLow = Low(); }
            else
            {
                high = Math.Max(high, High()); low = Math.Min(low, Low());
                if (Time() < currentWeek.AddMinutes(WeeklyIbMinutes))
                { ibHigh = Math.Max(ibHigh, High()); ibLow = Math.Min(ibLow, Low()); }
            }
            week = currentWeek;
            double range = ibHigh - ibLow;
            SetValue(ibHigh, 0); SetValue((ibHigh + ibLow) / 2, 1); SetValue(ibLow, 2);
            SetValue(ibHigh + range, 3); SetValue(ibLow - range, 4);
            SetValue(priorHigh, 5); SetValue(priorLow, 6); SetValue(priorClose, 7);
            SetValue(open, 8); SetValue((high + low) / 2, 9);
        }
    }

    public sealed class SireOrderFlowVwap : Indicator
    {
        [InputParameter("Session start hour", 10, 0, 23, 1, 0)] public int StartHour = 9;
        [InputParameter("Session start minute", 20, 0, 59, 1, 0)] public int StartMinute = 30;
        [InputParameter("Band 1 multiplier", 30, 0, 10, 0.25, 2)] public double Band1 = 1;
        [InputParameter("Band 2 multiplier", 40, 0, 10, 0.25, 2)] public double Band2 = 2;
        [InputParameter("Band 3 multiplier", 50, 0, 10, 0.25, 2)] public double Band3 = 3;
        private DateTime activeTime, sessionDate;
        private double sumVolume, sumPriceVolume, sumPrice2Volume;
        private double cVolume, cPriceVolume, cPrice2Volume;

        public SireOrderFlowVwap()
        {
            Name = "Sire OFL VWAP";
            Description = "Clean-room session VWAP with weighted standard-deviation bands.";
            SeparateWindow = false;
            AddLineSeries("VWAP", Color.DodgerBlue, 2, LineStyle.Solid);
            AddLineSeries("+1 SD", Color.Gray, 1, LineStyle.Dot); AddLineSeries("-1 SD", Color.Gray, 1, LineStyle.Dot);
            AddLineSeries("+2 SD", Color.DarkGray, 1, LineStyle.Dot); AddLineSeries("-2 SD", Color.DarkGray, 1, LineStyle.Dot);
            AddLineSeries("+3 SD", Color.DimGray, 1, LineStyle.Dot); AddLineSeries("-3 SD", Color.DimGray, 1, LineStyle.Dot);
        }

        protected override void OnUpdate(UpdateArgs args)
        {
            DateTime barSession = OflMath.SessionDate(Time(), StartHour, StartMinute);
            if (activeTime != default(DateTime) && Time() != activeTime)
            { sumVolume = cVolume; sumPriceVolume = cPriceVolume; sumPrice2Volume = cPrice2Volume; }
            if (barSession != sessionDate)
            { sumVolume = sumPriceVolume = sumPrice2Volume = 0; sessionDate = barSession; }
            activeTime = Time();
            var va = GetVolumeAnalysisData();
            double volume = va != null && va.Total != null && va.Total.Volume > 0 ? va.Total.Volume : Volume();
            double price = (High() + Low() + Close()) / 3.0;
            cVolume = sumVolume + volume;
            cPriceVolume = sumPriceVolume + price * volume;
            cPrice2Volume = sumPrice2Volume + price * price * volume;
            double vwap = cVolume > 0 ? cPriceVolume / cVolume : price;
            double variance = cVolume > 0 ? Math.Max(0, cPrice2Volume / cVolume - vwap * vwap) : 0;
            double sd = Math.Sqrt(variance);
            SetValue(vwap, 0);
            SetValue(vwap + Band1 * sd, 1); SetValue(vwap - Band1 * sd, 2);
            SetValue(vwap + Band2 * sd, 3); SetValue(vwap - Band2 * sd, 4);
            SetValue(vwap + Band3 * sd, 5); SetValue(vwap - Band3 * sd, 6);
        }
    }
}
