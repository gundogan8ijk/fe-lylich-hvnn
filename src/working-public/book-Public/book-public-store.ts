import { create } from "zustand";
import { createQuerySlice, QuerySlice } from '@/_Common/_stores/base-list/query-module';
import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { BookPublicItem } from "./book-public-type";
import { NoFilter } from "@/_Common/_types/query-types";

export type BookListPublicStore = BaseSlice<BookPublicItem> & QuerySlice<NoFilter, string>;

export const storeBookListPublic = create<BookListPublicStore>()(
    (set, get, api) => ({
        ...createBaseSlice<BookPublicItem>()(set, get, api),
        ...createQuerySlice<NoFilter, string>(1, 8)(set, get, api),
    })
);
