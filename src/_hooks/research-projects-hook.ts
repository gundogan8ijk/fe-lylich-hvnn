import { deleteResearchProjectApi, getListProjectMeApi, registerProjectApi, RegisterProjectForm } from "@/_services/research-projects-ser";
import { notify } from "@/components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/lib/response-helper";
import { storeResearchProjectListMe } from "@/stores/store-list/research-projects-store";

export {
    getListProjectMeAction, registerProjectAction,deleteProjectAction
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