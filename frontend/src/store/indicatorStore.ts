import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IndicatorDashboard, DashboardSettings } from '@/types/indicators';

const DEFAULT_SETTINGS: DashboardSettings = {
  orb: {
    contracts: 10,
    tickValue: 12.5,
    orTimePeriod: 30,
    targetPercent: 50,
    volumeGate: 1.2,
    suppressTradingRangeDays: true,
    suppressLunch: false,
  },
  raschke: {
    fastEMA: 9,
    midEMA: 20,
    slowEMA: 50,
    minBullScore: 8,
    minBearScore: 8,
    volumeMultiplier: 1.2,
    multiTimeframeEnabled: false,
  },
  symbol: 'ES',
  timeframe: '5',
  theme: 'dark',
  alertsEnabled: true,
  soundEnabled: false,
};

interface IndicatorStore {
  dashboard: IndicatorDashboard | null;
  settings: DashboardSettings;
  isLoading: boolean;
  error: string | null;
  setDashboard: (dashboard: IndicatorDashboard) => void;
  updateSettings: (settings: Partial<DashboardSettings>) => void;
  resetSettings: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useIndicatorStore = create<IndicatorStore>()(
  persist(
    (set) => ({
      dashboard: null,
      settings: DEFAULT_SETTINGS,
      isLoading: false,
      error: null,
      setDashboard: (dashboard) => {
        set({ dashboard, error: null });
      },
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
      resetSettings: () => {
        set({ settings: DEFAULT_SETTINGS });
      },
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
      setError: (error) => {
        set({ error });
      },
    }),
    {
      name: 'sire-indicators-store',
    }
  )
);
