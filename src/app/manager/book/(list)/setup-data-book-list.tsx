"use client";

import { useEffect, useRef } from "react";
import { getListBookManagerAction } from "@/working-manager/book/book-manager-hook";

export default function SetupDataBookList() {
    const isFetched = useRef(false);

    useEffect(() => {
        if (!isFetched.current) {
            getListBookManagerAction();
            isFetched.current = true;
        }
    }, []);

    return null;
}
