import { createProjectApi, CreateProjectForm, deleteManagerProjectApi, deleteResearchProjectApi, getListProjectMeApi, getMangerProjectListApi, registerProjectApi, RegisterProjectForm } from "@/_services/research-projects-ser";
import { defaultPagination } from "@/_types/base-type/pagination-typeConfig";
import { notify } from "@/components/utils/Notify";
import { toSearchParams } from "@/lib/query-options-toUrl-helper";
import { getAllErrorMessage, getErrorMessage } from "@/lib/response-helper";
import { storeProjectManger } from "@/stores/store-list/projects-manger-store";
import { storeResearchProjectListMe } from "@/stores/store-list/research-projects-store";

export {
    getListProjectMeAction, registerProjectAction, deleteProjectAction,
    getMangerProjectListAction, createProjectAction, deleteMangerProjectAction
}

async function getListProjectMeAction() {
    const { setLoading, setData, clear } = storeResearchProjectListMe.getState();
    setLoading(true);

    const res = await getListProjectMeApi();

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    }
    else if (res.code === 1) {
        setData(res.data ?? []);
    }

    setLoading(false);
}


async function registerProjectAction(form: RegisterProjectForm): Promise<boolean> {
    const { addItem } = storeResearchProjectListMe.getState();

    const res = await registerProjectApi(form);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    else if (res.code === 1 && res.data) {
        addItem(res.data);
        notify.success("đăng kí đề tài thành công");
    }

    return true;

}

async function deleteProjectAction(id: string) {
    const { removeById } = storeResearchProjectListMe.getState();

    const res = await deleteResearchProjectApi(id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    }
    else if (res.code === 1) {
        removeById(id);
        notify.success("Xóa đề tài thành công");
    }

}

async function getMangerProjectListAction() {

    const { setLoading, setPagination, setData, query } = storeProjectManger.getState();
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


async function createProjectAction(form: CreateProjectForm): Promise<boolean> {

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

async function deleteMangerProjectAction(id: string) {
    const { removeItemById } = storeProjectManger.getState();

    const res = await deleteManagerProjectApi(id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    }
    else if (res.code === 1) {
        removeItemById(id);
        notify.success("Xóa đề tài thành công");
    }
}