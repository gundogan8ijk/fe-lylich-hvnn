import { notify } from '@/_components/utils/Notify';
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeArticleListPublic } from './article-public-store';
import { getPublicArticlesApi, getPublicArticleByIdApi } from './article-public-service';
import { ArticlePublicDetail } from './article-public-type';

export async function getPublicArticlesListAction() {
    const { setLoading, setPagination, setData, query } = storeArticleListPublic.getState();
    setLoading(true);

    const url = toSearchParams(query);

    const res = await getPublicArticlesApi(url);
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);
}

export async function getPublicArticleDetailAction(id: string): Promise<ArticlePublicDetail | null> {
    const res = await getPublicArticleByIdApi(id);
    if (res.code !== 1) return null;
    return res.data;
}
