import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { LecturerItemAccountRecord } from "./lecturer-admin-type";
import { LecturerSearchField, LecturerSearchOptions, LecturerSortField } from "@/_constants/lecturer-constant";
import { NoFilter } from "@/_Common/_types/query-types";

type LecturerAdminExtra = {
    searchField: LecturerSearchField;
    setSearchField: (field: LecturerSearchField) => void;
    role: string | null;
    setRole: (role: string | null) => void;
    refreshTrigger: number;
    triggerRefresh: () => void;
};

export type LecturerAdminStore = BaseSlice<LecturerItemAccountRecord> & QuerySlice<NoFilter, LecturerSortField> & LecturerAdminExtra;

export const useLecturerAdminStore = create<LecturerAdminStore>()(
    (set, get, api) => ({
        ...createBaseSlice<LecturerItemAccountRecord>()(set, get, api),
        ...createQuerySlice<NoFilter, LecturerSortField>(1, 12)(set, get, api),

        searchField: LecturerSearchOptions[0].value,
        role: null,
        refreshTrigger: 0,

        setSearchField: (field) =>
            set((state) => ({
                searchField: field,
                query: {
                    ...state.query,
                    search: ""
                }
            })),
            
        setRole: (role) => set({ role }),
        triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
    })
);
