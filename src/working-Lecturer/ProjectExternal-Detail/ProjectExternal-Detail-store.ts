import { create } from "zustand";
import { ProjectExternalDetail } from "./ProjectExternal-Detail-type";
import { BaseStore, createBaseStore } from "@/_Common/_stores/base-store";

type ProjectExternalDetailExtra = {
    clear: () => void;
};

type ProjectExternalDetailStore = BaseStore<ProjectExternalDetail> & ProjectExternalDetailExtra;

export const storeProjectExternalDetail = create<ProjectExternalDetailStore>((set, get, api) => ({
    ...createBaseStore<ProjectExternalDetail>()(set, get, api),
    clear: () => set({}),
}));