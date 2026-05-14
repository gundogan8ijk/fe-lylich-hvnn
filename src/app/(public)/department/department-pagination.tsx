"use client";

import PaginationButton from "@/components/query/paginationButton";
import { storeDepartment } from "@/stores/department-store";

export default function DepartmentPagination() {

    return (
        <PaginationButton store={storeDepartment} />
    );
}