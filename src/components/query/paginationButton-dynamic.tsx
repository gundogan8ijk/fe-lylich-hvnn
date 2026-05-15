"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UseBoundStore, StoreApi } from "zustand";
import { cn } from "@/lib/utils";
import { Pagination } from "@/types/pagination-typeConfig";
import { QuerySlice } from "@/stores/base-list/query-module";

type QueryStore<TFilter, TSortField extends string> =
    UseBoundStore<StoreApi<QuerySlice<TFilter, TSortField>>>;

type Props<TFilter, TSortField extends string> = {
    store: QueryStore<TFilter, TSortField>;
    onClick?: (page: number, state: Pagination) => void;
};

export default function PaginationButtonDynamic<
    TFilter,
    TSortField extends string
>({ store, onClick }: Props<TFilter, TSortField>) {
    const page = store((s) => s.query.page);
    const perPage = store((s) => s.query.perPage);
    const totalPages = store((s) => s.totalPages);
    const totalCount = store((s) => s.totalCount);
    const setNowPage = store((s) => s.setPage);


    const setHandlePage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        setNowPage(newPage);
        const Pagination: Pagination = {
            page: page,
            perPage: perPage,
            totalCount: totalCount,
            totalPages: totalPages,
        };

        onClick?.(newPage, Pagination)
    };

    const buildPages = (): (number | "...")[] => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | "...")[] = [];
        const left = Math.max(2, page - 1);
        const right = Math.min(totalPages - 1, page + 1);

        pages.push(1);

        if (left > 2) pages.push("...");

        for (let i = left; i <= right; i++) pages.push(i);

        if (right < totalPages - 1) pages.push("...");

        pages.push(totalPages);

        return pages;
    };

    const pages = buildPages();

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* Prev */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => setHandlePage(page - 1)}
                disabled={page === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Pages */}
            {pages.map((p, idx) =>
                p === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                        ...
                    </span>
                ) : (
                    <Button
                        key={p}
                        variant={p === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHandlePage(p)}
                        className={cn("min-w-9")}
                    >
                        {p}
                    </Button>
                )
            )}

            {/* Next */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => setHandlePage(page + 1)}
                disabled={page === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}