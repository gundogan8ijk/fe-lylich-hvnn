"use client";

import PaginationButtonStore from "@/components/query/paginationButton-dynamic";
import { storeDepartment } from "@/stores/store-list/department-store";

export default function DepartmentPagination() {

    return (
        <PaginationButtonStore store={storeDepartment} />
    );
}