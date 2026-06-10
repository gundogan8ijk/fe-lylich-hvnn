import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { ArticlePublicDetail, ArticlePublicList } from "./article-public-type";

export const getPublicArticlesApi = async (
    params?: URLSearchParams
): Promise<ApiResponse<ArticlePublicList>> => {
    try {
        const response = await api.get("/Public/Articles", { params });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getPublicArticleByIdApi = async (
    id: string
): Promise<ApiResponse<ArticlePublicDetail>> => {
    try {
        const response = await api.get(`/Public/Articles/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
