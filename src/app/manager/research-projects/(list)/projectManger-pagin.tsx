"use client";

import PaginationButtonStore from "@/_components/query/paginationButton-dynamic";
import { storeProjectMangerList } from "@/working-manager/project-list/project-list-store";

export default function MangerProjectPagination() {

    return (
        <PaginationButtonStore store={storeProjectMangerList} />
    );
}