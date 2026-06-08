import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import {
    getArticleDetailByLecturerApi,
    addInternalContributorApi,
    addExternalContributorApi,
    removeInternalContributorApi,
    removeExternalContributorApi,
    updateExternalContributorApi,
    submitArticleApi,
    deleteArticleByLecturerApi,
    updateArticleByLecturerApi,
    removeDisciplineApi,
    addDisciplinesApi,
    backToDraftArticleApi,
} from "./ArticleDetail-Lecturer-ser";
import { storeArticleDetail } from "./ArticleDetail-Lecturer-store";
import {
    AddInternalContributorForm,
    AddExternalContributorForm,
    UpdateExternalContributorForm,
    UpdateArticleByLecturerForm,
} from "./ArticleDetail-Lecturer-type";
import { redirect } from "next/navigation";

export {
    getArticleDetailAction,
    removeInternalContributorAction, addInternalContributorAction,
    addExternalContributorAction, removeExternalContributorAction, updateExternalContributorAction,
    submitArticleAction,
    backToDraftArticleAction,
    deleteArticleAction, updateArticleByLecturerAction,
    removeDisciplineAction, addDisciplinesAction,
    storeArticleDetail,
}

// ── Get Article Detail ─────────────────────────────────────────────────────
async function getArticleDetailAction(articleId: string) {
    const { setLoading, setData, clear } = storeArticleDetail.getState();
    setLoading(true);

    const res = await getArticleDetailByLecturerApi(articleId);

    if (res.code !== 1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    } else if (res.code === 1 && res.data) {
        setData(res.data ?? null);
    }

    setLoading(false);
}

// ── Add Internal Contributor ───────────────────────────────────────────────
async function addInternalContributorAction(
    articleId: string,
    form: AddInternalContributorForm
) {
    const res = await addInternalContributorApi(articleId, form);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }

    if (res.code === 1) {
        notify.success("Thêm tác giả thành công");
        await getArticleDetailAction(articleId);
        return true;
    }

    return false;
}
// ── Add External Contributor ───────────────────────────────────────────────
async function addExternalContributorAction(
    articleId: string,
    form: AddExternalContributorForm
): Promise<boolean> {
    const res = await addExternalContributorApi(articleId, form);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1) {
        notify.success("Thêm tác giả bên ngoài thành công");
        await getArticleDetailAction(articleId);
        return true;
    }

    return false;
}

// ── Remove Internal Contributor ────────────────────────────────────────────
async function removeInternalContributorAction(
    articleId: string,
    contributorId: string
): Promise<boolean> {
    const res = await removeInternalContributorApi(articleId, contributorId);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1) {
        notify.success("Xóa tác giả thành công");
        await getArticleDetailAction(articleId);
        return true;
    }

    return false;
}

// ── Remove External Contributor ────────────────────────────────────────────
async function removeExternalContributorAction(
    articleId: string,
    externalContributorId: string
): Promise<boolean> {
    const res = await removeExternalContributorApi(articleId, externalContributorId);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1) {
        notify.success("Xóa tác giả bên ngoài thành công");
        await getArticleDetailAction(articleId);
        return true;
    }

    return false;
}

// ── Update External Contributor ────────────────────────────────────────────
async function updateExternalContributorAction(
    articleId: string,
    externalContributorId: string,
    form: UpdateExternalContributorForm
): Promise<boolean> {
    const res = await updateExternalContributorApi(articleId, externalContributorId, form);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1) {
        notify.success("Cập nhật tác giả thành công");
        await getArticleDetailAction(articleId);
        return true;
    }

    return false;
}

async function deleteArticleAction(): Promise<void> {
    const { data, clear } = storeArticleDetail.getState();
    if (!data) return;

    const res = await deleteArticleByLecturerApi(data.id);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success('Xóa bài báo thành công');
        clear();
        redirect('/lecturer/article');
    }
}

async function submitArticleAction(): Promise<void> {
    const { data } = storeArticleDetail.getState();
    if (!data) return;

    const res = await submitArticleApi(data.id);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success('Gửi bài báo chờ duyệt thành công');
        await getArticleDetailAction(data.id);
    }
}

async function backToDraftArticleAction(): Promise<void> {
    const { data } = storeArticleDetail.getState();
    if (!data) return;

    const res = await backToDraftArticleApi(data.id);

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success('Chuyển bài báo về nháp thành công');
        await getArticleDetailAction(data.id);
    }
}

async function updateArticleByLecturerAction(
    articleId: string,
    form: UpdateArticleByLecturerForm
): Promise<boolean> {
    const res = await updateArticleByLecturerApi(articleId, form)

    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors))
        return false
    } else if (res.code === 1) {
        notify.success('Cập nhật bài báo thành công')
        await getArticleDetailAction(articleId)
        return true
    }

    return false
}

// Add discipline
async function addDisciplinesAction(
    articleId: string,
    disciplineIds: string[]
): Promise<boolean> {
    if (disciplineIds.length === 0) {
        notify.warning("Chưa chọn lĩnh vực nào");
        return false;
    }
    const res = await addDisciplinesApi(articleId, disciplineIds);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    if (res.code === 1) {
        notify.success(`Thêm ${disciplineIds.length} lĩnh vực nghiên cứu thành công`);
        await getArticleDetailAction(articleId);
        return true;
    }
    return false;
}


// Remove discipline
async function removeDisciplineAction(articleId: string, disciplineId: string): Promise<boolean> {
    const res = await removeDisciplineApi(articleId, disciplineId);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    if (res.code === 1) {
        notify.success("Xóa lĩnh vực nghiên cứu thành công");
        await getArticleDetailAction(articleId);
        return true;
    }
    return false;
}