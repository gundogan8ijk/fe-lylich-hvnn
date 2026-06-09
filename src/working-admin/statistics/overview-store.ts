import { create } from "zustand";
import { OverviewStatsDto } from "./statistics-admin-type";

interface OverviewStatsState {
  data: OverviewStatsDto | null;
  loading: boolean;
  selectedYear?: number;
  selectedMonth?: number;

  setData: (data: OverviewStatsDto | null) => void;
  setLoading: (v: boolean) => void;
  setSelectedYear: (year?: number) => void;
  setSelectedMonth: (month?: number) => void;
}

export const useOverviewStore = create<OverviewStatsState>()((set) => ({
  data: null,
  loading: false,
  selectedYear: undefined,
  selectedMonth: undefined,

  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setSelectedYear: (selectedYear) => set({ selectedYear }),
  setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
}));
