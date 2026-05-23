import { ApiResponse } from "@/types/base-type/result-typeConfig";
import { success, fail } from "@/lib/response-helper";
import axios from "axios";
import { api } from "./base-ser/axios-service-config";
import { Gender, Lecturer } from "@/types/lecurer-type";

export {
    getLecturerMeApi, lastNameApiUpdate, firstNameApiUpdate, birthDateApiUpdate, cCCDApiUpdate,
    genderApiUpdate, emailApiUpdate, updateLecturerFieldApi, deleteLecturerFileApi
}

const updateLecturerFieldApi = async <T>(field: keyof Lecturer, value: Lecturer[keyof Lecturer], endpoint: string)
    : Promise<ApiResponse<T>> => {
    try {
        const response = await api.put(endpoint, { [field]: value });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server");
        }

        return fail();
    }
};

const deleteLecturerFileApi = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
        // Gọi API DELETE tới endpoint được truyền vào
        const response = await api.delete(endpoint);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server");
        }
        return fail();
    }
};

const getLecturerMeApi = async (): Promise<ApiResponse<Lecturer>> => {
    try {
        const detailUrl = `/lecturer/me`;
        const response = await api.get(detailUrl);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "đã có lỗi xảy ra",);
        }

        return fail();
    }
};


const lastNameApiUpdate = async (lastname: string): Promise<ApiResponse<UpdateLastNameType>> => {
    try {
        const detailUrl = `/lecturer/update-lastname`;
        const response = await api.put(detailUrl, { lastName: lastname });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server");
        }

        return fail();
    }
};

const firstNameApiUpdate = async (firstName: string): Promise<ApiResponse<UpdateFirstNameType>> => {
    try {
        const detailUrl = `/lecturer/update-firstname`;
        const response = await api.put(detailUrl, { firstName: firstName });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server");
        }

        return fail();
    }
};

export type UpdateBirthDateType = {
    id: string;
    birthDate: string;
};
export type UpdateFirstNameType = {
    id: string;
    firstName: string;
};
export type UpdateLastNameType = {
    id: string;
    lastName: string;
};

const birthDateApiUpdate = async (birthDate: string): Promise<ApiResponse<UpdateBirthDateType>> => {
    try {
        const detailUrl = `/lecturer/update-birthdate`;
        const response = await api.put(detailUrl, { birthDate });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server");
        }
        return fail();
    }
};

export type UpdateCCCDType = {
    id: string;
    cccd: string;
};

const cCCDApiUpdate = async (cCCD: string): Promise<ApiResponse<UpdateCCCDType>> => {
    try {
        const detailUrl = "/lecturer/update-citizen-identification-card";

        const response = await api.put(detailUrl, { cCCD: cCCD });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server");
        }
        return fail();
    }
};

type UpdateGenderType = {
    id: string; gender: Gender;
};

const genderApiUpdate = async (gender: Gender): Promise<ApiResponse<UpdateGenderType>> => {
    try {
        const detailUrl = "/lecturer/update-gender";

        const response = await api.put(detailUrl, {
            gender: gender
        });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server");
        }
        return fail();
    }
};

type UpdateEmailType = {
    id: string,
    email: string
}

const emailApiUpdate = async (
    email: string
): Promise<ApiResponse<UpdateEmailType>> => {
    try {
        const detailUrl = `/lecturer/update-email`;

        const response = await api.put(detailUrl, { email: email });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server");
        }
        return fail();
    }
};

