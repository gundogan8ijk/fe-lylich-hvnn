import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { LecturerPublicDetail, LecturerPublicList } from "./lecturer-public-type";

export const getPublicLecturersApi = async (
    params?: URLSearchParams
): Promise<ApiResponse<LecturerPublicList>> => {
    try {
        const response = await api.get("/Public/Lecturers", { params });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getPublicLecturerByIdApi = async (
    id: string
): Promise<ApiResponse<LecturerPublicDetail>> => {
    try {
        const response = await api.get(`/Public/Lecturers/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
