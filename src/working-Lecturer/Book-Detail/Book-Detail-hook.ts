import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import {
    getBookDetailApi,
    addInternalContributorApi,
    addExternalContributorApi,
    removeInternalContributorApi,
    removeExternalContributorApi,
    updateExternalContributorApi,
    submitBookApi,
    deleteBookDetailApi,
    updateBookApi,
    addDisciplinesApi,
    removeDisciplineApi,
    backToDraftBookApi,
} from "./Book-Detail-ser";
import { storeBookDetail } from "./Book-Detail-store";
import {
    AddInternalContributorForm,
    AddExternalContributorForm,
    UpdateExternalContributorForm,
    UpdateBookForm,
} from "./Book-Detail-type";
import { redirect } from "next/navigation";

export {
    getBookDetailAction,
    addInternalContributorAction,
    removeInternalContributorAction,
    addExternalContributorAction,
    removeExternalContributorAction,
    updateExternalContributorAction,
    submitBookAction,
    backToDraftBookAction,
    deleteBookAction,
    updateBookAction,
    addDisciplinesAction,
    removeDisciplineAction,
    storeBookDetail,
};

async function getBookDetailAction(bookId: string) {
    const { setLoading, setData, clear } = storeBookDetail.getState();
    setLoading(true);

    const res = await getBookDetailApi(bookId);

    if (res.code !== 1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    } else if (res.code === 1 && res.data) {
        setData(res.data);
    }

    setLoading(false);
}

// Internal contributor
async function addInternalContributorAction(
    bookId: string,
    form: AddInternalContributorForm
): Promise<boolean> {
    const res = await addInternalContributorApi(bookId, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Thêm tác giả nội bộ thành công");
    await getBookDetailAction(bookId);
    return true;
}

async function removeInternalContributorAction(
    bookId: string,
    contributorId: string
): Promise<boolean> {
    const res = await removeInternalContributorApi(bookId, contributorId);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa tác giả nội bộ thành công");
    await getBookDetailAction(bookId);
    return true;
}

// External contributor
async function addExternalContributorAction(
    bookId: string,
    form: AddExternalContributorForm
): Promise<boolean> {
    const res = await addExternalContributorApi(bookId, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Thêm tác giả bên ngoài thành công");
    await getBookDetailAction(bookId);
    return true;
}

async function removeExternalContributorAction(
    bookId: string,
    externalContributorId: string
): Promise<boolean> {
    const res = await removeExternalContributorApi(bookId, externalContributorId);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa tác giả bên ngoài thành công");
    await getBookDetailAction(bookId);
    return true;
}

async function updateExternalContributorAction(
    bookId: string,
    externalContributorId: string,
    form: UpdateExternalContributorForm
): Promise<boolean> {
    const res = await updateExternalContributorApi(bookId, externalContributorId, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Cập nhật tác giả bên ngoài thành công");
    await getBookDetailAction(bookId);
    return true;
}

// Submit, delete, update
async function submitBookAction() {
    const { data } = storeBookDetail.getState();
    if (!data) return;
    const res = await submitBookApi(data.id);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Gửi sách chờ duyệt thành công");
        await getBookDetailAction(data.id);
    }
}

async function backToDraftBookAction() {
    const { data } = storeBookDetail.getState();
    if (!data) return;
    const res = await backToDraftBookApi(data.id);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Chuyển về trạng thái nháp thành công");
        await getBookDetailAction(data.id);
    }
}

async function deleteBookAction() {
    const { data, clear } = storeBookDetail.getState();
    if (!data) return;
    const res = await deleteBookDetailApi(data.id);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Xóa sách thành công");
        clear();
        redirect("/lecturer/book");
    }
}

async function updateBookAction(bookId: string, form: UpdateBookForm): Promise<boolean> {
    const res = await updateBookApi(bookId, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Cập nhật sách thành công");
    await getBookDetailAction(bookId);
    return true;
}

// Disciplines
async function addDisciplinesAction(bookId: string, disciplineIds: string[]): Promise<boolean> {
    if (disciplineIds.length === 0) {
        notify.warning("Chưa chọn lĩnh vực nào");
        return false;
    }
    const res = await addDisciplinesApi(bookId, disciplineIds);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success(`Thêm ${disciplineIds.length} lĩnh vực nghiên cứu thành công`);
    await getBookDetailAction(bookId);
    return true;
}

async function removeDisciplineAction(bookId: string, disciplineId: string): Promise<boolean> {
    const res = await removeDisciplineApi(bookId, disciplineId);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa lĩnh vực nghiên cứu thành công");
    await getBookDetailAction(bookId);
    return true;
}