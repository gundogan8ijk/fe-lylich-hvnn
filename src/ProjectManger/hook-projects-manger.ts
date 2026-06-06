import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { notify } from "@/_components/utils/Notify";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { addDisciplinesByMangerApi, createProjectApi, CreateProjectForm, deleteDisciplineByManagerApi, deleteManagerProjectApi, getMangerProjectListApi, getProjectManagerDetailApi, updateBaseInfoProjectMangerApi, UpdateBaseInfoProjectMangerForm, updateConfirmedProjectDetailApi, updateTimeEndProjectMangerApi } from "./ser-projects-manger";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { storeProjectMangerList } from "./store-list-projects-manger";
import { storeProjectManagerDetail } from "./store-detail-project-manger";
import { ConfirmedStatus } from "@/_constants/base-constant";

export {
    //list
    getMangerProjectListAction, createProjectListAction, deleteMangerProjectListAction,
    //chi tiet manger
    getProjectManagerDetailAction, deleteMangerProjectDetailAction, updateConfirmedProjectDetailAction,
    updateBaseInfoProjectMangerAction, addDisciplinesByMangerAction, deleteDisciplineByManagerAction,
    updateTimeEndProjectMangerAction
}


async function getMangerProjectListAction() {

    const { setLoading, setPagination, setData, query } = storeProjectMangerList.getState();
    setLoading(true);

    const url = toSearchParams(query);

    const res = await getMangerProjectListApi(url);
    if (res.code === -1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);

}


async function createProjectListAction(form: CreateProjectForm): Promise<boolean> {

    const res = await createProjectApi(form);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    else if (res.code === 1 && res.data) {
        notify.success("đăng kí đề tài thành công");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    return true;
}

async function deleteMangerProjectListAction(id: string) {
    const { removeItemById } = storeProjectMangerList.getState();

    const res = await deleteManagerProjectApi(id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    }
    else if (res.code === 1) {
        removeItemById(id);
        notify.success("Xóa đề tài thành công");
    }
}

async function getProjectManagerDetailAction(id: string) {
    const { setLoading, setData, setNull } = storeProjectManagerDetail.getState();

    setLoading(true);

    const res = await getProjectManagerDetailApi(id);

    if (res.code === 1 && res.data) setData(res.data);
    else setNull();

    setLoading(false);
}

async function deleteMangerProjectDetailAction() {
    const { data, setDeleting } = storeProjectManagerDetail.getState();
    if (!data) return;

    setDeleting(true);
    const res = await deleteManagerProjectApi(data.id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setDeleting(false); // ← đang thiếu cái này
    }
    else if (res.code === 1) {
        notify.success("Xóa đề tài thành công");
        setTimeout(() => {
            window.location.href = "/manager/research-projects";
        }, 200);
    }
}


async function updateConfirmedProjectDetailAction(confirmedStatus: ConfirmedStatus) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);
    const res = await updateConfirmedProjectDetailApi(data.id, { confirmedStatus });

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setUpdating(false);
    }
    else if (res.code === 1) {
        notify.success("Thay đổi trạng thái xác thực đề tài thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function updateBaseInfoProjectMangerAction(form: UpdateBaseInfoProjectMangerForm) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);

    const res = await updateBaseInfoProjectMangerApi(data.id, form);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setUpdating(false);
    }
    else if (res.code === 1) {
        notify.success("Cập nhật thông tin đề tài thành công");

        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function addDisciplinesByMangerAction(disciplineIds: string[]) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);

    const res = await addDisciplinesByMangerApi(data.id, disciplineIds);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setUpdating(false);
    }
    else if (res.code === 1) {
        notify.success("Cập nhật lĩnh vực nghiên cứu thành công");

        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function deleteDisciplineByManagerAction(disciplineId: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);

    const res = await deleteDisciplineByManagerApi(data.id, disciplineId);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setUpdating(false);
    }
    else if (res.code === 1) {
        notify.success("Xóa lĩnh vực nghiên cứu thành công");

        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }

    setUpdating(false);
}


async function updateTimeEndProjectMangerAction(timeEnd: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);

    const res = await updateTimeEndProjectMangerApi(data.id, timeEnd);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Cập nhật ngày kết thúc thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }

    setUpdating(false);
}