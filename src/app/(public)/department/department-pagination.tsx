'use client'
import storeDepartment from "@/stores/department-store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DepartmentPagination() {
    const pagination = storeDepartment((s) => s.pagination);
    const setPagination = storeDepartment((s) => s.setPagination);

    const { page, totalPages } = pagination;

    const onPageChange = (newPage: number) => {
        setPagination({
            ...pagination,
            page: newPage,
        });
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {pages.map((p) => (
                <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </Button>
            ))}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}