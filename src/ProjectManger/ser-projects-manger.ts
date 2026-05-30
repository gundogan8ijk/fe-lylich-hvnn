import { api } from "@/_services/axios-service-config"
import { ApiResponse } from "@/_types/result-typeConfig"
import { ProjectManagerDetailRecord } from "@/ProjectManger/type-detail-projects-manger"
import { fail, success } from "@/_lib/response-helper"
import axios from "axios"
import { MangerProjectItems, MangerProjectItemsList } from "./type-list-projects-manger"

export {
    //comon
    deleteManagerProjectApi,
    //list
    createProjectApi,getMangerProjectListApi,
    //detail
    getProjectManagerDetailApi
}

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
