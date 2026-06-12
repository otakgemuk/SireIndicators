import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IndicatorDashboard } from '@/types/indicators';

interface DashboardSettings {
  symbol: string;
  timeframe: string;
}

interface IndicatorStore {
  dashboard: IndicatorDashboard | null;
  settings: DashboardSettings;
  isLoading: boolean;
  error: string | null;
  setDashboard: (dashboard: IndicatorDashboard) => void;
  updateSettings: (settings: Partial<DashboardSettings>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useIndicatorStore = create<IndicatorStore>()(
  persist(
    (set) => ({
      dashboard: null,
      settings: {
        symbol: 'ES',
        timeframe: '5',
      },
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
