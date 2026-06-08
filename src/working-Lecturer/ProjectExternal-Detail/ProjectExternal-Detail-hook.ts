import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import {
    getProjectExternalDetailApi,
    addInternalContributorApi,
    addExternalParticipantApi,
    removeInternalContributorApi,
    removeExternalParticipantApi,
    updateExternalParticipantApi,
    submitProjectExternalApi,
    deleteProjectExternalDetailApi,
    updateProjectExternalApi,
    removeDisciplineApi,
    addDisciplinesApi,
    updateInternalContributorApi,
    backToDraftProjectExternalApi,
} from "./ProjectExternal-Detail-ser";
import { storeProjectExternalDetail } from "./ProjectExternal-Detail-store";
import {
    AddInternalContributorForm,
    AddExternalParticipantForm,
    UpdateExternalParticipantForm,
    UpdateProjectExternalForm,
} from "./ProjectExternal-Detail-type";
import { redirect } from "next/navigation";

export {
    getProjectExternalDetailAction,
    removeInternalContributorAction,
    addInternalContributorAction,
    addExternalParticipantAction,
    removeExternalParticipantAction,
    updateExternalParticipantAction,
    submitProjectExternalAction,
    backToDraftProjectExternalAction,
    deleteProjectExternalAction,
    updateProjectExternalAction,
    removeDisciplineAction,
    addDisciplinesAction,
    updateInternalContributorAction,
    storeProjectExternalDetail,
};

async function getProjectExternalDetailAction(projectId: string) {
    const { setLoading, setData, clear } = storeProjectExternalDetail.getState();
    setLoading(true);

    const res = await getProjectExternalDetailApi(projectId);

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    } else if (res.code === 1 && res.data) {
        setData(res.data);
    }

    setLoading(false);
}

// Internal contributor
async function addInternalContributorAction(
    projectId: string,
    form: AddInternalContributorForm
) {
    const res = await addInternalContributorApi(projectId, form);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Thêm thành viên nội bộ thành công");
    await getProjectExternalDetailAction(projectId);
    return true;
}

async function updateInternalContributorAction(
    projectId: string,
    contributorId: string,
    role: string
) {
    const res = await updateInternalContributorApi(projectId, contributorId, role);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Cập nhật vai trò thành công");
    await getProjectExternalDetailAction(projectId);
    return true;
}

async function removeInternalContributorAction(projectId: string, contributorId: string) {
    const res = await removeInternalContributorApi(projectId, contributorId);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa thành viên nội bộ thành công");
    await getProjectExternalDetailAction(projectId);
    return true;
}

// External participant
async function addExternalParticipantAction(
    projectId: string,
    form: AddExternalParticipantForm
): Promise<boolean> {
    const res = await addExternalParticipantApi(projectId, form);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Thêm người tham gia bên ngoài thành công");
    await getProjectExternalDetailAction(projectId);
    return true;
}

async function removeExternalParticipantAction(projectId: string, participantId: string) {
    const res = await removeExternalParticipantApi(projectId, participantId);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa người tham gia thành công");
    await getProjectExternalDetailAction(projectId);
    return true;
}

async function updateExternalParticipantAction(
    projectId: string,
    participantId: string,
    form: UpdateExternalParticipantForm
) {
    const res = await updateExternalParticipantApi(projectId, participantId, form);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Cập nhật người tham gia thành công");
    await getProjectExternalDetailAction(projectId);
    return true;
}

// Submit, delete, update
async function submitProjectExternalAction() {
    const { data } = storeProjectExternalDetail.getState();
    if (!data) return;
    const res = await submitProjectExternalApi(data.id);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Gửi đề tài chờ duyệt thành công");
        await getProjectExternalDetailAction(data.id);
    }
}

async function backToDraftProjectExternalAction() {
    const { data } = storeProjectExternalDetail.getState();
    if (!data) return;
    const res = await backToDraftProjectExternalApi(data.id);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Chuyển về trạng thái nháp thành công");
        await getProjectExternalDetailAction(data.id);
    }
}

async function deleteProjectExternalAction() {
    const { data, clear } = storeProjectExternalDetail.getState();
    if (!data) return;
    const res = await deleteProjectExternalDetailApi(data.id);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Xóa đề tài thành công");
        clear();
        redirect("/lecturer/project-external");
    }
}

async function updateProjectExternalAction(
    projectId: string,
    form: UpdateProjectExternalForm
): Promise<boolean> {
    const res = await updateProjectExternalApi(projectId, form);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Cập nhật đề tài thành công");
    await getProjectExternalDetailAction(projectId);
    return true;
}

// Disciplines
async function addDisciplinesAction(projectId: string, disciplineIds: string[]): Promise<boolean> {
    if (disciplineIds.length === 0) {
        notify.warning("Chưa chọn lĩnh vực nào");
        return false;
    }
    const res = await addDisciplinesApi(projectId, disciplineIds);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success(`Thêm ${disciplineIds.length} lĩnh vực nghiên cứu thành công`);
    await getProjectExternalDetailAction(projectId);
    return true;
}

async function removeDisciplineAction(projectId: string, disciplineId: string): Promise<boolean> {
    const res = await removeDisciplineApi(projectId, disciplineId);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa lĩnh vực nghiên cứu thành công");
    await getProjectExternalDetailAction(projectId);
    return true;
}