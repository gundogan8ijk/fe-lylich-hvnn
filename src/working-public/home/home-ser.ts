import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import { api } from "@/_Common/_services/axios-service-config";
import axios from "axios";
import { PagedAwardsResponse, PublicActivitiesResponse } from "./home-type";

export { getPublicActivitiesApi, getRecentAwardsApi };

const getPublicActivitiesApi = async (
    params: URLSearchParams
): Promise<ApiResponse<PublicActivitiesResponse>> => {
    try {
        const response = await api.get("/public/activities", { params });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};

const getRecentAwardsApi = async (
    params: URLSearchParams
): Promise<ApiResponse<PagedAwardsResponse>> => {
    try {
        const response = await api.get("/public/awards/recent", { params });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.error);
        }
        return fail();
    }
};
