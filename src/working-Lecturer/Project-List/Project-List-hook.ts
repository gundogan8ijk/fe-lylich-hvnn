import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import {
    getMyProjectsApi,
    registerProjectApi,
    deleteProjectApi,
    RegisterProjectForm,
} from "./Project-List-ser";
import { storeProjectList } from "./Project-List-store";

export {
    getMyProjectsAction,
    registerProjectAction,
    deleteProjectAction,
};

export type { RegisterProjectForm };

async function getMyProjectsAction() {
    const { setLoading, setData, clear } = storeProjectList.getState();
    setLoading(true);

    const res = await getMyProjectsApi();

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    } else if (res.code === 1) {
        setData(res.data ?? []);
    }

    setLoading(false);
}

async function registerProjectAction(form: RegisterProjectForm): Promise<boolean> {
    const { addItem } = storeProjectList.getState();

    const res = await registerProjectApi(form);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1 && res.data) {
        addItem(res.data);
        notify.success("Đăng ký đề tài thành công");
        return true;
    }

    return false;
}

async function deleteProjectAction(id: string) {
    const { removeById } = storeProjectList.getState();

    const res = await deleteProjectApi(id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        removeById(id);
        notify.success("Xóa đề tài thành công");
    }
}
