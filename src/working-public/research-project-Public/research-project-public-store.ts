import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { ResearchProjectPublicItem } from "./research-project-public-type";
import { NoFilter } from "@/_Common/_types/query-types";

export type ResearchProjectListPublicStore = BaseSlice<ResearchProjectPublicItem> & QuerySlice<NoFilter, string>;

export const storeResearchProjectListPublic = create<ResearchProjectListPublicStore>()(
    (set, get, api) => ({
        ...createBaseSlice<ResearchProjectPublicItem>()(set, get, api),
        ...createQuerySlice<NoFilter, string>(1, 8)(set, get, api),
    })
);
