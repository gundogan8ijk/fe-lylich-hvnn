"use client";

import PaginationButtonStore from "@/components/query/paginationButton-dynamic";
import { storeDepartmentListPublic } from "@/department-Public/department-public-store";

export default function DepartmentPagination() {

    return (
        <PaginationButtonStore store={storeDepartmentListPublic} />
    );
}