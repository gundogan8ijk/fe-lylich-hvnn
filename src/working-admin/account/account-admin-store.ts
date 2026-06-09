import { create } from "zustand";
import { AccountItemDto, AccountListQuery } from "./account-admin-type";
import { createQuerySlice, QuerySlice } from "@/_Common/_stores/base-list/query-module";
import { NoFilter } from "@/_Common/_types/query-types";

export type AccountSearchField = "all";

interface AccountAdminState extends QuerySlice<NoFilter, "email"> {
    data: AccountItemDto[];
    loading: boolean;
    role: string | null;
    refreshTrigger: number;
    searchField: AccountSearchField;

    setData: (data: AccountItemDto[]) => void;
    setLoading: (loading: boolean) => void;
    setRole: (role: string | null) => void;
    setSearchField: (field: AccountSearchField) => void;
    triggerRefresh: () => void;
}

export const useAccountAdminStore = create<AccountAdminState>()((set, get, api) => ({
    ...createQuerySlice<NoFilter, "email">()(set, get, api),
    data: [],
    loading: true,
    role: null,
    refreshTrigger: 0,
    searchField: "all",

    setData: (data) => set({ data }),
    setLoading: (loading) => set({ loading }),
    setRole: (role) => set({ role, query: { ...get().query, page: 1 } }),
    setSearchField: (searchField) => set({ searchField, query: { ...get().query, page: 1 } }),
    triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
