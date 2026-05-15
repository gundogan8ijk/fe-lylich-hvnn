// department.store.ts
import { create } from "zustand";
import { Departments, DepartmentSearchFieldOptions, DepartmentSortField, SearchType } from "@/types/department-type";
import { createQuerySlice, QuerySlice } from "./base-list/query-module";
import { BaseSlice, createBaseSlice } from "./base-list/base-module";
import { createSearchFieldSlice, SearchFieldSlice } from "./base-list/searchOption-module";
import { NoFilter } from "@/types/query-types";


type DepartmentExtra = {
    activeTab: string;

};

export type DepartmentStore = BaseSlice<Departments> &  QuerySlice<NoFilter, DepartmentSortField> &
    SearchFieldSlice<SearchType> & DepartmentExtra;

export const storeDepartment = create<DepartmentStore>()(
    (set, get, api) => ({
        ...createBaseSlice<Departments>()(set, get, api),
        ...createQuerySlice<NoFilter, DepartmentSortField>()(set, get, api),
        ...createSearchFieldSlice<SearchType>(DepartmentSearchFieldOptions, DepartmentSearchFieldOptions[0].value)(set, get, api),

        activeTab: "all",

    })
);