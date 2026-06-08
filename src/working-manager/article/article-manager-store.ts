import { create } from "zustand";
import { ArticleMangerItemResponse, ArticleManagerDetailResponse } from "./article-manager-type";

interface ArticleListMangerStore {
    data: ArticleMangerItemResponse[];
    loading: boolean;
    setData: (data: ArticleMangerItemResponse[]) => void;
    setLoading: (loading: boolean) => void;
}

export const storeArticleListManger = create<ArticleListMangerStore>()((set) => ({
    data: [],
    loading: false,
    setData: (data) => set({ data }),
    setLoading: (loading) => set({ loading }),
}));

interface ArticleDetailManagerStore {
    data: ArticleManagerDetailResponse | null;
    isLoading: boolean;
    setData: (data: ArticleManagerDetailResponse | null) => void;
    setLoading: (loading: boolean) => void;
}

export const storeArticleDetailManager = create<ArticleDetailManagerStore>()((set) => ({
    data: null,
    isLoading: false,
    setData: (data) => set({ data }),
    setLoading: (isLoading) => set({ isLoading }),
}));
