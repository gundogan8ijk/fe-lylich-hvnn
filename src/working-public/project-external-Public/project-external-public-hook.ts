import { notify } from '@/_components/utils/Notify';
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeProjectExternalListPublic } from './project-external-public-store';
import { getPublicProjectExternalsApi, getPublicProjectExternalByIdApi } from './project-external-public-service';
import { ProjectExternalPublicDetail } from './project-external-public-type';

export async function getPublicProjectExternalsListAction() {
    const { setLoading, setPagination, setData, query } = storeProjectExternalListPublic.getState();
    setLoading(true);

    const url = toSearchParams(query);

    const res = await getPublicProjectExternalsApi(url);
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);
}

export async function getPublicProjectExternalDetailAction(id: string): Promise<ProjectExternalPublicDetail | null> {
    const res = await getPublicProjectExternalByIdApi(id);
    if (res.code !== 1) return null;
    return res.data;
}
