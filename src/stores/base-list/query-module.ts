import { StateCreator } from "zustand";
import { ListQuery, FieldFilters, SortOption } from "@/types/base-type/query-types";
import { defaultPagination, Pagination } from "@/types/base-type/pagination-typeConfig";

export type QuerySlice<TFilter, TSortField extends string> = {
    query: ListQuery<TFilter, TSortField>;
    loadingMore: boolean;
    totalCount: number;
    totalPages: number;
    isSearch:boolean;

    setQuery: (q: Partial<ListQuery<TFilter, TSortField>>) => void;

    setSearch: (search: string) => void;

    setFilters: (filters?: TFilter) => void;
    mergeFilters: (partial: TFilter) => void;
    setFieldFilter: <K extends keyof TFilter>(
        field: K,
        condition?: TFilter[K]
    ) => void;

    setSort: (sort: SortOption<TSortField> | null) => void;
    toggleSort: (field: TSortField) => void;

    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;

    setPagination: (v: Pagination) => void;
    setLoadingMore: (v: boolean) => void;

    resetQuery: () => void;
};

const defaultQuery = <TFilter, TSortField extends string>(
    page = defaultPagination.page, perPage = defaultPagination.perPage
): ListQuery<TFilter, TSortField> => ({
    search: "",
    filters: undefined,
    sort: null,
    page,
    perPage,
});

export const createQuerySlice =
    <TFilter extends FieldFilters, TSortField extends string>(
        page = 1, initialPerPage = 10
    ): StateCreator<QuerySlice<TFilter, TSortField>> =>
        (set, get) => ({
            query: defaultQuery<TFilter, TSortField>(page, initialPerPage),
            loadingMore: false,
            totalCount: defaultPagination.totalCount,
            totalPages: defaultPagination.totalPages,
            isSearch:false,

            setQuery: (q) =>
                set((s) => ({
                    query: {
                        ...s.query,
                        ...q,
                        page: q.page ?? defaultPagination.page,
                    },
                })),

            setSearch: (search) =>
                set((s) => ({ query: { ...s.query, search, page: defaultPagination.page }, isSearch: !s.isSearch,})),

            setFilters: (filters) =>
                set((s) => ({ query: { ...s.query, filters, page:  defaultPagination.page }, })),

            mergeFilters: (partial) =>
                set((s) => ({
                    query: {
                        ...s.query,
                        filters: {
                            ...(s.query.filters || {}),
                            ...partial,
                        } as TFilter,
                        page: 1,
                    },
                })),

            setFieldFilter: (field, condition) =>
                set((s) => {
                    const next = { ...(s.query.filters || {}) } as TFilter;

                    if (!condition) delete next[field];
                    else next[field] = condition;

                    return {
                        query: { ...s.query, filters: next, page: 1 },
                    };
                }),

            setSort: (sort) => set((s) => ({ query: { ...s.query, sort }, })),

            toggleSort: (field) =>
                set((state) => {
                    const current = state.query.sort;

                    let nextSort: SortOption<TSortField> | null = null;

                    if (!current || current.field !== field) {
                        nextSort = { field, direction: "asc" };
                    } else if (current.direction === "asc") {
                        nextSort = { field, direction: "desc" };
                    } else {
                        nextSort = null;
                    }

                    return {
                        query: {
                            ...state.query,
                            sort: nextSort,
                            page: 1,
                        },
                    };
                }),

            setPage: (page) =>
                set((state) => {
                    const safePage =
                        Math.max(1, Math.min(page, state.totalPages || 1));

                    return {
                        query: {
                            ...state.query,
                            page: safePage,
                        },
                    };
                }),

            setPerPage: (perPage) =>
                set((state) => {
                    const safePerPage = Math.max(1, perPage);

                    return {
                        query: {
                            ...state.query,
                            perPage: safePerPage,
                            page: 1, // reset page là đúng
                        },
                    };
                }),

            resetQuery: () => set({ query: defaultQuery<TFilter, TSortField>(initialPerPage), }),

            setPagination: (v) =>
                set((state) => ({
                    query: {
                        ...state.query,
                        perPage: v.perPage,
                        page: v.page,
                    },
                    totalCount: v.totalCount,
                    totalPages: v.totalPages,
                })),

            setLoadingMore: (v) => set({ loadingMore: v }),
        });