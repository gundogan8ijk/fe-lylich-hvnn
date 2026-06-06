import { api } from "@/_Common/_services/axios-service-config"
import { ApiResponse } from "@/_Common/_types/result-typeConfig"
import { ProjectManagerDetailRecord } from "@/ProjectManger/type-detail-projects-manger"
import { fail, success } from "@/_lib/response-helper"
import axios from "axios"
import { MangerProjectItems, MangerProjectItemsList } from "./type-list-projects-manger"
import { ConfirmedStatus } from "@/_constants/base-constant"

export {
    //comon
    deleteManagerProjectApi,
    //list
    createProjectApi, getMangerProjectListApi,
    //detail
    getProjectManagerDetailApi, updateConfirmedProjectDetailApi, updateBaseInfoProjectMangerApi,
    addDisciplinesByMangerApi, deleteDisciplineByManagerApi, updateTimeEndProjectMangerApi
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

const updateConfirmedProjectDetailApi = async (id: string, confirmed: { confirmedStatus: ConfirmedStatus })
    : Promise<ApiResponse<null>> => {
    try {
        const detailUrl = `/research-projects/${id}/confirmed-status`
        const response = await api.put(detailUrl, confirmed);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};


export type UpdateBaseInfoProjectMangerForm = {
    Title: string
    Describe: string
    Level: string
    StartDate: string
    EndDate: string
}

const updateBaseInfoProjectMangerApi = async (id: string, form: UpdateBaseInfoProjectMangerForm): Promise<ApiResponse<null>> => {
    try {
        const detailUrl = `/research-projects/${id}/base-info`;

        const response = await api.put(detailUrl, form);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }

        return fail();
    }
};

const addDisciplinesByMangerApi = async (id: string, disciplineIds: string[]): Promise<ApiResponse<null>> => {
    try {
        const url = `/research-projects/${id}/disciplines`;

        const response = await api.put(url, { disciplineIds });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }

        return fail();
    }
};


const deleteDisciplineByManagerApi = async (
    id: string,
    disciplineId: string
): Promise<ApiResponse<null>> => {
    try {
        const url = `/research-projects/${id}/disciplines/${disciplineId}`;
        const response = await api.delete(url);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }

        return fail();
    }
};

const updateTimeEndProjectMangerApi = async (id: string, timeEnd: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.patch(`/research-projects/${id}/time-end`, { TimeEnd: timeEnd });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};
