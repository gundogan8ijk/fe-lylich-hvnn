'use client'

import React, { useEffect } from 'react';
import { getPublicBooksListAction } from '@/working-public/book-Public/book-public-hook';
import { storeBookListPublic } from '@/working-public/book-Public/book-public-store';

export default function SetupDataBookPublic() {
    const page = storeBookListPublic((s) => s.query.page);
    const sort = storeBookListPublic((s) => s.query.sort);
    const isSearch = storeBookListPublic((s) => s.isSearch);

    useEffect(() => {
        getPublicBooksListAction();
    }, [page, sort, isSearch]);

    return null;
}
