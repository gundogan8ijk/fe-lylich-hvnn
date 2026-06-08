import { notify } from "@/_components/utils/Notify";
import { getErrorMessage } from "@/_lib/response-helper";
import { backToDraftEducationApi, deleteEducationByLecturerApi, registerEducationByLecturerApi, RegisterEducationByLecturerForm, submitEducationByLecturerApi, updateEducationByLecturerApi, UpdateEducationByLecturerForm } from "./Education-Lecturer-ser";
import { storeLecturerProfile } from '@/working-Lecturer/profile/infor/Lecturer-profile-store';

export {
    registerEducationByLecturerAction, deleteEducationByLecturerAction, updateEducationAction, submitEducationAction, backToDraftEducationAction
}

async function registerEducationByLecturerAction(educationForm: RegisterEducationByLecturerForm) {

    const { addEducation } = storeLecturerProfile.getState();

    const res = await registerEducationByLecturerApi(educationForm);
    if (res.code === -1) notify.error(getErrorMessage(res.message, res.errors));

    if (res.data !== null) {
        addEducation(res.data);
        notify.success("them bang cap thanh cong")
    }
}

async function deleteEducationByLecturerAction(id: string) {

    const { deleteEducation } = storeLecturerProfile.getState();

    const res = await deleteEducationByLecturerApi(id);
    if (res.code === -1) notify.error(getErrorMessage(res.message, res.errors));

    else {
        deleteEducation(id);
        notify.success("xóa thành công")
    }

}

async function updateEducationAction(payload: UpdateEducationByLecturerForm) {
    const { updateEducation } = storeLecturerProfile.getState();

    const res = await updateEducationByLecturerApi(payload);
    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    if (res.data !== null) {
        updateEducation(res.data);
        notify.success("Cập nhật bằng cấp thành công");
    }
}

async function submitEducationAction(id: string) {
    const { updateEducation } = storeLecturerProfile.getState();

    const res = await submitEducationByLecturerApi(id);

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    if (res.data) {
        updateEducation(res.data);
        notify.success("Đã gửi duyệt học vấn");
    }
}

async function backToDraftEducationAction(id: string) {
    const { updateEducation } = storeLecturerProfile.getState();

    const res = await backToDraftEducationApi(id);

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    if (res.data) {
        updateEducation(res.data);
        notify.success("Chuyển về trạng thái nháp thành công");
    }
}