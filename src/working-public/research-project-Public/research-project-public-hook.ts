import { notify } from '@/_components/utils/Notify';
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeResearchProjectListPublic } from './research-project-public-store';
import { getPublicResearchProjectsApi, getPublicResearchProjectByIdApi } from './research-project-public-service';
import { ResearchProjectPublicDetail } from './research-project-public-type';

export async function getPublicResearchProjectsListAction() {
    const { setLoading, setPagination, setData, query } = storeResearchProjectListPublic.getState();
    setLoading(true);

    const url = toSearchParams(query);

    const res = await getPublicResearchProjectsApi(url);
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);
}

export async function getPublicResearchProjectDetailAction(id: string): Promise<ResearchProjectPublicDetail | null> {
    const res = await getPublicResearchProjectByIdApi(id);
    if (res.code !== 1) return null;
    return res.data;
}
