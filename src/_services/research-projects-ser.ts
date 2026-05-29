import { ApiResponse } from "@/_types/base-type/result-typeConfig";
import { MangerProjectItems, MangerProjectItemsList, ResearchProjectItems } from "@/_types/research-projects-type";
import { api } from "./base-ser/axios-service-config";
import { fail, success } from "@/lib/response-helper";
import axios from "axios";
import { ProjectManagerDetailRecord } from "@/_types/project-detail-manger";

export {
    getListProjectMeApi, registerProjectApi, deleteResearchProjectApi, getMangerProjectListApi,
    createProjectApi,deleteManagerProjectApi,
    getProjectManagerDetailApi
}

const getListProjectMeApi = async (): Promise<ApiResponse<ResearchProjectItems[]>> => {
    try {
        const detailUrl = "/research-projects/me"
        const res = await api.get(detailUrl);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export type RegisterProjectForm = {
    Title: string
    Describe: string
    DisciplineIds: string[]
}

const registerProjectApi = async (form: RegisterProjectForm): Promise<ApiResponse<ResearchProjectItems>> => {
    try {
        const detailUrl = "/research-projects/register"
        const res = await api.post(detailUrl, form);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
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

const getMangerProjectListApi = async (params?: URLSearchParams)
    : Promise<ApiResponse<MangerProjectItemsList>> => {
    try {
        const detailUrl = "/research-projects/manger"
        const response = await api.get(detailUrl, {
            params: params
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


export type CreateProjectForm = {
    Title: string
    Describe: string
    Level: string
    DisciplineIds: string[]
    LeaderId: string | null
    StartDate: string  
    EndDate: string
}

const createProjectApi = async (form: CreateProjectForm): Promise<ApiResponse<MangerProjectItems>> => {
    try {
        const detailUrl = "/research-projects/create"
        const res = await api.post(detailUrl, form);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};


const deleteManagerProjectApi = async (
    id: string
): Promise<ApiResponse<void>> => {
    try {
        const url = `/research-projects/management/${id}`;
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


const getProjectManagerDetailApi = async (
    id: string
): Promise<ApiResponse<ProjectManagerDetailRecord>> => {
    try {
        const response = await api.get(
            `/research-projects/${id}/manager`
        );

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;

            return fail(
                data?.message || data?.detail,
                data?.errors
            );
        }

        return fail();
    }
};