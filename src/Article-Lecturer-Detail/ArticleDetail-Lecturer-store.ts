import { create } from "zustand";
import { ArticleDetailItem } from "./ArticleDetail-Lecturer-type";
import { BaseStore, createBaseStore } from "@/_Common/_stores/base-store";

type ArticleDetailExtra = {
    clear: () => void;
};

type ArticleDetailLecturer = BaseStore<ArticleDetailItem> & ArticleDetailExtra;

export const storeArticleDetail = create<ArticleDetailLecturer>((set, get, api) => ({
    ...createBaseStore<ArticleDetailItem>()(set, get, api),

    clear: () => {
        set({
        
        });
    },
}));