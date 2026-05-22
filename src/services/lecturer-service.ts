import { ApiResponse } from "@/types/base-type/result-typeConfig";
import {  DepartmentList, DisciplineList, MemberList } from "@/types/department-type";
import { success, fail } from "@/lib/response-helper";
import axios from "axios";
import { api } from "./base-ser/axios-service-config";
import { Lecturer } from "@/types/lecurer-type";

export { getLecturerMeApi,getDepartmentsListApi, getListDisciplineApi, getListMemberApi }

const getDepartmentsListApi = async (
    params?: URLSearchParams

): Promise<ApiResponse<DepartmentList>> => {
    try {
        const departmentListUrl = "/Departments";
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

const getLecturerMeApi = async (): Promise<ApiResponse<Lecturer>> => {
    try {
        const detailUrl = `/lecturer/me`;
        const response = await api.get(detailUrl);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "đã có lỗi xảy ra",);
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
            return fail(data?.message || data?.detail || "Không thể kết nối đến server",);
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
            return fail(data?.message || data?.detail || "Không thể kết nối đến server",);
        }

        return fail();
    }
};