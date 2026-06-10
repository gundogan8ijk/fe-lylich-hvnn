import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { ProjectExternalPublicDetail, ProjectExternalPublicList } from "./project-external-public-type";

export const getPublicProjectExternalsApi = async (
    params?: URLSearchParams
): Promise<ApiResponse<ProjectExternalPublicList>> => {
    try {
        const response = await api.get("/Public/ProjectExternals", { params });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getPublicProjectExternalByIdApi = async (
    id: string
): Promise<ApiResponse<ProjectExternalPublicDetail>> => {
    try {
        const response = await api.get(`/Public/ProjectExternals/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
