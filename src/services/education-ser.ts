import { ApiResponse } from "@/types/base-type/result-typeConfig";
import { Education } from "@/types/educationType";
import { api } from "./base-ser/axios-service-config";
import { fail, success } from "@/lib/response-helper";
import axios from "axios";

export {
    registerEducationApi,deleteEducationApi,updateEducationApi
}


export type RegisterEducationForm = {
    trainingName: string
    majorName: string
    degree: number
    graduatedAt: string
}
const registerEducationApi = async (education: RegisterEducationForm): Promise<ApiResponse<Education>> => {
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

const deleteEducationApi = async (id : string): Promise<ApiResponse<null>> => {
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

export type UpdateEducationForm = {
    educationId: string
    trainingName: string
    majorName: string
    degree: number
    graduatedAt: string
}

const updateEducationApi = async (payload: UpdateEducationForm): Promise<ApiResponse<Education>> => {
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
