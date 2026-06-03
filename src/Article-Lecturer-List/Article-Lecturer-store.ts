import { BaseSlice, createBaseSlice } from "../_Common/_stores/base-list/base-module";
import { create } from "zustand";
import { ArticleLecturerItem } from "./Article-Lecturer-type";

type ArticleLecturerListExtra = {
    clear: () => void;
};

export type ArticleLecturerListStore = BaseSlice<ArticleLecturerItem> & ArticleLecturerListExtra;

export const storeArticleLecturerList =
    create<ArticleLecturerListStore>()(
        (set, get, api) => ({
            ...createBaseSlice<ArticleLecturerItem>()(set, get, api),

            clear: () => {
                set({ data: [] });
            }
        })
    );
