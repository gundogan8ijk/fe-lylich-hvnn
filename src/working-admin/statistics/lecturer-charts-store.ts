import { create } from "zustand";
import { LecturerChartsResponse } from "./statistics-admin-type";

interface LecturerChartsState {
  data: LecturerChartsResponse | null;
  loading: boolean;
  selectedYear?: number;
  selectedMonth?: number;
  selectedDepartmentId?: string;

  setData: (data: LecturerChartsResponse | null) => void;
  setLoading: (v: boolean) => void;
  setSelectedYear: (year?: number) => void;
  setSelectedMonth: (month?: number) => void;
  setSelectedDepartmentId: (departmentId?: string) => void;
}

export const useLecturerChartsStore = create<LecturerChartsState>()((set) => ({
  data: null,
  loading: false,
  selectedYear: undefined,
  selectedMonth: undefined,
  selectedDepartmentId: undefined,

  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setSelectedYear: (selectedYear) => set({ selectedYear }),
  setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
  setSelectedDepartmentId: (selectedDepartmentId) => set({ selectedDepartmentId }),
}));
