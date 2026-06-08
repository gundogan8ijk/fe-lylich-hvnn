"use client";

import PaginationButtonStore from "@/_components/query/paginationButton-dynamic";
import { storeDepartmentListPublic } from '@/working-manager/department/infor/department-manger-store';

export default function DepartmentPagination() {

    return (
        <PaginationButtonStore store={storeDepartmentListPublic} />
    );
}