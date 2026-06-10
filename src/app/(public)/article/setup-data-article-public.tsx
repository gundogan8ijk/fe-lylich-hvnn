'use client'

import React, { useEffect } from 'react';
import { getPublicArticlesListAction } from '@/working-public/article-Public/article-public-hook';
import { storeArticleListPublic } from '@/working-public/article-Public/article-public-store';

export default function SetupDataArticlePublic() {
    const page = storeArticleListPublic((s) => s.query.page);
    const sort = storeArticleListPublic((s) => s.query.sort);
    const isSearch = storeArticleListPublic((s) => s.isSearch);

    useEffect(() => {
        getPublicArticlesListAction();
    }, [page, sort, isSearch]);

    return null;
}
