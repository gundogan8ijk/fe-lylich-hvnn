'use client'

import React, { useEffect } from 'react';
import { getPublicLecturersListAction } from '@/working-public/lecturer-Public/lecturer-public-hook';
import { storeLecturerListPublic } from '@/working-public/lecturer-Public/lecturer-public-store';

export default function SetupDataLecturerPublic() {
    const page = storeLecturerListPublic((s) => s.query.page);
    const sort = storeLecturerListPublic((s) => s.query.sort);
    const isSearch = storeLecturerListPublic((s) => s.isSearch);

    useEffect(() => {
        getPublicLecturersListAction();
    }, [page, sort, isSearch]);

    return null;
}
