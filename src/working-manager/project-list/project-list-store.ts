import { create } from "zustand";
import { ProjectManagerFilters, ProjectMangerSortField } from "@/_constants/project-constant";
import { createQuerySlice, QuerySlice } from "@/_Common/_stores/base-list/query-module";
import { MangerProjectItems } from "./project-list-type";
import { BaseSlice, createBaseSlice } from "@/_Common/_stores/base-list/base-module";

type ProjectMangerExtra = {
    removeItemById: (id: string) => void
}

export type ProjectMangerStore = BaseSlice<MangerProjectItems> & QuerySlice<ProjectManagerFilters, ProjectMangerSortField> & ProjectMangerExtra;

export const storeProjectMangerList = create<ProjectMangerStore>()(
    (set, get, api) => ({
        ...createBaseSlice<MangerProjectItems>()(set, get, api),
        ...createQuerySlice<ProjectManagerFilters, ProjectMangerSortField>()(set, get, api),

        removeItemById: (id: string) => {
        set((state) => ({
            ...state,
            data: state.data.filter(x => x.id !== id),
            totalCount: state.totalCount - 1
        }));
    }
    })
);