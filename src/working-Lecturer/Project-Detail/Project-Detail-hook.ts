import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage, getErrorMessage } from "@/_lib/response-helper";
import {
    getProjectDetailApi,
    updateProjectApi,
    updateProjectDetailLinkApi,
    submitProjectApi,
    cancelProjectApi,
    deleteProjectApi,
    addContributorApi,
    removeContributorApi,
    addDisciplinesApi,
    removeDisciplineApi,
    addParticipantApi,
    updateParticipantApi,
    removeParticipantApi,
} from "./Project-Detail-ser";
import { storeProjectDetail } from "./Project-Detail-store";
import {
    UpdateProjectForm,
    AddContributorForm,
    AddParticipantForm,
    UpdateParticipantForm,
    AddDisciplinesForm,
    UpdateDetailLinkForm,
} from "./Project-Detail-type";
import { redirect } from "next/navigation";

export {
    getProjectDetailAction,
    updateProjectAction,
    updateProjectDetailLinkAction,
    submitProjectAction,
    cancelProjectAction,
    deleteProjectAction,
    addContributorAction,
    removeContributorAction,
    addDisciplinesAction,
    removeDisciplineAction,
    addParticipantAction,
    updateParticipantAction,
    removeParticipantAction,
    storeProjectDetail,
};

// Reload helper
async function refreshDetail(id: string) {
    await getProjectDetailAction(id);
}

async function getProjectDetailAction(id: string) {
    const { setLoading, setData, clear } = storeProjectDetail.getState();
    setLoading(true);

    const res = await getProjectDetailApi(id);

    if (res.code !== 1) {
        notify.error(getErrorMessage(res.message, res.errors));
        clear();
    } else if (res.code === 1 && res.data) {
        setData(res.data);
    }

    setLoading(false);
}

// Update basic info
async function updateProjectAction(id: string, form: UpdateProjectForm): Promise<boolean> {
    const res = await updateProjectApi(id, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Cập nhật thông tin thành công");
    await refreshDetail(id);
    return true;
}

// Update detail link
async function updateProjectDetailLinkAction(id: string, form: UpdateDetailLinkForm): Promise<boolean> {
    const res = await updateProjectDetailLinkApi(id, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Cập nhật link tài liệu thành công");
    await refreshDetail(id);
    return true;
}

// Submit
async function submitProjectAction(id: string): Promise<boolean> {
    const res = await submitProjectApi(id);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Gửi phê duyệt đề tài thành công");
    await refreshDetail(id);
    return true;
}

// Cancel (về Draft)
async function cancelProjectAction(id: string): Promise<boolean> {
    const res = await cancelProjectApi(id);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Hủy yêu cầu phê duyệt thành công");
    await refreshDetail(id);
    return true;
}

// Delete → redirect
async function deleteProjectAction(id: string) {
    const { clear } = storeProjectDetail.getState();
    const res = await deleteProjectApi(id);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Xóa đề tài thành công");
        clear();
        redirect("/lecturer/research-projects");
    }
}

// Contributor
async function addContributorAction(id: string, form: AddContributorForm): Promise<boolean> {
    const res = await addContributorApi(id, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Thêm thành viên thành công");
    await refreshDetail(id);
    return true;
}

async function removeContributorAction(id: string, contributorId: string): Promise<boolean> {
    const res = await removeContributorApi(id, contributorId);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa thành viên thành công");
    await refreshDetail(id);
    return true;
}

// Disciplines
async function addDisciplinesAction(id: string, form: AddDisciplinesForm): Promise<boolean> {
    if (form.DisciplineIds.length === 0) {
        notify.warning("Chưa chọn lĩnh vực nào");
        return false;
    }
    const res = await addDisciplinesApi(id, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success(`Thêm ${form.DisciplineIds.length} lĩnh vực thành công`);
    await refreshDetail(id);
    return true;
}

async function removeDisciplineAction(id: string, disciplineId: string): Promise<boolean> {
    const res = await removeDisciplineApi(id, disciplineId);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa lĩnh vực thành công");
    await refreshDetail(id);
    return true;
}

// Participants
async function addParticipantAction(id: string, form: AddParticipantForm): Promise<boolean> {
    const res = await addParticipantApi(id, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Thêm người tham gia thành công");
    await refreshDetail(id);
    return true;
}

async function updateParticipantAction(
    id: string,
    participantId: string,
    form: UpdateParticipantForm
): Promise<boolean> {
    const res = await updateParticipantApi(id, participantId, form);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Cập nhật người tham gia thành công");
    await refreshDetail(id);
    return true;
}

async function removeParticipantAction(id: string, participantId: string): Promise<boolean> {
    const res = await removeParticipantApi(id, participantId);
    if (res.code !== 1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    notify.success("Xóa người tham gia thành công");
    await refreshDetail(id);
    return true;
}
