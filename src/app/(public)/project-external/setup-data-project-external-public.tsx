'use client'

import React, { useEffect } from 'react';
import { getPublicProjectExternalsListAction } from '@/working-public/project-external-Public/project-external-public-hook';
import { storeProjectExternalListPublic } from '@/working-public/project-external-Public/project-external-public-store';

export default function SetupDataProjectExternalPublic() {
    const page = storeProjectExternalListPublic((s) => s.query.page);
    const sort = storeProjectExternalListPublic((s) => s.query.sort);
    const isSearch = storeProjectExternalListPublic((s) => s.isSearch);

    useEffect(() => {
        getPublicProjectExternalsListAction();
    }, [page, sort, isSearch]);

    return null;
}
