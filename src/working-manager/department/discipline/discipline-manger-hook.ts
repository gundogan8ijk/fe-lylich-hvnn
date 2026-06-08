import { api } from "@/_Common/_services/axios-service-config";
import { CourseListResponse, DisciplineDetailPublic, MemberListResponse, RenameCodeDisciplineRequest, RenameDisciplineRequest, UpdateDescribeDisciplineRequest, UpdateTotalCreditsDisciplineRequest, AddCourseRequest } from "./discipline-manger-type";
import { ListQuery, SortDirection } from "@/_Common/_types/query-types";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { notify } from "@/_components/utils/Notify";
import { deleteDisciplineApi, renameCodeDisciplineApi, renameDisciplineApi, toggleDisciplineVisibilityApi, updateDescribeDisciplineApi, updateTotalCreditsDisciplineApi, addCourseDisciplineApi } from "./discipline-manger-service";

export async function getDisciplineDetailAction(disciplineId: string): Promise<DisciplineDetailPublic | null> {
    try {
        const res = await api.get(`/disciplines/${disciplineId}`);
        return res.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getListCourseByDisciplineAction(disciplineId: string, searchParams: URLSearchParams): Promise<CourseListResponse | null> {
    try {
        const res = await api.get(`/disciplines/${disciplineId}/courses`, { params: searchParams });
        return res.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getListMemberByDisciplineAction(departmentId: string, disciplineId: string, searchParams: URLSearchParams): Promise<MemberListResponse | null> {
    try {
        const res = await api.get(`/departments/${departmentId}/disciplines/${disciplineId}/members`, { params: searchParams });
        return res.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function renameDisciplineAction(departmentId: string, id: string, data: RenameDisciplineRequest) {
    const res = await renameDisciplineApi(departmentId, id, data);
    if (res.code === 1) {
        notify.success("Cập nhật tên chuyên ngành thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

export async function renameCodeDisciplineAction(departmentId: string, id: string, data: RenameCodeDisciplineRequest) {
    const res = await renameCodeDisciplineApi(departmentId, id, data);
    if (res.code === 1) {
        notify.success("Cập nhật mã chuyên ngành thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

export async function updateDescribeDisciplineAction(departmentId: string, id: string, data: UpdateDescribeDisciplineRequest) {
    const res = await updateDescribeDisciplineApi(departmentId, id, data);
    if (res.code === 1) {
        notify.success("Cập nhật mô tả thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

export async function updateTotalCreditsDisciplineAction(departmentId: string, id: string, data: UpdateTotalCreditsDisciplineRequest) {
    const res = await updateTotalCreditsDisciplineApi(departmentId, id, data);
    if (res.code === 1) {
        notify.success("Cập nhật số tín chỉ thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

export async function deleteDisciplineAction(departmentId: string, id: string) {
    const res = await deleteDisciplineApi(departmentId, id);
    if (res.code === 1) {
        notify.success("Xoá chuyên ngành thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

export async function toggleDisciplineVisibilityAction(departmentId: string, id: string) {
    const res = await toggleDisciplineVisibilityApi(departmentId, id);
    if (res.code === 1) {
        notify.success("Chuyển đổi trạng thái hiển thị thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

export async function addCourseDisciplineAction(disciplineId: string, data: AddCourseRequest) {
    const res = await addCourseDisciplineApi(disciplineId, data);
    if (res.code === 1) {
        notify.success("Thêm môn học thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}
