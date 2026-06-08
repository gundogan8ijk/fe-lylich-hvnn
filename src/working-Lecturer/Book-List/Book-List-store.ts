import { BaseSlice, createBaseSlice } from '@/_Common/_stores/base-list/base-module';
import { create } from "zustand";
import { BookItem } from "./Book-List-type";

type BookListExtra = {
    clear: () => void;
};

export type BookListStore = BaseSlice<BookItem> & BookListExtra;

export const storeBookList = create<BookListStore>()(
    (set, get, api) => ({
        ...createBaseSlice<BookItem>()(set, get, api),
        clear: () => set({ data: [] }),
    })
);