// paged.slice.ts
import type { StateCreator } from "zustand";
import { defaultPagination, Pagination } from "@/types/pagination-typeConfig";

export type PagedState = {
    pagination: Pagination;
    loadingMore: boolean;
};

export type PagedActions = {
    setPagination: (v: Pagination) => void;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setLoadingMore: (v: boolean) => void;
};

export type PagedSlice = PagedState & PagedActions;

export const createPagedSlice =
    (): StateCreator<PagedSlice, [], [], PagedSlice> =>
        (set, get) => ({
            pagination: defaultPagination,
            loadingMore: false,

            setPagination: (v) => set({ pagination: v }),

            // setPage: (page) =>
            //     set((s) => ({
            //         pagination: { ...s.pagination, page },
            //     })),

            // setPage: (page: number) =>
            //     set((state) => {
            //         const { totalPages } = state.pagination;

            //         if (page < 1 || page > totalPages) {
            //             return state; // 👈 quan trọng
            //         }

            //         return {
            //             pagination: {
            //                 ...state.pagination,
            //                 page,
            //             },
            //         };
            //     }),

            setPage: (page: number) =>
                set((state) => {
                    const { totalPages } = state.pagination;

                    const safePage =
                        page < 1 ? 1 :
                            page > totalPages ? totalPages :
                                page;

                    return {
                        pagination: {
                            ...state.pagination,
                            page: safePage,
                        },
                    };
                }),

            setPageSize: (size) =>
                set((s) => ({
                    pagination: {
                        ...s.pagination,
                        pageSize: size,
                        page: 1,
                    },
                })),

            setLoadingMore: (v) => set({ loadingMore: v }),
        });