import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { api } from "@/_Common/_services/axios-service-config";
import { EducationLecturer } from "./Eduction-Lecturer-type";

export {
    registerEducationByLecturerApi, deleteEducationByLecturerApi, updateEducationByLecturerApi, submitEducationByLecturerApi
}

export type RegisterEducationByLecturerForm = {
    trainingName: string
    majorName: string
    degree: string
    graduatedAt: string
    proofUrl: string;
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

const deleteEducationByLecturerApi = async (id: string): Promise<ApiResponse<null>> => {
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
    degree: string
    graduatedAt: string
    proofUrl: string ;
}

const updateEducationByLecturerApi = async (payload: UpdateEducationByLecturerForm): Promise<ApiResponse<EducationLecturer>> => {
    try {
        const response = await api.put(`/educations/${payload.educationId}`, {
            trainingName: payload.trainingName,
            majorName: payload.majorName,
            degree: payload.degree,
            graduatedAt: payload.graduatedAt,
            proofUrl: payload.proofUrl || null
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


const submitEducationByLecturerApi = async (
    id: string
): Promise<ApiResponse<EducationLecturer>> => {
    try {
        const response = await api.put(`/educations/${id}/submit`, {});

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }

        return fail();
    }
};