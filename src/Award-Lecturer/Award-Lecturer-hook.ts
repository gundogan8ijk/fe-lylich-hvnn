import { notify } from "@/_components/utils/Notify";
import { getErrorMessage } from "@/_lib/response-helper";
import { 
    deleteAwardByLecturerApi, 
    registerAwardByLecturerApi, 
    RegisterAwardByLecturerForm, 
    submitAwardByLecturerApi, 
    updateAwardByLecturerApi, 
    UpdateAwardByLecturerForm 
} from "./Award-Lecturer-ser"; // Thay đổi đường dẫn đến file service Award của bạn
import { storeLecturerProfile } from "@/profile-Lecturer/Lecturer-profile-store";

export {
    registerAwardByLecturerAction, 
    deleteAwardByLecturerAction, 
    updateAwardAction,submitAwardAction
    
};

async function registerAwardByLecturerAction(awardForm: RegisterAwardByLecturerForm) {
    const { addAward } = storeLecturerProfile.getState();

    const res = await registerAwardByLecturerApi(awardForm);
    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    if (res.data !== null) {
        addAward(res.data);
        notify.success("Thêm giải thưởng thành công");
    }
}

async function deleteAwardByLecturerAction(id: string) {
    const { deleteAward } = storeLecturerProfile.getState();

    const res = await deleteAwardByLecturerApi(id);
    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
    } else {
        deleteAward(id);
        notify.success("Xóa giải thưởng thành công");
    }
}

async function updateAwardAction(payload: UpdateAwardByLecturerForm) {
    const { updateAward } = storeLecturerProfile.getState();

    const res = await updateAwardByLecturerApi(payload);
    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    if (res.data !== null) {
        updateAward(res.data);
        notify.success("Cập nhật giải thưởng thành công");
    }
}


async function submitAwardAction(id: string) {
    const { updateAward } = storeLecturerProfile.getState(); 

    const res = await submitAwardByLecturerApi(id);

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    if (res.data) {
        updateAward(res.data);
        notify.success("Đã gửi duyệt giải thưởng"); // Đổi câu thông báo
    }
}
