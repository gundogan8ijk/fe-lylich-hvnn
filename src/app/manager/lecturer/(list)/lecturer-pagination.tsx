"use client";

import PaginationButtonStore from "@/_components/query/paginationButton-dynamic";
import { storeLecturerListManger } from "@/working-manager/lecturer/lecturer-manger-store";

export default function LecturerPagination() {
    return (
        <PaginationButtonStore store={storeLecturerListManger} />
    );
}
