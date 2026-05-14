// department.store.ts
import { create } from "zustand";
import { Departments, DepartmentSortField, NoFilter } from "@/types/department-type";
import { createQuerySlice, QuerySlice } from "./base-list/query-module";
import { BaseSlice, createBaseSlice } from "./base-list/base-module";
import { createPagedSlice, PagedSlice } from "./base-list/paged-module";


type DepartmentExtra = {
    activeTab: string;

};

export type DepartmentStore =
    BaseSlice<Departments> & PagedSlice & QuerySlice<NoFilter, DepartmentSortField> &
    DepartmentExtra;

export const storeDepartment = create<DepartmentStore>()(
    (set, get, api) => ({
        ...createBaseSlice<Departments>()(set, get, api),
        ...createPagedSlice()(set, get, api),
        ...createQuerySlice<NoFilter, DepartmentSortField>()(set, get, api),

        activeTab: "all",

    })
);