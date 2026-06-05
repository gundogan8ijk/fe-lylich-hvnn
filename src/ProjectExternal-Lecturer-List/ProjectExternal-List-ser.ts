import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from "../_Common/_services/axios-service-config";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { ProjectExternalItem } from "./ProjectExternal-List-type";

export {
    getListProjectExternalApi,
    registerProjectExternalApi,
    deleteProjectExternalApi,
};

export type RegisterProjectExternalForm = {
    Title: string;
    Describe: string;
    CertificateUrl: string;
    Organization: string;
    CompletionAt: string;   // "YYYY-MM-DD"
    Level: string;
    Evaluation?: string;
    Role: string;
    DetailUrl?: string;
};

const getListProjectExternalApi = async (): Promise<ApiResponse<ProjectExternalItem[]>> => {
    try {
        const res = await api.get("/external-projects/my");
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const registerProjectExternalApi = async (
    form: RegisterProjectExternalForm
): Promise<ApiResponse<ProjectExternalItem>> => {
    try {
        const res = await api.post("/external-projects/register", form);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteProjectExternalApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        const res = await api.delete(`/external-projects/${id}`);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};