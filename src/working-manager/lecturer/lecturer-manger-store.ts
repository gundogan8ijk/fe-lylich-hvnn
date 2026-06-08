import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { LecturerSearchField, LecturerSearchOptions, LecturerSortField } from "@/_constants/lecturer-constant";
import { LecturerItemByMangerDto } from "./lecturer-manger-type";
import { NoFilter } from "@/_Common/_types/query-types";

type LecturerExtra = {
    searchField: LecturerSearchField;
    setSearchField: (field: LecturerSearchField) => void;
    isAddDialogOpen: boolean;
    setAddDialogOpen: (isOpen: boolean) => void;
};

export type LecturerListMangerStore = BaseSlice<LecturerItemByMangerDto> & QuerySlice<NoFilter, LecturerSortField> & LecturerExtra;

export const storeLecturerListManger = create<LecturerListMangerStore>()(
    (set, get, api) => ({
        ...createBaseSlice<LecturerItemByMangerDto>()(set, get, api),
        ...createQuerySlice<NoFilter, LecturerSortField>()(set, get, api),

        searchField: LecturerSearchOptions[0].value,
        isAddDialogOpen: false,

        setSearchField: (field) =>
            set((state) => ({
                searchField: field,
                query: {
                    ...state.query,
                    search: ""
                }
            })),
            
        setAddDialogOpen: (isOpen) => set({ isAddDialogOpen: isOpen }),
    })
);
