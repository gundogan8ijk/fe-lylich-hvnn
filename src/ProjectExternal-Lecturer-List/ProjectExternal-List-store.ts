import { BaseSlice, createBaseSlice } from "../_Common/_stores/base-list/base-module";
import { create } from "zustand";
import { ProjectExternalItem } from "./ProjectExternal-List-type";

type ProjectExternalListExtra = {
    clear: () => void;
};

export type ProjectExternalListStore = BaseSlice<ProjectExternalItem> & ProjectExternalListExtra;

export const storeProjectExternalList = create<ProjectExternalListStore>()(
    (set, get, api) => ({
        ...createBaseSlice<ProjectExternalItem>()(set, get, api),
        clear: () => set({ data: [] }),
    })
);