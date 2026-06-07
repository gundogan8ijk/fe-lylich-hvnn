"use client";

import PaginationButtonStore from "@/_components/query/paginationButton-dynamic";
import { storeDepartmentListPublic } from "@/department-Manager/department-manger-store";

export default function DepartmentPagination() {

    return (
        <PaginationButtonStore store={storeDepartmentListPublic} />
    );
}