import { ApiResponse } from "@/types/result-typeConfig";
import { api } from "./axios-service-config";
import { DepartmentList } from "@/types/department-type";
import { success, fail } from "@/lib/response-helper";
import axios from "axios";

export { getDepartmentsListApi }

const departmentListUrl = "/Departments";

const getDepartmentsListApi = async (
    params?: URLSearchParams

): Promise<ApiResponse<DepartmentList>> => {
    try {
        const response = await api.get(departmentListUrl, {
            params: params
        });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server",);
        }

        return fail();
    }
};