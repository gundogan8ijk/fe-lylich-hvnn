// lecturer-service.ts
import { ApiResponse } from "@/_types/base-type/result-typeConfig";
import { success, fail } from "@/lib/response-helper";
import axios from "axios";
import { api } from "./base-ser/axios-service-config";
import { Lecturer, LecturersNameItems } from "@/_types/lecurer-type";

export {
    getLecturerMeApi, putLecturerApi, deleteLecturerApi,
    getListLecturersNameApi
}

const getLecturerMeApi = async (): Promise<ApiResponse<Lecturer>> => {
    try {
        const response = await api.get(`/lecturer/me`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Đã có lỗi xảy ra");
        }
        return fail();
    }
};

const putLecturerApi = async <T>(
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

const deleteLecturerApi = async <T>(
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
            return fail(data?.message || data?.detail || "Đã có lỗi xảy ra");
        }
        return fail();
    }
};