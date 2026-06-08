import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { AwardManagerItemResponse, AwardDetailManagerResponse } from "./award-manager-type";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { success, fail } from "@/_lib/response-helper";

export const getListAwardManager = async (): Promise<ApiResponse<AwardManagerItemResponse[]>> => {
    try {
        const response = await api.get(`/awards/manager/list`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const getDetailAwardManager = async (id: string): Promise<ApiResponse<AwardDetailManagerResponse>> => {
    try {
        const response = await api.get(`/awards/manager/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const verifyAwardManager = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post(`/awards/${id}/verify`, {});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

export const cancelAwardManager = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post(`/awards/${id}/cancel`, {});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
