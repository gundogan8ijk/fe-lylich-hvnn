import { Pagination, PaginationMeta } from "@/_types/pagination-typeConfig";

export const getPages = (current: number, total: number) => {
    const pages: (number | string)[] = [];

    pages.push(1);

    if (current > 3) {
        pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (current < total - 2) {
        pages.push('...');
    }

    if (total > 1) {
        pages.push(total);
    }

    return pages;
};

export function buildPaginationMeta(p: Pagination): PaginationMeta {
    return {
        ...p,
        hasNext: p.page < p.totalPages,
        hasPrev: p.page > 1,
    };
}