import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import {  DepartmentMembersListPublic, DepartmentPublicDetail, DepartmentPublicList, DisciplineOfDepartmentPublicList } from "./department-public-type";

export {
    //detail
    getByIdDepartmentPublicApi,
    //list
    getDepartmentsListPublicApi, getListDisciplineByDepartmentIdApiPublic, getListMemberByDepartmentIdApiPublic,
}



const getDepartmentsListPublicApi = async (
    params?: URLSearchParams

): Promise<ApiResponse<DepartmentPublicList>> => {
    try {
        const departmentListUrl = "/Departments";
        const response = await api.get(departmentListUrl, {
            params: params
        });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }

        return fail();
    }
};

const getByIdDepartmentPublicApi = async (id: string): Promise<ApiResponse<DepartmentPublicDetail>> => {
    try {
        const departmentDetailUrl = `/Departments/${id}`;
        const response = await api.get(departmentDetailUrl);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }

        return fail();
    }
};

const getListDisciplineByDepartmentIdApiPublic = async (id: string, param: URLSearchParams): Promise<ApiResponse<DisciplineOfDepartmentPublicList>> => {
    try {
        const ListDisciplineUrl = `/Departments/${id}/disciplines`;
        const response = await api.get(ListDisciplineUrl, { params: param });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }

        return fail();
    }
};


const getListMemberByDepartmentIdApiPublic = async (id: string, param: URLSearchParams): Promise<ApiResponse<DepartmentMembersListPublic>> => {
    try {
        const ListMemberUrl = `/Departments/${id}/members`;
        const response = await api.get(ListMemberUrl, { params: param });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }

        return fail();
    }
};