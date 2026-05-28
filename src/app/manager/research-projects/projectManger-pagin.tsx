"use client";

import PaginationButtonStore from "@/components/query/paginationButton-dynamic";
import { storeProjectManger } from "@/stores/store-list/projects-manger-store";

export default function MangerProjectPagination() {

    return (
        <PaginationButtonStore store={storeProjectManger} />
    );
}