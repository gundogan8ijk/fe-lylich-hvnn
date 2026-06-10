import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { ArticlePublicItem } from "./article-public-type";
import { NoFilter } from "@/_Common/_types/query-types";

export type ArticleListPublicStore = BaseSlice<ArticlePublicItem> & QuerySlice<NoFilter, string>;

export const storeArticleListPublic = create<ArticleListPublicStore>()(
    (set, get, api) => ({
        ...createBaseSlice<ArticlePublicItem>()(set, get, api),
        ...createQuerySlice<NoFilter, string>(1, 8)(set, get, api),
    })
);
