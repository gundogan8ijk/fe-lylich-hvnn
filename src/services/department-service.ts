import { ApiResponse } from "@/types/base-type/result-typeConfig";
import { DepartmentDetail, DepartmentList, DisciplineList, MemberList } from "@/types/department-type";
import { success, fail } from "@/lib/response-helper";
import axios from "axios";
import { api } from "./base-ser/axios-service-config";

export { getDepartmentsListApi, getByIdDepartmentsApi, getListDisciplineApi ,getListMemberApi}

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
            return fail(data?.message || data?.detail , data.error);
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
            return fail(data?.message || data?.detail , data.error);
        }

        return fail();
    }
};

const getListDisciplineApi = async (id: string, param: URLSearchParams): Promise<ApiResponse<DisciplineList>> => {
    try {
        const ListDisciplineUrl = `/Departments/${id}/disciplines`;
        const response = await api.get(ListDisciplineUrl, { params: param });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail , data.error);
        }

        return fail();
    }
};


const getListMemberApi = async (id: string, param: URLSearchParams): Promise<ApiResponse<MemberList>> => {
    try {
        const ListMemberUrl = `/Departments/${id}/members`;
        const response = await api.get(ListMemberUrl, { params: param });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail , data.error);
        }

        return fail();
    }
};