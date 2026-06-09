"use client";

import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function LecturerPagination() {
    const { totalPages, totalCount, query, setQuery, data } = useLecturerAdminStore();

    if (!data || data.length === 0 || totalPages <= 1) return null;

    const { page } = query;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-border/50 text-sm text-muted-foreground">
            <div>
                Hiển thị {(page - 1) * query.perPage + 1} - {Math.min(page * query.perPage, totalCount)} trên tổng số {totalCount}
            </div>
            
            <div className="flex items-center gap-1 mt-4 sm:mt-0">
                <button
                    onClick={() => setQuery({ page: 1 })}
                    disabled={page === 1}
                    className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                    onClick={() => setQuery({ page: page - 1 })}
                    disabled={page === 1}
                    className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="px-4 font-medium text-foreground">
                    {page} / {totalPages}
                </div>

                <button
                    onClick={() => setQuery({ page: page + 1 })}
                    disabled={page === totalPages}
                    className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
                <button
                    onClick={() => setQuery({ page: totalPages })}
                    disabled={page === totalPages}
                    className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronsRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
