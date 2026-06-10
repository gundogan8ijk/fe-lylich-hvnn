import { notify } from '@/_components/utils/Notify'
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { storeDepartmentListManger } from './department-manger-store';
import { getByIdDepartmentMangerApi, getDepartmentsListMangerApi, getListDisciplineByDepartmentIdApiManger, getListMemberByDepartmentIdApiManger, addDepartmentApi, renameDepartmentApi, renameCodeDepartmentApi, updateDescribeDepartmentApi, changeOfficeLocationApi, clearOfficeLocationApi, updateAvatarDepartmentApi, removeAvatarDepartmentApi, addMemberDepartmentApi, removeMemberDepartmentApi, updateMemberPositionDepartmentApi, deleteDepartmentApi, toggleDepartmentVisibilityApi } from './department-manger-service';
import { AddDepartmentRequest, DepartmentMembersListManger, DepartmentMangerDetail, DisciplineOfDepartmentMangerList, RenameDepartmentRequest, RenameCodeDepartmentRequest, UpdateDescribeDepartmentRequest, ChangeOfficeLocationRequest, UpdateAvatarDepartmentRequest, AddMemberRequest, UpdateMemberPositionRequest } from './department-manger-type';


export { 
    getDepartmentsDetailMangerAction,
    getDepartmentsListMangerAction,  getListDisciplineByDepartmentIdMangerAction ,getListMemberDepartmentMangerAction, addDepartmentMangerAction,
    renameDepartmentAction, renameCodeDepartmentAction, updateDescribeDepartmentAction, changeOfficeLocationAction, clearOfficeLocationAction, updateAvatarDepartmentAction, removeAvatarDepartmentAction,
    addMemberDepartmentAction, removeMemberDepartmentAction, updateMemberPositionDepartmentAction,
    deleteDepartmentAction, toggleDepartmentVisibilityAction
}

async function getDepartmentsListMangerAction() {

    const { setLoading, setPagination, setData, query, searchField } = storeDepartmentListManger.getState();
    setLoading(true);

    const url = toSearchParams(query, searchField);

    const res = await getDepartmentsListMangerApi(url);
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);

}

async function addDepartmentMangerAction(data: AddDepartmentRequest) {
    const res = await addDepartmentApi(data);
    if (res.code === 1) {
        notify.success("Thêm khoa thành công");
        await getDepartmentsListMangerAction();
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function getDepartmentsDetailMangerAction(id: string): Promise<DepartmentMangerDetail | null> {

    const res = await getByIdDepartmentMangerApi(id);

    if (res.code !== 1) return null;

    return res.data;
}

async function getListDisciplineByDepartmentIdMangerAction(id: string, param: URLSearchParams): Promise<DisciplineOfDepartmentMangerList | null> {

    const res = await getListDisciplineByDepartmentIdApiManger(id, param);

    if (res.code !== 1) return null;

    return res.data;
}

async function getListMemberDepartmentMangerAction(id: string, param: URLSearchParams): Promise<DepartmentMembersListManger| null> {

    const res = await getListMemberByDepartmentIdApiManger(id, param);

    if (res.code !== 1) return null;

    return res.data;
}

async function renameDepartmentAction(id: string, data: RenameDepartmentRequest) {
    const res = await renameDepartmentApi(id, data);
    if (res.code === 1) {
        notify.success("Cập nhật tên khoa thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function renameCodeDepartmentAction(id: string, data: RenameCodeDepartmentRequest) {
    const res = await renameCodeDepartmentApi(id, data);
    if (res.code === 1) {
        notify.success("Cập nhật mã khoa thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function updateDescribeDepartmentAction(id: string, data: UpdateDescribeDepartmentRequest) {
    const res = await updateDescribeDepartmentApi(id, data);
    if (res.code === 1) {
        notify.success("Cập nhật mô tả thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function changeOfficeLocationAction(id: string, data: ChangeOfficeLocationRequest) {
    const res = await changeOfficeLocationApi(id, data);
    if (res.code === 1) {
        notify.success("Cập nhật địa chỉ văn phòng thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function clearOfficeLocationAction(id: string) {
    const res = await clearOfficeLocationApi(id);
    if (res.code === 1) {
        notify.success("Xoá địa chỉ văn phòng thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function updateAvatarDepartmentAction(id: string, data: UpdateAvatarDepartmentRequest) {
    const res = await updateAvatarDepartmentApi(id, data);
    if (res.code === 1) {
        notify.success("Cập nhật ảnh đại diện thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function removeAvatarDepartmentAction(id: string) {
    const res = await removeAvatarDepartmentApi(id);
    if (res.code === 1) {
        notify.success("Gỡ ảnh đại diện thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function addMemberDepartmentAction(departmentId: string, data: AddMemberRequest) {
    const res = await addMemberDepartmentApi(departmentId, data);
    if (res.code === 1) {
        notify.success("Thêm thành viên thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function removeMemberDepartmentAction(departmentId: string, lecturerId: string) {
    const res = await removeMemberDepartmentApi(departmentId, lecturerId);
    if (res.code === 1) {
        notify.success("Gỡ thành viên thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function updateMemberPositionDepartmentAction(departmentId: string, lecturerId: string, data: UpdateMemberPositionRequest) {
    const res = await updateMemberPositionDepartmentApi(departmentId, lecturerId, data);
    if (res.code === 1) {
        notify.success("Cập nhật chức vụ thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function deleteDepartmentAction(id: string) {
    const res = await deleteDepartmentApi(id);
    if (res.code === 1) {
        notify.success("Xoá khoa thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}

async function toggleDepartmentVisibilityAction(id: string) {
    const res = await toggleDepartmentVisibilityApi(id);
    if (res.code === 1) {
        notify.success("Chuyển đổi trạng thái hiển thị thành công");
        return true;
    } else {
        notify.error(res.message);
        return false;
    }
}
