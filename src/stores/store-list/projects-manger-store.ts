import { create } from "zustand";
import { createQuerySlice, QuerySlice } from "../base-list/query-module";
import { BaseSlice, createBaseSlice } from "../base-list/base-module";
import { MangerProjectItems } from "@/_types/research-projects-type";
import { ProjectManagerFilters, ProjectMangerSortField } from "@/constants/project-contant";


type ProjectMangerExtra = {
    removeItemById: (id: string) => void
}

export type ProjectMangerStore = BaseSlice<MangerProjectItems> & QuerySlice<ProjectManagerFilters, ProjectMangerSortField> & ProjectMangerExtra;

export const storeProjectManger = create<ProjectMangerStore>()(
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