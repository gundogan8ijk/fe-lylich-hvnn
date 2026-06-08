import { create } from "zustand";
import { BookDetail } from "./Book-Detail-type";
import { BaseStore, createBaseStore } from "@/_Common/_stores/base-store";

type BookDetailExtra = {
    clear: () => void;
};

type BookDetailStore = BaseStore<BookDetail> & BookDetailExtra;

export const storeBookDetail = create<BookDetailStore>((set, get, api) => ({
    ...createBaseStore<BookDetail>()(set, get, api),
    clear: () => set({}),
}));