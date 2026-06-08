// department.store.ts
import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { DepartmentSearchField, DepartmentSearchOptions, DepartmentSortField } from "@/_constants/department-constant";
import { DepartmentPublicItems } from "./department-manger-type";
import { NoFilter } from "@/_Common/_types/query-types";


type DepartmentExtra = {
    searchField: DepartmentSearchField;
    setSearchField: (field: DepartmentSearchField) => void;
};

export type DepartmentListPublicStore = BaseSlice<DepartmentPublicItems> & QuerySlice<NoFilter, DepartmentSortField> & DepartmentExtra;

export const storeDepartmentListPublic = create<DepartmentListPublicStore>()(
    (set, get, api) => ({
        ...createBaseSlice<DepartmentPublicItems>()(set, get, api),
        ...createQuerySlice<NoFilter, DepartmentSortField>(1, 12)(set, get, api),
        query: {
            ...createQuerySlice<NoFilter, DepartmentSortField>(1, 12)(set, get, api).query,
            perPage: 12
        },
        searchField: DepartmentSearchOptions[0].value,


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