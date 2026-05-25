// department.store.ts
import { create } from "zustand";
import { Departments, DepartmentSearchField, DepartmentSearchOptions, DepartmentSortField } from "@/_types/department-type";
import { createQuerySlice, QuerySlice } from "../base-list/query-module";
import { BaseSlice, createBaseSlice } from "../base-list/base-module";
import { NoFilter } from "@/_types/base-type/query-types";


type DepartmentExtra = {
    searchField: DepartmentSearchField;
    setSearchField: (field: DepartmentSearchField) => void;
};

export type DepartmentStore = BaseSlice<Departments> & QuerySlice<NoFilter, DepartmentSortField> & DepartmentExtra;

export const storeDepartment = create<DepartmentStore>()(
    (set, get, api) => ({
        ...createBaseSlice<Departments>()(set, get, api),
        ...createQuerySlice<NoFilter, DepartmentSortField>()(set, get, api),

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