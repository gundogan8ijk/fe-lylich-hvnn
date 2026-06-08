import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { BackgroundByManagerResponse,  CreateLecturerRequest, LecturerListPublic } from "./lecturer-manger-type";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { success, fail } from "@/_lib/response-helper";

export const getListLecturerManagerApi = async (
    params?: URLSearchParams
): Promise<ApiResponse<LecturerListPublic>> => {
    try {
        const response = await api.get(`/lecturers/manager/list`, {
            params: params,
        });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const createLecturerApi = async (
    data: CreateLecturerRequest
): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post(`/lecturer`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getLecturerBackgroundManagerApi = async (id: string): Promise<ApiResponse<BackgroundByManagerResponse>> => {
    try {
        const response = await api.get(`/manager/lecturer/${id}/background`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const deleteLecturerManagerApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/manager/lecturer/${id}`,{});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const toggleLecturerVisibilityManagerApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/manager/lecturer/${id}/toggle-visibility`,{});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
