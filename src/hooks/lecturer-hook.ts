import { notify } from '@/components/utils/Notify'
import { deleteLecturerFileApi, getLecturerMeApi, updateLecturerFieldApi } from "@/services/lecturer-service";
import { storeLecturer } from "@/stores/store-item/lecturer-store";
import { Gender, Lecturer } from '@/types/lecurer-type';

export {
    getAcLecturer,
    lastNameUpdateAction, firstNameUpdateAction, birthDateUpdateAction, cCCDUpdateAction,
    genderUpdateAction, emailUpdateAction, websiteUpdateAction,
    deleteLecturerFile, deleteAvatarAction,deleteWebsiteAction,deleteEmailAction
}

// 1. Hàm lấy thông tin giảng viên giữ nguyên
async function getAcLecturer() {
    const { setLoading, setData, setNull } = storeLecturer.getState();
    setLoading(true);
    const res = await getLecturerMeApi();
    if (res.code === 1 && res.data) setData(res.data);
    else setNull();
    setLoading(false);
}

/**
 * 💡 Hàm CORE GENERIC chạy chung cho tất cả các action update trường lẻ
 */
async function updateLecturerField<TResponse, K extends keyof Lecturer>(
    field: K,
    value: Lecturer[K],
    storeKey: K,
    endpoint: string,
    successMessage: string,
    extract: (res: TResponse) => Lecturer[K] // Hàm để lấy đúng trường dữ liệu từ API trả về
) {
    const { setField } = storeLecturer.getState();

    // 💡 SỬA Ở ĐÂY: Truyền đúng 3 tham số đơn lẻ như hàm gốc yêu cầu
    const res = await updateLecturerFieldApi<TResponse>(
        field,
        value,
        endpoint
    );

    if (res.code === -1 || res.data == null) {
        notify.error(res.message);
        return;
    }

    // Lấy giá trị mới thông qua hàm extract bóc tách dữ liệu
    const newValue = extract(res.data);

    // Cập nhật vào Zustand Store
    setField(storeKey, newValue);

    notify.success(successMessage);
}


async function deleteLecturerFile<K extends keyof Lecturer>(
    storeKey: K,
    endpoint: string,
    successMessage: string
) {
    const { setNullField } = storeLecturer.getState();

    const res = await deleteLecturerFileApi(endpoint);

    if (res.code === -1) {
        notify.error(res.message);
        return;
    }

    setNullField(storeKey);

    notify.success(successMessage);
}

/**
 * 2. Các Action giờ chỉ cần gọi hàm generic ở trên, siêu ngắn gọn!
 */

async function lastNameUpdateAction(lastName: string) {
    await updateLecturerField<{ lastName: string }, "lastName">(
        "lastName",
        lastName,
        "lastName",
        "/lecturer/update-last-name", // Thay bằng đường dẫn API thực tế của bạn
        "Cập nhật họ thành công",
        (res) => res.lastName
    );
}

async function firstNameUpdateAction(firstName: string) {
    await updateLecturerField<{ firstName: string }, "firstName">(
        "firstName",
        firstName,
        "firstName",
        "/lecturer/update-first-name",
        "Cập nhật tên thành công",
        (res) => res.firstName
    );
}

async function birthDateUpdateAction(birthDate: string) {
    await updateLecturerField<{ birthDate: string }, "birthDate">(
        "birthDate",
        birthDate,
        "birthDate",
        "/lecturer/update-birthdate",
        "Cập nhật ngày sinh thành công",
        (res) => res.birthDate
    );
}

async function cCCDUpdateAction(citizenIdentificationCard: string) {
    await updateLecturerField<{ cccd: string }, "cccd">(
        "cccd",
        citizenIdentificationCard,
        "cccd",
        "/lecturer/update-cccd",
        "Cập nhật CCCD thành công",
        (res) => res.cccd
    );
}

async function genderUpdateAction(gender: Gender) {
    await updateLecturerField<{ gender: Gender }, "gender">(
        "gender",
        gender,
        "gender",
        "/lecturer/update-gender",
        "Cập nhật giới tính thành công",
        (res) => res.gender
    );
}

async function emailUpdateAction(email: string) {
    await updateLecturerField<{ email: string }, "email">(
        "email",
        email,
        "email",
        "/lecturer/update-email",
        "Cập nhật email thành công",
        (res) => res.email
    );
}

async function websiteUpdateAction(website: string) {
    await updateLecturerField<{ website: string }, "website">(
        "website",
        website,
        "website",
        "/lecturer/update-website",
        "Cập nhật website thành công",
        (res) => res.website
    );
}

async function deleteAvatarAction() {
    await deleteLecturerFile(
        "avatarUrl",
        "/lecturer/delete-avatar",
        "Xóa ảnh đại diện thành công"
    );
}


async function deleteWebsiteAction() {
    await deleteLecturerFile(
        "website",
        "/lecturer/delete-website",
        "Xóa website thành công"
    );
}


async function deleteEmailAction() {
    await deleteLecturerFile(
        "email",
        "/lecturer/delete-email",
        "Xóa email thành công"
    );
}