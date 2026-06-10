import { notify } from '@/_components/utils/Notify';
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeBookListPublic } from './book-public-store';
import { getPublicBooksApi, getPublicBookByIdApi } from './book-public-service';
import { BookPublicDetail } from './book-public-type';

export async function getPublicBooksListAction() {
    const { setLoading, setPagination, setData, query } = storeBookListPublic.getState();
    setLoading(true);

    const url = toSearchParams(query);

    const res = await getPublicBooksApi(url);
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);
}

export async function getPublicBookDetailAction(id: string): Promise<BookPublicDetail | null> {
    const res = await getPublicBookByIdApi(id);
    if (res.code !== 1) return null;
    return res.data;
}
