import { create } from "zustand";
import { BookMangerItemResponse, BookManagerDetailResponse } from "./book-manager-type";

interface BookListMangerStore {
    data: BookMangerItemResponse[];
    loading: boolean;
    setData: (data: BookMangerItemResponse[]) => void;
    setLoading: (loading: boolean) => void;
}

export const storeBookListManger = create<BookListMangerStore>()((set) => ({
    data: [],
    loading: false,
    setData: (data) => set({ data }),
    setLoading: (loading) => set({ loading }),
}));

interface BookDetailManagerStore {
    data: BookManagerDetailResponse | null;
    isLoading: boolean;
    setData: (data: BookManagerDetailResponse | null) => void;
    setLoading: (loading: boolean) => void;
}

export const storeBookDetailManager = create<BookDetailManagerStore>()((set) => ({
    data: null,
    isLoading: false,
    setData: (data) => set({ data }),
    setLoading: (isLoading) => set({ isLoading }),
}));
