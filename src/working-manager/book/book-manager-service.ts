import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { BookMangerItemResponse, BookManagerDetailResponse } from "./book-manager-type";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { success, fail } from "@/_lib/response-helper";

export const getListBookManagerApi = async (): Promise<ApiResponse<BookMangerItemResponse[]>> => {
    try {
        const response = await api.get(`/books/manager/list`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getBookDetailManagerApi = async (id: string): Promise<ApiResponse<BookManagerDetailResponse>> => {
    try {
        const response = await api.get(`/manager/book/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const verifyBookManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/book/${id}/verify`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const rejectBookManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/book/${id}/reject`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const togglePublishBookManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/book/${id}/toggle-publish`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
