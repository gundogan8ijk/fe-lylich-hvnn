import { notify } from '@/components/utils/Notify'
import { defaultPagination } from "@/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeDepartmentListPublic } from './department-public-store';
import { getByIdDepartmentPublicApi, getDepartmentsListPublicApi, getListDisciplineByDepartmentIdApiPublic, getListMemberByDepartmentIdApiPublic } from './department-public-service';
import { DepartmentMembersListPublic, DepartmentPublicDetail, DisciplineOfDepartmentPublicList } from './department-public-type';


export { 
    getDepartmentsDetailPublicAction,
    getDepartmentsListPublicAction,  getListDisciplineByDepartmentIdPublicAction ,getListMemberDepartmentPublicAction}

async function getDepartmentsListPublicAction() {

    const { setLoading, setPagination, setData, query, searchField } = storeDepartmentListPublic.getState();
    setLoading(true);

    const url = toSearchParams(query, searchField);

    const res = await getDepartmentsListPublicApi(url);
    if (res.code === -1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);

}

async function getDepartmentsDetailPublicAction(id: string): Promise<DepartmentPublicDetail | null> {

    const res = await getByIdDepartmentPublicApi(id);

    if (res.code === -1) return null;

    return res.data;
}

async function getListDisciplineByDepartmentIdPublicAction(id: string, param: URLSearchParams): Promise<DisciplineOfDepartmentPublicList | null> {

    const res = await getListDisciplineByDepartmentIdApiPublic(id, param);

    if (res.code === -1) return null;

    return res.data;
}

async function getListMemberDepartmentPublicAction(id: string, param: URLSearchParams): Promise<DepartmentMembersListPublic| null> {

    const res = await getListMemberByDepartmentIdApiPublic(id, param);

    if (res.code === -1) return null;

    return res.data;
}
