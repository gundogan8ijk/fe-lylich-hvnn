import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { ProjectExternalMangerItemResponse, ProjectExternalManagerDetailResponse } from "./project-external-manager-type";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { success, fail } from "@/_lib/response-helper";

export const getListProjectExternalManagerApi = async (): Promise<ApiResponse<ProjectExternalMangerItemResponse[]>> => {
    try {
        const response = await api.get(`/manager/project-external/list`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getProjectExternalDetailManagerApi = async (id: string): Promise<ApiResponse<ProjectExternalManagerDetailResponse>> => {
    try {
        const response = await api.get(`/manager/project-external/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const verifyProjectExternalManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/project-external/${id}/verify`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const rejectProjectExternalManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/project-external/${id}/reject`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const togglePublishProjectExternalManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/project-external/${id}/toggle-publish`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
