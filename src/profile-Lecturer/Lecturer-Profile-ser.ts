// lecturer-service.ts
import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from "@/_Common/_services/axios-service-config";
import { LecturerProfile, LecturersNameItems } from "./Profile-lecurer-type";

export {
    getLecturerProfileMeApi, putLecturerProfileApi, deleteLecturerProfileApi,
    //common
    getListLecturersNameApi
}

const getLecturerProfileMeApi = async (): Promise<ApiResponse<LecturerProfile>> => {
    try {
        const response = await api.get(`/lecturer/me`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const putLecturerProfileApi = async <T>(
    endpoint: string,
    payload: unknown
): Promise<ApiResponse<T>> => {
    try {
        const response = await api.put(endpoint, payload);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteLecturerProfileApi = async <T>(
    endpoint: string
): Promise<ApiResponse<T>> => {
    try {
        const response = await api.delete(endpoint);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};


const getListLecturersNameApi = async (search: string): Promise<ApiResponse<LecturersNameItems[]>> => {
    try {
        const detailUrl = "/lecturer/search-name-code"
        const res = await api.get(detailUrl, { params: { search: search } });
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};