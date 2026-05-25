export type Pagination = {
    page: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
};

export const defaultPagination: Pagination = {
    page: 1,
    perPage: 10,
    totalCount: 0,
    totalPages: 1,
};

/** Pagination đã tính sẵn hasNext/hasPrev cho UI */
export type PaginationMeta = Pagination & {
    hasNext: boolean;
    hasPrev: boolean;
};

export function buildPaginationMeta(p: Pagination): PaginationMeta {
    return {
        ...p,
        hasNext: p.page < p.totalPages,
        hasPrev: p.page > 1,
    };
}
