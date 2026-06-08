'use client'

import { useEffect } from "react";
import { getBookDetailManagerAction } from "@/working-manager/book/book-manager-hook";
import { storeBookDetailManager } from "@/working-manager/book/book-manager-store";

export default function SetupDataBookDetail({ id }: { id: string }) {
    useEffect(() => {
        storeBookDetailManager.getState().setData(null);
        getBookDetailManagerAction(id);
    }, [id]);

    return null;
}
