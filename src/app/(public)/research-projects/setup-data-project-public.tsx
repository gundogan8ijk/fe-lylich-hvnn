'use client'

import React, { useEffect } from 'react';
import { getPublicResearchProjectsListAction } from '@/working-public/research-project-Public/research-project-public-hook';
import { storeResearchProjectListPublic } from '@/working-public/research-project-Public/research-project-public-store';

export default function SetupDataProjectPublic() {
    const page = storeResearchProjectListPublic((s) => s.query.page);
    const sort = storeResearchProjectListPublic((s) => s.query.sort);
    const isSearch = storeResearchProjectListPublic((s) => s.isSearch);

    useEffect(() => {
        getPublicResearchProjectsListAction();
    }, [page, sort, isSearch]);

    return null;
}
