import { notify } from '@/_components/utils/Notify'
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeLecturerListManger } from './lecturer-manger-store';
import { getListLecturerManagerApi, createLecturerApi } from './lecturer-manger-service';
import { CreateLecturerRequest } from './lecturer-manger-type';

export {
    getListLecturerManagerAction,
    createLecturerAction
}

async function getListLecturerManagerAction() {
    const { setLoading, setPagination, setData, query, searchField } = storeLecturerListManger.getState();
    setLoading(true);

    const url = toSearchParams(query, searchField);

    const res = await getListLecturerManagerApi(url);
    if (res.code === -1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);
}

async function createLecturerAction(data: CreateLecturerRequest) {
    const res = await createLecturerApi(data);
    if (res.code === 1) {
        notify.success("Thêm giảng viên thành công");
        await getListLecturerManagerAction();
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}
