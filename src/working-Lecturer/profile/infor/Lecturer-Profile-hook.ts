// lecturer-action.ts
import { notify } from '@/_components/utils/Notify'
import { getErrorMessage } from '@/_lib/response-helper';
import { Gender } from '@/_constants/base-constant';
import { storeLecturerProfile } from './Lecturer-profile-store';
import { deleteLecturerProfileApi, getLecturerProfileMeApi, putLecturerProfileApi } from './Lecturer-Profile-ser';
import { LecturerProfile } from './Profile-lecurer-type';

export {
    getAcLecturer,
    lastNameUpdateAction, firstNameUpdateAction, birthDateUpdateAction, cCCDUpdateAction,avatarUpdateAction,
    genderUpdateAction, emailUpdateAction, websiteUpdateAction, phoneUpdateAction,addressUpdateAction,
    deleteAvatarAction, deleteWebsiteAction, deleteEmailAction,deletePhoneAction,deleteAddressAction
}

export type UpdatePhoneRequest = {
    countryCode: string;
    number: string;
    extension?: string | null;
};

export type AddressRequest = {
    street?: string
    ward?: string
    district?: string
    city?: string
    province?: string
    country?: string
    zipCode?: string
    comments?: string
}

async function getAcLecturer() {
    const { setLoading, setData, setNull } = storeLecturerProfile.getState();
    setLoading(true);
    const res = await getLecturerProfileMeApi();
    if (res.code === 1 && res.data) setData(res.data);
    else setNull();
    setLoading(false);
}

async function updateLecturerField<TResponse, K extends keyof LecturerProfile>(options: {
    endpoint: string;
    payload: unknown;
    storeKey: K;
    successMessage: string;
    extract: (res: TResponse) => LecturerProfile[K];
}) {
    const { setField } = storeLecturerProfile.getState();

    const res = await putLecturerProfileApi<TResponse>(options.endpoint, options.payload);

    if (res.code === -1 || res.data == null) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    setField(options.storeKey, options.extract(res.data));
    notify.success(options.successMessage);
}

async function deleteLecturerField<K extends keyof LecturerProfile>(options: {
    endpoint: string;
    storeKey: K;
    successMessage: string;
}) {
    const { setNullField } = storeLecturerProfile.getState();

    const res = await deleteLecturerProfileApi(options.endpoint);

    if (res.code === -1) {
        notify.error(getErrorMessage(res.message, res.errors));
        return;
    }

    setNullField(options.storeKey);
    notify.success(options.successMessage);
}

async function lastNameUpdateAction(lastName: string) {
    await updateLecturerField<{ lastName: string }, "lastName">({
        endpoint: "/lecturer/update-last-name",
        payload: { lastName },
        storeKey: "lastName",
        successMessage: "Cập nhật họ thành công",
        extract: (res) => res.lastName
    });
}

async function firstNameUpdateAction(firstName: string) {
    await updateLecturerField<{ firstName: string }, "firstName">({
        endpoint: "/lecturer/update-first-name",
        payload: { firstName },
        storeKey: "firstName",
        successMessage: "Cập nhật tên thành công",
        extract: (res) => res.firstName
    });
}

async function birthDateUpdateAction(birthDate: string) {
    await updateLecturerField<{ birthDate: string }, "birthDate">({
        endpoint: "/lecturer/update-birthdate",
        payload: { birthDate },
        storeKey: "birthDate",
        successMessage: "Cập nhật ngày sinh thành công",
        extract: (res) => res.birthDate
    });
}

async function cCCDUpdateAction(citizenIdentificationCard: string) {
    await updateLecturerField<{ cccd: string }, "cccd">({
        endpoint: "/lecturer/update-citizen-identification-card",
        payload: { cCCD: citizenIdentificationCard },
        storeKey: "cccd",
        successMessage: "Cập nhật CCCD thành công",
        extract: (res) => res.cccd
    });
}

async function genderUpdateAction(gender: Gender) {
    await updateLecturerField<{ gender: Gender }, "gender">({
        endpoint: "/lecturer/update-gender",
        payload: { gender },
        storeKey: "gender",
        successMessage: "Cập nhật giới tính thành công",
        extract: (res) => res.gender
    });
}

async function emailUpdateAction(email: string) {
    await updateLecturerField<{ email: string }, "email">({
        endpoint: "/lecturer/update-email",
        payload: { email },
        storeKey: "email",
        successMessage: "Cập nhật email thành công",
        extract: (res) => res.email
    });
}

async function websiteUpdateAction(website: string) {
    await updateLecturerField<{ website: string }, "website">({
        endpoint: "/lecturer/update-website",
        payload: { website },
        storeKey: "website",
        successMessage: "Cập nhật website thành công",
        extract: (res) => res.website
    });
}

async function phoneUpdateAction(phoneData: UpdatePhoneRequest) {
    await updateLecturerField<{ phoneNumber: string }, "phoneNumber">({
        endpoint: "/lecturer/update-phone",
        payload: {
            countryCode: phoneData.countryCode || "+84",
            number: phoneData.number,
            extension: phoneData.extension || null
        },
        storeKey: "phoneNumber",
        successMessage: "Cập nhật số điện thoại thành công",
        extract: (res) => res.phoneNumber
    });
}

async function addressUpdateAction(addressData: AddressRequest) {
    await updateLecturerField<{ address: string }, "address">({
        endpoint: "/lecturer/update-address",
        payload: {
            street: addressData.street,
            ward: addressData.ward || null,
            district: addressData.district || null,
            city: addressData.city || null,
            province: addressData.province || null,
            country: addressData.country || "Vietnam",
            zipCode: addressData.zipCode || "700000",
            comments: addressData.comments || null
        },
        storeKey: "address",
        successMessage: "Cập nhật địa chỉ thành công",
        extract: (res) => res.address
    });
}



async function deleteWebsiteAction() {
    await deleteLecturerField({
        endpoint: "/lecturer/delete-website",
        storeKey: "website",
        successMessage: "Xóa website thành công"
    });
}

async function deleteAddressAction() {
    await deleteLecturerField({
        endpoint: "/lecturer/delete-address",
        storeKey: "address",
        successMessage: "Xóa địa chỉ thành công"
    });
}

async function deletePhoneAction() {
    await deleteLecturerField({
        endpoint: "/lecturer/delete-phone",
        storeKey: "phoneNumber",
        successMessage: "Xóa số điện thoại thành công"
    });
}

async function deleteEmailAction() {
    await deleteLecturerField({
        endpoint: "/lecturer/delete-email",
        storeKey: "email",
        successMessage: "Xóa email thành công"
    });
}


async function avatarUpdateAction(avatarUrl: string) {
    await updateLecturerField<{ avatarUrl: string }, "avatarUrl">({
        endpoint: "/lecturer/update-avatar",
        payload: { avatarUrl },
        storeKey: "avatarUrl",
        successMessage: "Cập nhật ảnh đại diện thành công",
        extract: (res) => res.avatarUrl
    });
}

async function deleteAvatarAction() {
    await deleteLecturerField({
        endpoint: "/lecturer/delete-avatar-url",
        storeKey: "avatarUrl",
        successMessage: "Xóa ảnh đại diện thành công"
    });
}