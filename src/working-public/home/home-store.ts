import { create } from "zustand";
import { PublicActivityItem, PublicAwardItem } from "./home-type";
import { defaultPagination, Pagination } from "@/_Common/_types/pagination-typeConfig";

// ── Activities Store ──────────────────────────────────────

type ActivitiesState = {
    activities: PublicActivityItem[];
    pagination: Pagination;
    loading: boolean;
    page: number;
    pageSize: number;
    searchQuery: string;
    typeFilter: string;

    setActivities: (items: PublicActivityItem[]) => void;
    setPagination: (p: Pagination) => void;
    setLoading: (v: boolean) => void;
    setPage: (page: number) => void;
    setSearchQuery: (q: string) => void;
    setTypeFilter: (t: string) => void;
};

export const storePublicActivities = create<ActivitiesState>((set) => ({
    activities: [],
    pagination: defaultPagination,
    loading: false,
    page: 1,
    pageSize: 10,
    searchQuery: "",
    typeFilter: "",

    setActivities: (items) => set({ activities: items }),
    setPagination: (p) => set({ pagination: p }),
    setLoading: (v) => set({ loading: v }),
    setPage: (page) => set({ page }),
    setSearchQuery: (q) => set({ searchQuery: q, page: 1 }),
    setTypeFilter: (t) => set({ typeFilter: t, page: 1 }),
}));

// ── Awards Store (Page-based) ─────────────────────────────

type AwardsState = {
    awards: PublicAwardItem[];
    pagination: Pagination;
    loading: boolean;
    page: number;
    pageSize: number;

    setAwards: (items: PublicAwardItem[]) => void;
    setPagination: (p: Pagination) => void;
    setLoading: (v: boolean) => void;
    setPage: (page: number) => void;
};

export const storePublicAwards = create<AwardsState>((set) => ({
    awards: [],
    pagination: defaultPagination,
    loading: false,
    page: 1,
    pageSize: 10,

    setAwards: (items) => set({ awards: items }),
    setPagination: (p) => set({ pagination: p }),
    setLoading: (v) => set({ loading: v }),
    setPage: (page) => set({ page }),
}));
