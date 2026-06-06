import { create } from "zustand";
import { ProjectDetail } from "./Project-Detail-type";
import { BaseStore, createBaseStore } from "@/_Common/_stores/base-store";

type ProjectDetailExtra = {
    clear: () => void;
};

type ProjectDetailStore = BaseStore<ProjectDetail> & ProjectDetailExtra;

export const storeProjectDetail = create<ProjectDetailStore>((set, get, api) => ({
    ...createBaseStore<ProjectDetail>()(set, get, api),
    clear: () => set({}),
}));
