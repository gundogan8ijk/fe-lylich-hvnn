import { create } from "zustand";
import { Departments } from "@/types/department-type";
import { defaultPagination, Pagination } from "@/types/result-typeConfig";

interface DepartmentStore {
    loading: boolean;
    departmentAll: Departments[];
    pagination: Pagination;

    setLoading: (value: boolean) => void;
    setDepartmentAll: (value: Departments[]) => void;
    setPagination: (value: Pagination) => void;
};

const storeDepartment = create<DepartmentStore>((set) => ({
    loading: false,
    departmentAll: [],
    pagination: defaultPagination,

    setLoading: (value) => set({ loading: value }),

    setDepartmentAll: (value) => set({ departmentAll: value }),

    setPagination: (value) => set({ pagination: value }),
}));

export default storeDepartment;