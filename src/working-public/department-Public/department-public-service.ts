import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import {  DepartmentMembersListPublic, DepartmentPublicDetail, DepartmentPublicList, DisciplineOfDepartmentPublicList, DisciplineDetailPublic, DisciplineCoursePublicList } from "./department-public-type";

export {
    //detail
    getByIdDepartmentPublicApi,
    //list
    getDepartmentsListPublicApi, getListDisciplineByDepartmentIdApiPublic, getListMemberByDepartmentIdApiPublic,
    getPublicDepartmentsListApi,
    getPublicDisciplineDetailApi, getListCourseByPublicDisciplineApi, getListMemberByPublicDisciplineApi
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

const getPublicDepartmentsListApi = async (
    params?: URLSearchParams

): Promise<ApiResponse<DepartmentPublicList>> => {
    try {
        const departmentListUrl = "/Public/Departments";
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
        const departmentDetailUrl = `/departments/public/${id}`;
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
        const ListDisciplineUrl = `/departments/public/${id}/disciplines`;
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
        const ListMemberUrl = `/departments/public/${id}/members`;
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

const getPublicDisciplineDetailApi = async (departmentId: string, id: string): Promise<ApiResponse<DisciplineDetailPublic>> => {
    try {
        const url = `/departments/public/${departmentId}/disciplines/${id}`;
        const response = await api.get(url);

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }

        return fail();
    }
};

const getListCourseByPublicDisciplineApi = async (departmentId: string, id: string, param: URLSearchParams): Promise<ApiResponse<DisciplineCoursePublicList>> => {
    try {
        const url = `/departments/public/${departmentId}/disciplines/${id}/courses`;
        const response = await api.get(url, { params: param });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }

        return fail();
    }
};

const getListMemberByPublicDisciplineApi = async (departmentId: string, id: string, param: URLSearchParams): Promise<ApiResponse<DepartmentMembersListPublic>> => {
    try {
        const url = `/departments/public/${departmentId}/disciplines/${id}/members`;
        const response = await api.get(url, { params: param });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }

        return fail();
    }
};