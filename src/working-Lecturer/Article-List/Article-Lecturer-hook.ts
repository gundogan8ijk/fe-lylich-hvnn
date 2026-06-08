import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import { deleteArticleLecturerApi, getListArticleLecturerApi, RegisterArticleForm, registerArticleLecturerApi } from "./Article-Lecturer-ser";
import { storeArticleLecturerList } from "./Article-Lecturer-store";


export {
    getListArticleLecturerAction,
    registerArticleLecturerAction,
    deleteArticleLecturerAction,
}

// ── Get List ───────────────────────────────────────────────────────────────
async function getListArticleLecturerAction() {
    const { setLoading, setData, clear } = storeArticleLecturerList.getState();
    setLoading(true);

    const res = await getListArticleLecturerApi();

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    } else if (res.code === 1) {
        setData(res.data ?? []);
    }

    setLoading(false);
}

// ── Register ───────────────────────────────────────────────────────────────
async function registerArticleLecturerAction(form: RegisterArticleForm): Promise<boolean> {
    const { addItem } = storeArticleLecturerList.getState();

    const res = await registerArticleLecturerApi(form);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1 && res.data) {
        addItem(res.data);
        notify.success("Đăng ký bài báo thành công");
    }

    return true;
}

// ── Delete ─────────────────────────────────────────────────────────────────
async function deleteArticleLecturerAction(id: string) {
    const { removeById } = storeArticleLecturerList.getState();

    const res = await deleteArticleLecturerApi(id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        removeById(id);
        notify.success("Xóa bài báo thành công");
    }
}