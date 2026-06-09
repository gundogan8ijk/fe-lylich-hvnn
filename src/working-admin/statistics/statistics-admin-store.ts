import { create } from "zustand";
import { OverviewStatsDto, LecturerChartsResponse, ChartDataDto } from "./statistics-admin-type";

interface StatisticsAdminState {
  overviewData: OverviewStatsDto | null;
  lecturerChartsData: LecturerChartsResponse | null;
  researchChartsData: ChartDataDto[] | null;

  loadingOverview: boolean;
  loadingLecturerCharts: boolean;
  loadingResearchCharts: boolean;

  selectedYear?: number;
  selectedMonth?: number;

  setOverviewData: (data: OverviewStatsDto | null) => void;
  setLecturerChartsData: (data: LecturerChartsResponse | null) => void;
  setResearchChartsData: (data: ChartDataDto[] | null) => void;

  setLoadingOverview: (loading: boolean) => void;
  setLoadingLecturerCharts: (loading: boolean) => void;
  setLoadingResearchCharts: (loading: boolean) => void;

  setSelectedYear: (year?: number) => void;
  setSelectedMonth: (month?: number) => void;
}

export const useStatisticsAdminStore = create<StatisticsAdminState>()((set) => ({
  overviewData: null,
  lecturerChartsData: null,
  researchChartsData: null,

  loadingOverview: false,
  loadingLecturerCharts: false,
  loadingResearchCharts: false,

  selectedYear: undefined,
  selectedMonth: undefined,

  setOverviewData: (overviewData) => set({ overviewData }),
  setLecturerChartsData: (lecturerChartsData) => set({ lecturerChartsData }),
  setResearchChartsData: (researchChartsData) => set({ researchChartsData }),

  setLoadingOverview: (loadingOverview) => set({ loadingOverview }),
  setLoadingLecturerCharts: (loadingLecturerCharts) => set({ loadingLecturerCharts }),
  setLoadingResearchCharts: (loadingResearchCharts) => set({ loadingResearchCharts }),

  setSelectedYear: (selectedYear) => set({ selectedYear }),
  setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
}));
