import { StateCreator } from "zustand";
import { ListQuery, FieldFilters, SortOption } from "@/types/query-types";

export type QuerySlice<TFilter, TSortField extends string> = {
    query: ListQuery<TFilter, TSortField>;

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

    resetQuery: () => void;
};

const defaultQuery = <TFilter, TSortField extends string>(
    perPage = 10
): ListQuery<TFilter, TSortField> => ({
    search: "",
    filters: undefined,
    sort: null,
    page: 1,
    perPage,
});

export const createQuerySlice =
    <TFilter extends FieldFilters, TSortField extends string>(
        initialPerPage = 10
    ): StateCreator<QuerySlice<TFilter, TSortField>> =>
        (set, get) => ({
            query: defaultQuery<TFilter, TSortField>(initialPerPage),

            setQuery: (q) =>
                set((s) => ({
                    query: {
                        ...s.query,
                        ...q,
                        page: q.page ?? 1,
                    },
                })),

            setSearch: (search) =>
                set((s) => ({
                    query: { ...s.query, search, page: 1 },
                })),

            setFilters: (filters) =>
                set((s) => ({
                    query: { ...s.query, filters, page: 1 },
                })),

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

            setSort: (sort) =>
                set((s) => ({
                    query: { ...s.query, sort },
                })),

            // toggleSort: (field) =>
            //     set((s) => {
            //         const current = s.query.sort;
            //         const nextDir =
            //             current?.field === field && current.direction === "asc"
            //                 ? "desc"
            //                 : "asc";

            //         return {
            //             query: {
            //                 ...s.query,
            //                 sort: { field, direction: nextDir },
            //             },
            //         };
            //     }),

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
                        },
                    };
                }),

            setPage: (page) =>
                set((s) => ({
                    query: { ...s.query, page },
                })),

            setPerPage: (perPage) =>
                set((s) => ({
                    query: { ...s.query, perPage, page: 1 },
                })),

            resetQuery: () =>
                set({
                    query: defaultQuery<TFilter, TSortField>(initialPerPage),
                }),
        });