import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { ResearchProjectPublicDetail, ResearchProjectPublicList } from "./research-project-public-type";

export const getPublicResearchProjectsApi = async (
    params?: URLSearchParams
): Promise<ApiResponse<ResearchProjectPublicList>> => {
    try {
        const response = await api.get("/Public/ResearchProjects", { params });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getPublicResearchProjectByIdApi = async (
    id: string
): Promise<ApiResponse<ResearchProjectPublicDetail>> => {
    try {
        const response = await api.get(`/Public/ResearchProjects/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
