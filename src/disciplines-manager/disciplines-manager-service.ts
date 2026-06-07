import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from "../_Common/_services/axios-service-config";
import { AddDisciplineRequest } from "./disciplines-manager-type";

export {
    addDisciplineApi
}

const addDisciplineApi = async (departmentId: string, data: AddDisciplineRequest): Promise<ApiResponse<string>> => {
    try {
        const response = await api.post(`/departments/${departmentId}/disciplines`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};
