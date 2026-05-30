import { ApiResponse } from "@/_types/result-typeConfig";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { api } from "@/_services/axios-service-config";
import { EducationLecturer } from "./Eduction-Lecturer-type";

export {
    registerEducationByLecturerApi,deleteEducationByLecturerApi,updateEducationByLecturerApi
}

export type RegisterEducationByLecturerForm = {
    trainingName: string
    majorName: string
    degree: number
    graduatedAt: string
}

const registerEducationByLecturerApi = async (education: RegisterEducationByLecturerForm): Promise<ApiResponse<EducationLecturer>> => {
    try {
        const detailUrl = `/educations/register`;
        const response = await api.post(detailUrl, education);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteEducationByLecturerApi = async (id : string): Promise<ApiResponse<null>> => {
    try {
        const detailUrl = `/educations/${id}`;
        await api.delete(detailUrl);

        return success(null);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export type UpdateEducationByLecturerForm = {
    educationId: string
    trainingName: string
    majorName: string
    degree: number
    graduatedAt: string
}

const updateEducationByLecturerApi = async (payload: UpdateEducationByLecturerForm): Promise<ApiResponse<EducationLecturer>> => {
    try {
        const response = await api.put(`/educations/${payload.educationId}`, {
            trainingName: payload.trainingName,
            majorName: payload.majorName,
            degree: payload.degree,
            graduatedAt: payload.graduatedAt,
        });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};
