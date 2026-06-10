import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { ProjectExternalPublicItem } from "./project-external-public-type";
import { NoFilter } from "@/_Common/_types/query-types";

export type ProjectExternalListPublicStore = BaseSlice<ProjectExternalPublicItem> & QuerySlice<NoFilter, string>;

export const storeProjectExternalListPublic = create<ProjectExternalListPublicStore>()(
    (set, get, api) => ({
        ...createBaseSlice<ProjectExternalPublicItem>()(set, get, api),
        ...createQuerySlice<NoFilter, string>(1, 8)(set, get, api),
    })
);
