import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import {
    getListProjectExternalApi,
    registerProjectExternalApi,
    deleteProjectExternalApi,
    RegisterProjectExternalForm,
} from "./ProjectExternal-List-ser";
import { storeProjectExternalList } from "./ProjectExternal-List-store";

export {
    getListProjectExternalAction,
    registerProjectExternalAction,
    deleteProjectExternalAction,
};

async function getListProjectExternalAction() {
    const { setLoading, setData, clear } = storeProjectExternalList.getState();
    setLoading(true);

    const res = await getListProjectExternalApi();

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    } else if (res.code === 1) {
        setData(res.data ?? []);
    }

    setLoading(false);
}

async function registerProjectExternalAction(form: RegisterProjectExternalForm): Promise<boolean> {
    const { addItem } = storeProjectExternalList.getState();

    const res = await registerProjectExternalApi(form);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1 && res.data) {
        addItem(res.data);
        notify.success("Đăng ký đề tài ngoài thành công");
        return true;
    }

    return false;
}

async function deleteProjectExternalAction(id: string) {
    const { removeById } = storeProjectExternalList.getState();

    const res = await deleteProjectExternalApi(id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        removeById(id);
        notify.success("Xóa đề tài thành công");
    }
}