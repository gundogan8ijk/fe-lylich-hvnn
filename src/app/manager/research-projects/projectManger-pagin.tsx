"use client";

import PaginationButtonStore from "@/components/query/paginationButton-dynamic";
import { storeProjectMangerList } from "@/ProjectManger/store-list-projects-manger";

export default function MangerProjectPagination() {

    return (
        <PaginationButtonStore store={storeProjectMangerList} />
    );
}