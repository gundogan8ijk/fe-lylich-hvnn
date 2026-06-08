import { create } from "zustand";
import { LecturerListAccountResponse, LecturerAdminListQuery } from "./lecturer-admin-type";

interface LecturerAdminState {
    query: LecturerAdminListQuery;
    setQuery: (query: Partial<LecturerAdminListQuery>) => void;
    
    data: LecturerListAccountResponse | null;
    setData: (data: LecturerListAccountResponse | null) => void;
    
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    
    refreshTrigger: number;
    triggerRefresh: () => void;
}

export const useLecturerAdminStore = create<LecturerAdminState>((set) => ({
    query: {
        page: 1,
        perPage: 12,
        search: "",
        searchField: "All",
        sort: null,
        role: "All",
    },
    setQuery: (newQuery) => set((state) => ({ query: { ...state.query, ...newQuery } })),
    
    data: null,
    setData: (data) => set({ data }),
    
    isLoading: true,
    setLoading: (isLoading) => set({ isLoading }),
    
    refreshTrigger: 0,
    triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
