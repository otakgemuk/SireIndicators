using System;
using System.Collections.Generic;
using System.Drawing;
using TradingPlatform.BusinessLayer;

namespace SireIndicators.Quantower
{
    public sealed class SireAdaptiveKalmanFilter : Indicator
    {
        [InputParameter("Persistence (Phi)", 10, 0.5, 0.999, 0.001, 3)] public double Phi = 0.95;
        [InputParameter("State Noise (Q)", 20, 0.000001, 100, 0.01, 4)] public double StateNoise = 0.05;
        [InputParameter("Measurement Noise (R)", 30, 0.000001, 100, 0.01, 4)] public double MeasurementNoise = 0.10;
        [InputParameter("Volatility Sensitivity", 40, 0, 10, 0.1, 2)] public double VolatilitySensitivity = 1.5;
        [InputParameter("ATR Length", 50, 1, 500, 1, 0)] public int AtrLength = 14;
        [InputParameter("Session start hour", 60, 0, 23, 1, 0)] public int SessionStartHour = 9;
        [InputParameter("Session start minute", 70, 0, 59, 1, 0)] public int SessionStartMinute = 30;
        [InputParameter("Session end hour", 80, 0, 23, 1, 0)] public int SessionEndHour = 16;
        [InputParameter("Session end minute", 90, 0, 59, 1, 0)] public int SessionEndMinute = 0;
        [InputParameter("Initial Balance minutes", 100, 1, 240, 1, 0)] public int InitialBalanceMinutes = 60;
        [InputParameter("CVD weight", 110, 0, 10, 0.05, 2)] public double CvdWeight = 0.55;
        [InputParameter("VWAP weight", 120, 0, 10, 0.05, 2)] public double VwapWeight = 0.20;
        [InputParameter("Initial Balance weight", 130, 0, 10, 0.05, 2)] public double IbWeight = 0.15;
        [InputParameter("Trend-day weight", 140, 0, 10, 0.05, 2)] public double TrendWeight = 0.10;
        [InputParameter("CVD normalization scale", 150, 0.1, 20, 0.1, 2)] public double CvdScale = 4.0;
        [InputParameter("Trend range / IB threshold", 160, 1, 5, 0.1, 2)] public double TrendRangeThreshold = 1.5;
        [InputParameter("Fallback to price proxy", 170)] public bool FallbackToPriceProxy = true;
        [InputParameter("Show dashboard", 180)] public bool ShowDashboard = true;

        private const int AtrAverageLength = 50;
        private readonly Queue<double> atrWindow = new Queue<double>();
        private DateTime activeTime, committedSessionDate, candidateSessionDate;
        private bool hasBar;
        private double state, covariance = 1, atr, atrSum;
        private int atrSamples;
        private double candidateState, candidateCovariance = 1, candidateAtr;
        private double sVol, sDelta, sPv, sHigh = double.NaN, sLow = double.NaN, ibHigh = double.NaN, ibLow = double.NaN;
        private double cVol, cDelta, cPv, cHigh = double.NaN, cLow = double.NaN, cIbHigh = double.NaN, cIbLow = double.NaN;
        private double kalman, histogram, volatilityRatio = 1, gain, vwap = double.NaN;
        private double cvdScore, vwapScore, ibScore, trendScore, measurement;
        private bool hasOrderFlow, inSession, ibComplete;

        public override string ShortName { get { return "SAKF Pro"; } }

        public SireAdaptiveKalmanFilter()
        {
            Name = "Sire Adaptive Kalman Filter Pro";
            Description = "Kalman order-flow pressure using CVD, VWAP, Initial Balance, and trend-day context.";
            SeparateWindow = true;
            AddLineSeries("Adaptive Kalman Signal", Color.LimeGreen, 3, LineStyle.Solid);
            AddLineSeries("Momentum Acceleration", Color.Green, 2, LineStyle.Histogramm);
            AddLineSeries("Zero Bias", Color.Gray, 1, LineStyle.Dot);
        }

        protected override void OnInit() { Reset(); }
        protected override void OnClear() { Reset(); base.OnClear(); }

        protected override void OnUpdate(UpdateArgs args)
        {
            if (Count < 2) { SetValue(0, 0); SetValue(0, 1); SetValue(0, 2); return; }
            DateTime t = Time(0);
            if (!hasBar || t != activeTime)
            {
                if (hasBar) Commit();
                activeTime = t;
                hasBar = true;
            }

            double prevClose = Close(1);
            double tr = Math.Max(High() - Low(), Math.Max(Math.Abs(High() - prevClose), Math.Abs(Low() - prevClose)));
            candidateAtr = atrSamples < AtrLength ? (atr * atrSamples + tr) / (atrSamples + 1.0)
                : (atr * (AtrLength - 1.0) + tr) / AtrLength;
            double avgAtr = PreviewAverageAtr(candidateAtr);
            volatilityRatio = avgAtr > 0 ? candidateAtr / avgAtr : 1;
            double adaptiveR = MeasurementNoise * Math.Pow(volatilityRatio, VolatilitySensitivity);

            BuildContext(t);
            if (hasOrderFlow && inSession) measurement = Composite();
            else if (FallbackToPriceProxy) measurement = candidateAtr > 0 ? (Close() - prevClose) / candidateAtr : 0;
            else measurement = 0;

            double predictedState = Phi * state;
            double predictedVariance = covariance + StateNoise;
            gain = predictedVariance / (predictedVariance + adaptiveR);
            candidateState = predictedState + gain * (measurement - predictedState);
            candidateCovariance = (1 - gain) * predictedVariance;
            kalman = candidateState * 100;
            double previous = Count > 2 ? GetValue(1, 0) : 0;
            histogram = kalman - previous;

            SetValue(kalman, 0); SetValue(histogram, 1); SetValue(0, 2);
            LinesSeries[0].SetMarker(0, kalman >= 0 ? Color.LimeGreen : Color.Red);
            LinesSeries[1].SetMarker(0, histogram >= 0 ? Color.Green : Color.Red);
            if (previous <= 0 && kalman > 0)
                LinesSeries[0].SetMarker(0, new IndicatorLineMarker(Color.LimeGreen, bottomIcon: IndicatorLineMarkerIconType.UpArrow));
            else if (previous >= 0 && kalman < 0)
                LinesSeries[0].SetMarker(0, new IndicatorLineMarker(Color.Red, upperIcon: IndicatorLineMarkerIconType.DownArrow));
        }

        private void BuildContext(DateTime t)
        {
            TimeSpan start = new TimeSpan(SessionStartHour, SessionStartMinute, 0);
            TimeSpan end = new TimeSpan(SessionEndHour, SessionEndMinute, 0);
            TimeSpan tod = t.TimeOfDay;
            inSession = end > start ? tod >= start && tod < end : tod >= start || tod < end;
            candidateSessionDate = tod >= start ? t.Date : t.Date.AddDays(-1);
            bool newSession = candidateSessionDate != committedSessionDate;
            double bv = newSession ? 0 : sVol, bd = newSession ? 0 : sDelta, bpv = newSession ? 0 : sPv;
            double bh = newSession ? double.NaN : sHigh, bl = newSession ? double.NaN : sLow;
            double bih = newSession ? double.NaN : ibHigh, bil = newSession ? double.NaN : ibLow;
            cVol = bv; cDelta = bd; cPv = bpv; cHigh = bh; cLow = bl; cIbHigh = bih; cIbLow = bil;
            hasOrderFlow = false;
            if (!inSession)
            {
                vwap = bv > 0 ? bpv / bv : double.NaN;
                cvdScore = vwapScore = ibScore = trendScore = 0;
                ibComplete = false;
                return;
            }

            double volume = Math.Max(0, Volume());
            double delta = 0;
            VolumeAnalysisData va = GetVolumeAnalysisData(0);
            if (va != null && va.Total != null && va.Total.Volume > 0)
            {
                volume = va.Total.Volume;
                delta = va.Total.Delta;
                hasOrderFlow = true;
            }

            double typical = (High() + Low() + Close()) / 3.0;
            cVol = bv + volume; cDelta = bd + delta; cPv = bpv + typical * volume;
            cHigh = double.IsNaN(bh) ? High() : Math.Max(bh, High());
            cLow = double.IsNaN(bl) ? Low() : Math.Min(bl, Low());
            vwap = cVol > 0 ? cPv / cVol : double.NaN;

            DateTime ibEnd = candidateSessionDate.Add(start).AddMinutes(InitialBalanceMinutes);
            ibComplete = t >= ibEnd;
            if (!ibComplete)
            {
                cIbHigh = double.IsNaN(bih) ? High() : Math.Max(bih, High());
                cIbLow = double.IsNaN(bil) ? Low() : Math.Min(bil, Low());
            }

            cvdScore = cVol > 0 ? Clamp(cDelta / cVol * CvdScale) : 0;
            vwapScore = !double.IsNaN(vwap) && candidateAtr > 0 ? Clamp((Close() - vwap) / candidateAtr) : 0;
            ibScore = GetIbScore();
            trendScore = GetTrendScore();
        }

        private double GetIbScore()
        {
            if (!ibComplete || double.IsNaN(cIbHigh) || double.IsNaN(cIbLow)) return 0;
            if (Close() > cIbHigh) return 1;
            if (Close() < cIbLow) return -1;
            double half = (cIbHigh - cIbLow) / 2.0;
            return half > 0 ? Clamp((Close() - (cIbHigh + cIbLow) / 2.0) / half) : 0;
        }

        private double GetTrendScore()
        {
            if (!ibComplete || double.IsNaN(cIbHigh) || double.IsNaN(cIbLow) || double.IsNaN(vwap)) return 0;
            double ibRange = cIbHigh - cIbLow;
            if (ibRange <= 0 || cHigh - cLow < ibRange * TrendRangeThreshold) return 0;
            if (Close() > cIbHigh && Close() > vwap && cDelta > 0) return 1;
            if (Close() < cIbLow && Close() < vwap && cDelta < 0) return -1;
            return 0;
        }

        private double Composite()
        {
            double w = CvdWeight + VwapWeight + IbWeight + TrendWeight;
            return w > 0 ? (cvdScore * CvdWeight + vwapScore * VwapWeight + ibScore * IbWeight + trendScore * TrendWeight) / w : cvdScore;
        }

        private void Commit()
        {
            state = candidateState; covariance = candidateCovariance; atr = candidateAtr; atrSamples++;
            atrWindow.Enqueue(candidateAtr); atrSum += candidateAtr;
            if (atrWindow.Count > AtrAverageLength) atrSum -= atrWindow.Dequeue();
            committedSessionDate = candidateSessionDate;
            sVol = cVol; sDelta = cDelta; sPv = cPv; sHigh = cHigh; sLow = cLow; ibHigh = cIbHigh; ibLow = cIbLow;
        }

        private double PreviewAverageAtr(double value)
        {
            double sum = atrSum + value; int count = atrWindow.Count + 1;
            if (count > AtrAverageLength) { sum -= atrWindow.Peek(); count--; }
            return count > 0 ? sum / count : value;
        }

        public override void OnPaintChart(PaintChartEventArgs args)
        {
            base.OnPaintChart(args);
            if (!ShowDashboard || !hasBar) return;
            Graphics g = args.Graphics; Rectangle a = args.Rectangle;
            int x = Math.Max(a.Left + 8, a.Right - 340), y = a.Top + 12;
            using (var bg = new SolidBrush(Color.FromArgb(220, 24, 27, 32)))
            using (var border = new Pen(Color.FromArgb(130, 150, 160, 175)))
            using (var title = new Font("Segoe UI", 10, FontStyle.Bold))
            using (var font = new Font("Segoe UI", 9))
            using (var labels = new SolidBrush(Color.LightGray))
            using (var values = new SolidBrush(kalman >= 0 ? Color.LimeGreen : Color.OrangeRed))
            {
                g.FillRectangle(bg, x, y, 328, 226); g.DrawRectangle(border, x, y, 328, 226);
                g.DrawString("SIRE ADAPTIVE KALMAN FILTER PRO", title, Brushes.White, x + 10, y + 8);
                Row(g, font, labels, values, x, y + 34, "Bias", kalman > 0 ? "BUYING PRESSURE" : "SELLING PRESSURE");
                Row(g, font, labels, values, x, y + 56, "Momentum", histogram > 0 ? "ACCELERATING" : "WEAKENING");
                Row(g, font, labels, values, x, y + 78, "CVD", Score(cvdScore));
                Row(g, font, labels, values, x, y + 100, "VWAP", double.IsNaN(vwap) ? "N/A" : Close() > vwap ? "ABOVE" : "BELOW");
                Row(g, font, labels, values, x, y + 122, "Initial Balance", !ibComplete ? "FORMING" : Close() > cIbHigh ? "ABOVE IB" : Close() < cIbLow ? "BELOW IB" : "INSIDE IB");
                Row(g, font, labels, values, x, y + 144, "Day Type", trendScore > 0 ? "BULL TREND DAY" : trendScore < 0 ? "BEAR TREND DAY" : "BALANCED / UNCONFIRMED");
                Row(g, font, labels, values, x, y + 166, "Volatility", volatilityRatio > 1.5 ? "HIGH - FILTERING" : volatilityRatio < 0.7 ? "LOW - RESPONSIVE" : "NORMAL");
                Row(g, font, labels, values, x, y + 188, "Kalman Gain", gain.ToString("0.00"));
                Row(g, font, labels, values, x, y + 210, "Data", hasOrderFlow ? "ORDER FLOW" : "PRICE FALLBACK");
            }
        }

        private static void Row(Graphics g, Font f, Brush lb, Brush vb, int x, int y, string label, string value)
        { g.DrawString(label + ":", f, lb, x + 10, y); g.DrawString(value, f, vb, x + 122, y); }
        private static string Score(double v) { return v > 0.15 ? "POSITIVE" : v < -0.15 ? "NEGATIVE" : "NEUTRAL"; }
        private static double Clamp(double v) { return v < -1 ? -1 : v > 1 ? 1 : v; }

        private void Reset()
        {
            atrWindow.Clear(); activeTime = committedSessionDate = candidateSessionDate = default(DateTime); hasBar = false;
            state = candidateState = 0; covariance = candidateCovariance = 1; atr = candidateAtr = atrSum = 0; atrSamples = 0;
            sVol = sDelta = sPv = cVol = cDelta = cPv = 0;
            sHigh = sLow = ibHigh = ibLow = cHigh = cLow = cIbHigh = cIbLow = vwap = double.NaN;
            kalman = histogram = gain = measurement = cvdScore = vwapScore = ibScore = trendScore = 0;
            volatilityRatio = 1; hasOrderFlow = inSession = ibComplete = false;
        }
    }
}
