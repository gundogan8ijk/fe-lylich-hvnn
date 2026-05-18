import { ApiResponse } from "@/types/result-typeConfig";
import { api } from "./axios-service-config";
import { DepartmentDetail, DepartmentList, DisciplineList, Disciplines } from "@/types/department-type";
import { success, fail } from "@/lib/response-helper";
import axios from "axios";

export { getDepartmentsListApi, getByIdDepartmentsApi,getListDisciplineApi }

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

const getByIdDepartmentsApi = async (id: string): Promise<ApiResponse<DepartmentDetail>> => {
    try {
        const departmentDetailUrl = `/Departments/${id}`;
        const response = await api.get(departmentDetailUrl);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server",);
        }

        return fail();
    }
};

const getListDisciplineApi = async (id: string): Promise<ApiResponse<DisciplineList>> => {
    try {
        const ListDisciplineUrl = `/Departments/${id}/disciplines`;
        const response = await api.get(ListDisciplineUrl);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Không thể kết nối đến server",);
        }

        return fail();
    }
};