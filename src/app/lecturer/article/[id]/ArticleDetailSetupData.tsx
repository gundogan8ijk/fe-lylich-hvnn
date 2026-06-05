'use client';

import { getArticleDetailAction } from "@/Article-Lecturer-Detail/ArticleDetail-Lecturer-hook";
import { useEffect } from "react";

export default function ArticleDetailSetupData({ id }: { id: string }) {
    useEffect(() => {
        getArticleDetailAction(id);
    }, [id]);

    return <></>;
}
