import { notify } from '@/_components/utils/Notify'
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeDepartmentListPublic } from './department-public-store';
import { getByIdDepartmentPublicApi, getListDisciplineByDepartmentIdApiPublic, getListMemberByDepartmentIdApiPublic, getPublicDepartmentsListApi, getPublicDisciplineDetailApi, getListCourseByPublicDisciplineApi, getListMemberByPublicDisciplineApi } from './department-public-service';
import { DepartmentMembersListPublic, DepartmentPublicDetail, DisciplineOfDepartmentPublicList, DisciplineDetailPublic, DisciplineCoursePublicList } from './department-public-type';


export { 
    getDepartmentsDetailPublicAction,
    getListDisciplineByDepartmentIdPublicAction, getListMemberDepartmentPublicAction, getPublicDepartmentsListAction,
    getPublicDisciplineDetailAction, getListCourseByPublicDisciplineAction, getListMemberByPublicDisciplineAction
}



async function getPublicDepartmentsListAction() {

    const { setLoading, setPagination, setData, query, searchField } = storeDepartmentListPublic.getState();
    setLoading(true);

    const url = toSearchParams(query, searchField);

    const res = await getPublicDepartmentsListApi(url);
    if (res.code !== 1) {
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

    if (res.code !== 1) return null;

    return res.data;
}

async function getListDisciplineByDepartmentIdPublicAction(id: string, param: URLSearchParams): Promise<DisciplineOfDepartmentPublicList | null> {

    const res = await getListDisciplineByDepartmentIdApiPublic(id, param);

    if (res.code !== 1) return null;

    return res.data;
}

async function getListMemberDepartmentPublicAction(id: string, param: URLSearchParams): Promise<DepartmentMembersListPublic| null> {

    const res = await getListMemberByDepartmentIdApiPublic(id, param);

    if (res.code !== 1) return null;

    return res.data;
}

async function getPublicDisciplineDetailAction(departmentId: string, id: string): Promise<DisciplineDetailPublic | null> {
    const res = await getPublicDisciplineDetailApi(departmentId, id);
    if (res.code !== 1) return null;
    return res.data;
}

async function getListCourseByPublicDisciplineAction(departmentId: string, id: string, param: URLSearchParams): Promise<DisciplineCoursePublicList | null> {
    const res = await getListCourseByPublicDisciplineApi(departmentId, id, param);
    if (res.code !== 1) return null;
    return res.data;
}

async function getListMemberByPublicDisciplineAction(departmentId: string, id: string, param: URLSearchParams): Promise<DepartmentMembersListPublic | null> {
    const res = await getListMemberByPublicDisciplineApi(departmentId, id, param);
    if (res.code !== 1) return null;
    return res.data;
}
