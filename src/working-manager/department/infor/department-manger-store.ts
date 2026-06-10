// department.store.ts
import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { DepartmentSearchField, DepartmentSearchOptions, DepartmentSortField } from "@/_constants/department-constant";
import { DepartmentMangerItems } from "./department-manger-type";
import { NoFilter } from "@/_Common/_types/query-types";


type DepartmentExtra = {
    searchField: DepartmentSearchField;
    setSearchField: (field: DepartmentSearchField) => void;
};

export type DepartmentListMangerStore = BaseSlice<DepartmentMangerItems> & QuerySlice<NoFilter, DepartmentSortField> & DepartmentExtra;

export const storeDepartmentListManger = create<DepartmentListMangerStore>()(
    (set, get, api) => ({
        ...createBaseSlice<DepartmentMangerItems>()(set, get, api),
        ...createQuerySlice<NoFilter, DepartmentSortField>(1, 10)(set, get, api),

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