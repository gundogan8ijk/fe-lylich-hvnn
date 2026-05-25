import { ApiResponse } from "@/_types/base-type/result-typeConfig";
import { ResearchProjectItems } from "@/_types/research-projects-type";
import { api } from "./base-ser/axios-service-config";
import { fail, success } from "@/lib/response-helper";
import axios from "axios";

export {
    getListProjectMeApi,registerProjectApi,deleteResearchProjectApi
}

const getListProjectMeApi = async (): Promise<ApiResponse<ResearchProjectItems[]>> => {
    try {
        const detailUrl = "/research-projects/me"
        const res = await api.get(detailUrl);
        return success(res.data);
    } catch (error ) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail ,data?.errors);
        }
        return fail();
    }
};

export type RegisterProjectForm = {
    Title: string
    Describe: string
    DisciplineIds: string[]
}

const registerProjectApi = async (form:RegisterProjectForm): Promise<ApiResponse<ResearchProjectItems>> => {
    try {
        const detailUrl = "/research-projects/register"
        const res = await api.post(detailUrl,form);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail ,data?.errors);
        }
        return fail();
    }
};


const deleteResearchProjectApi = async (
    id: string
): Promise<ApiResponse<void>> => {
    try {
        const url = `/research-projects/${id}`;
        const res = await api.delete(url);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};