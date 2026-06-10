import { notify } from '@/_components/utils/Notify';
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeLecturerListPublic } from './lecturer-public-store';
import { getPublicLecturersApi, getPublicLecturerByIdApi } from './lecturer-public-service';
import { LecturerPublicDetail } from './lecturer-public-type';

export async function getPublicLecturersListAction() {
    const { setLoading, setPagination, setData, query, searchField } = storeLecturerListPublic.getState();
    setLoading(true);

    const url = toSearchParams(query, searchField);

    const res = await getPublicLecturersApi(url);
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);
}

export async function getPublicLecturerDetailAction(id: string): Promise<LecturerPublicDetail | null> {
    const res = await getPublicLecturerByIdApi(id);
    if (res.code !== 1) return null;
    return res.data;
}
