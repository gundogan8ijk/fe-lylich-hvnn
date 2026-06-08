"use client";

import { useEffect, useRef } from "react";
import { getListArticleManagerAction } from "@/working-manager/article/article-manager-hook";

export default function SetupDataArticleList() {
    const isFetched = useRef(false);

    useEffect(() => {
        if (!isFetched.current) {
            getListArticleManagerAction();
            isFetched.current = true;
        }
    }, []);

    return null;
}
