import { notify } from "@/components/utils/Notify";
import { getErrorMessage } from "@/lib/response-helper";
import { deleteEducationApi, registerEducationApi, RegisterEducationForm, updateEducationApi, UpdateEducationForm } from "@/_services/education-ser";
import { storeLecturer } from "@/stores/store-item/lecturer-store";

export {
    registerEducationAction, deleteEducationAction,updateEducationAction
}

async function registerEducationAction(educationForm: RegisterEducationForm) {

    const { addEducation } = storeLecturer.getState();

    const res = await registerEducationApi(educationForm);
    if (res.code === -1) notify.error(getErrorMessage(res.message, res.errors));

    if (res.data !== null) {
        addEducation(res.data);
        notify.success("them bang cap thanh cong")
    }
}

async function deleteEducationAction(id: string) {

    const { deleteEducation } = storeLecturer.getState();

    const res = await deleteEducationApi(id);
    if (res.code === -1) notify.error(getErrorMessage(res.message, res.errors));

    else {
        deleteEducation(id);
        notify.success("xóa thành công")
    }

}

async function updateEducationAction(payload: UpdateEducationForm) {
    const { updateEducation } = storeLecturer.getState();

    const res = await updateEducationApi(payload);
    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    if (res.data !== null) {
        updateEducation(res.data);
        notify.success("Cập nhật bằng cấp thành công");
    }
}