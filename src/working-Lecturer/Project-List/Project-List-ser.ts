import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from '@/_Common/_services/axios-service-config';
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { ProjectItem, RegisterProjectForm } from "./Project-List-type";

export {
    getMyProjectsApi,
    registerProjectApi,
    deleteProjectApi,
};

export type { RegisterProjectForm };

const getMyProjectsApi = async (): Promise<ApiResponse<ProjectItem[]>> => {
    try {
        const res = await api.get("/projects/my");
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const registerProjectApi = async (
    form: RegisterProjectForm
): Promise<ApiResponse<ProjectItem>> => {
    try {
        const res = await api.post("/projects/register", form);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteProjectApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        const res = await api.delete(`/projects/${id}`);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};
