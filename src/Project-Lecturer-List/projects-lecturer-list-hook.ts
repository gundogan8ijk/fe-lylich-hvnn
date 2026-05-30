import { notify } from "@/components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import { storeProjectLecturerList } from "./projects-lecturer-list-store";
import { deleteListProjectLecturerApi, getListProjectLecturerApi, registerListProjectLecturerApi, RegisterProjectLecturerForm } from "./projects-lecturer-list-ser";

export {
    //trang chu lectuer
    getListProjectLecturerAction, registerListProjectLecturerAction, deleteListProjectLecturerAction,
    //trang chu manger

}

async function getListProjectLecturerAction() {
    const { setLoading, setData, clear } = storeProjectLecturerList.getState();
    setLoading(true);

    const res = await getListProjectLecturerApi();

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    }
    else if (res.code === 1) {
        setData(res.data ?? []);
    }

    setLoading(false);
}


async function registerListProjectLecturerAction(form: RegisterProjectLecturerForm): Promise<boolean> {
    const { addItem } = storeProjectLecturerList.getState();

    const res = await registerListProjectLecturerApi(form);

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

async function deleteListProjectLecturerAction(id: string) {
    const { removeById } = storeProjectLecturerList.getState();

    const res = await deleteListProjectLecturerApi(id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    }
    else if (res.code === 1) {
        removeById(id);
        notify.success("Xóa đề tài thành công");
    }

}
