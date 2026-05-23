import { success } from "@/lib/response-helper";
import { ApiResponse } from "@/types/base-type/result-typeConfig";
import { fail } from "assert";
import axios from "axios";
import { api } from "./axios-service-config";

export const updateFieldApi = async <T,TResponse>(url: string,body: T): Promise<ApiResponse<TResponse>> => {
    try {
        const response = await api.put(url, body);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail ||  "Không thể kết nối đến server");
        }

        return fail();
    }
};