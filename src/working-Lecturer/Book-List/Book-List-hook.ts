import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import {
    getMyBooksApi,
    registerBookApi,
    deleteBookApi,
    RegisterBookForm,
} from "./Book-List-ser";
import { storeBookList } from "./Book-List-store";

export {
    getMyBooksAction,
    registerBookAction,
    deleteBookAction,
};

async function getMyBooksAction() {
    const { setLoading, setData, clear } = storeBookList.getState();
    setLoading(true);

    const res = await getMyBooksApi();

    if (res.code !== 1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    } else if (res.code === 1) {
        setData(res.data ?? []);
    }

    setLoading(false);
}

async function registerBookAction(form: RegisterBookForm): Promise<boolean> {
    const { addItem } = storeBookList.getState();

    const res = await registerBookApi(form);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1 && res.data) {
        addItem(res.data);
        notify.success("Đăng ký sách thành công");
        return true;
    }

    return false;
}

async function deleteBookAction(id: string) {
    const { removeById } = storeBookList.getState();

    const res = await deleteBookApi(id);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        removeById(id);
        notify.success("Xóa sách thành công");
    }
}