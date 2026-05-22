import {  getDepartmentsListApi, getListDisciplineApi, getListMemberApi } from "@/services/department-service";
import { notify } from '@/components/utils/Notify'
import { defaultPagination } from "@/types/base-type/pagination-typeConfig";
import { storeDepartment } from "@/stores/store-list/department-store";
import { toSearchParams } from "@/lib/query-options-toUrl-helper";
import {  DisciplineList, MemberList } from "@/types/department-type";
import { getLecturerMeApi } from "@/services/lecturer-service";
import { storeLecturer } from "@/stores/store-item/lecturer-store";


export { getDepartmentsListAction, getAcLecturer, getListDisciplineAction ,getListMemberAction}

async function getDepartmentsListAction() {

    const { setLoading, setPagination, setData, query, searchField } = storeDepartment.getState();
    setLoading(true);

    const url = toSearchParams(query, searchField);

    const res = await getDepartmentsListApi(url);
    if (res.code === -1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);

}

async function getAcLecturer(){

    const { setLoading, setData,setNull } = storeLecturer.getState();
    setLoading(true);
    const res = await getLecturerMeApi();
    if (res.code === 1 && res.data) setData(res.data);
    else setNull();

    setLoading(false);
}

async function getListDisciplineAction(id: string, param: URLSearchParams): Promise<DisciplineList | null> {

    const res = await getListDisciplineApi(id, param);

    if (res.code === -1) return null;

    return res.data;
}

async function getListMemberAction(id: string, param: URLSearchParams): Promise<MemberList| null> {

    const res = await getListMemberApi(id, param);

    if (res.code === -1) return null;

    return res.data;
}
