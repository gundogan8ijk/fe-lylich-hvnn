'use client'

import { useEffect } from "react";
import { getArticleDetailManagerAction } from "@/working-manager/article/article-manager-hook";
import { storeArticleDetailManager } from "@/working-manager/article/article-manager-store";

export default function SetupDataArticleDetailManager({ id }: { id: string }) {
    useEffect(() => {
        storeArticleDetailManager.getState().setData(null);
        getArticleDetailManagerAction(id);
    }, [id]);

    return null;
}
