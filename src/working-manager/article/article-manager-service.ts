import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { ArticleMangerItemResponse, ArticleManagerDetailResponse } from "./article-manager-type";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { success, fail } from "@/_lib/response-helper";

export const getListArticleManagerApi = async (): Promise<ApiResponse<ArticleMangerItemResponse[]>> => {
    try {
        const response = await api.get(`/articles/manager/list`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getArticleDetailManagerApi = async (id: string): Promise<ApiResponse<ArticleManagerDetailResponse>> => {
    try {
        const response = await api.get(`/manager/article/${id}/detail`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const verifyArticleManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/article/${id}/verify`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const rejectArticleManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/article/${id}/reject`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const togglePublishArticleManagerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/manager/article/${id}/toggle-publish`,{});
        return success(undefined);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
