import { defaultPagination } from "@/_types/pagination-typeConfig";
import { notify } from "@/components/utils/Notify";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { createProjectApi, CreateProjectForm, deleteManagerProjectApi, getMangerProjectListApi, getProjectManagerDetailApi } from "./ser-projects-manger";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { storeProjectMangerList } from "./store-list-projects-manger";
import { storeProjectManagerDetail } from "./store-detail-project-manger";

export {
    //list
    getMangerProjectListAction, createProjectListAction, deleteMangerProjectListAction,
    //chi tiet manger
    getProjectManagerDetailAction, deleteMangerProjectDetailAction
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
    if (!data) return
    setDeleting(true)
    const res = await deleteManagerProjectApi(data.id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    }
    else if (res.code === 1) {

        notify.success("Xóa đề tài thành công");
        setTimeout(() => {
            window.location.href = "/manager/research-projects";
        }, 200);
    }
}