import { ApiResponse } from "@/_types/result-typeConfig";
import { api } from "../_services/axios-service-config";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { ProjectLecturerItems } from "./projects-lecturer-list-type";

export {
    getListProjectLecturerApi, registerListProjectLecturerApi, deleteListProjectLecturerApi
}

const getListProjectLecturerApi = async (): Promise<ApiResponse<ProjectLecturerItems[]>> => {
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

export type RegisterProjectLecturerForm = {
    Title: string
    Describe: string
    DisciplineIds: string[]
}

const registerListProjectLecturerApi = async (form: RegisterProjectLecturerForm): Promise<ApiResponse<ProjectLecturerItems>> => {
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


const deleteListProjectLecturerApi = async (
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



