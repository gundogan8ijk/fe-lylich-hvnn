import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { LecturerSearchField, LecturerSearchOptions, LecturerSortField } from "@/_constants/lecturer-constant";
import { LecturerPublicItem } from "./lecturer-public-type";
import { NoFilter } from "@/_Common/_types/query-types";

type LecturerPublicExtra = {
    searchField: LecturerSearchField;
    setSearchField: (field: LecturerSearchField) => void;
};

export type LecturerListPublicStore = BaseSlice<LecturerPublicItem> & QuerySlice<NoFilter, LecturerSortField> & LecturerPublicExtra;

export const storeLecturerListPublic = create<LecturerListPublicStore>()(
    (set, get, api) => ({
        ...createBaseSlice<LecturerPublicItem>()(set, get, api),
        ...createQuerySlice<NoFilter, LecturerSortField>(1, 8)(set, get, api),

        searchField: LecturerSearchOptions[0].value,

        setSearchField: (field) =>
            set((state) => ({
                searchField: field,
                query: {
                    ...state.query,
                    search: ""
                }
            })),
    })
);
