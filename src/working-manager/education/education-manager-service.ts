import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { EducationManagerItemResponse, EducationManagerDetailResponse } from "./education-manager-type";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { success, fail } from "@/_lib/response-helper";

export const getListEducationManagerApi = async (): Promise<ApiResponse<EducationManagerItemResponse[]>> => {
    try {
        const response = await api.get(`/educations/manager/list`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getEducationDetailManagerApi = async (id: string): Promise<ApiResponse<EducationManagerDetailResponse>> => {
    try {
        const response = await api.get(`/educations/manager/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const verifyEducationManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/educations/${id}/verify`, {});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const cancelEducationManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/educations/${id}/cancel`, {});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
