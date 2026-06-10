import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { BookPublicDetail, BookPublicList } from "./book-public-type";

export const getPublicBooksApi = async (
    params?: URLSearchParams
): Promise<ApiResponse<BookPublicList>> => {
    try {
        const response = await api.get("/Public/Books", { params });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getPublicBookByIdApi = async (
    id: string
): Promise<ApiResponse<BookPublicDetail>> => {
    try {
        const response = await api.get(`/Public/Books/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
