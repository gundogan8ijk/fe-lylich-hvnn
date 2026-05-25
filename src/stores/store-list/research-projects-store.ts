import { ResearchProjectItems } from "@/_types/research-projects-type";
import { BaseSlice, createBaseSlice } from "../base-list/base-module";
import { create } from "zustand";

type ResearchProjectListMeExtra = {
    clear: () => void;
};

export type ResearchProjectListMeStore = BaseSlice<ResearchProjectItems> & ResearchProjectListMeExtra;

export const storeResearchProjectListMe =
    create<ResearchProjectListMeStore>()(
        (set, get, api) => ({
            ...createBaseSlice<ResearchProjectItems>()(set, get, api),

            clear: () => {
                set({
                    data: []
                });
            }
        })
    );