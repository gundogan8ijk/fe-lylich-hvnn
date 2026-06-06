import { BaseSlice, createBaseSlice } from "../_Common/_stores/base-list/base-module";
import { create } from "zustand";
import { ProjectItem } from "./Project-List-type";

type ProjectListExtra = {
    clear: () => void;
};

export type ProjectListStore = BaseSlice<ProjectItem> & ProjectListExtra;

export const storeProjectList = create<ProjectListStore>()(
    (set, get, api) => ({
        ...createBaseSlice<ProjectItem>()(set, get, api),
        clear: () => set({ data: [] }),
    })
);
