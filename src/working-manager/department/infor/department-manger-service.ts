import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { AddDepartmentRequest, AddDisciplineRequest, ChangeOfficeLocationRequest, DepartmentMembersListPublic, DepartmentPublicDetail, DepartmentPublicList, DisciplineOfDepartmentPublicList, RenameCodeDepartmentRequest, RenameDepartmentRequest, UpdateAvatarDepartmentRequest, UpdateDescribeDepartmentRequest, AddMemberRequest, UpdateMemberPositionRequest } from "./department-manger-type";

export {
    //detail
    getByIdDepartmentPublicApi,
    //list
    getDepartmentsListPublicApi, getListDisciplineByDepartmentIdApiPublic, getListMemberByDepartmentIdApiPublic,
    //add
    addDepartmentApi,
    addDisciplineApi,
    //update
    renameDepartmentApi, renameCodeDepartmentApi, updateDescribeDepartmentApi, changeOfficeLocationApi, clearOfficeLocationApi, updateAvatarDepartmentApi, removeAvatarDepartmentApi,
    //member
    addMemberDepartmentApi, removeMemberDepartmentApi, updateMemberPositionDepartmentApi,
    //management
    deleteDepartmentApi, toggleDepartmentVisibilityApi
}



const addDepartmentApi = async (data: AddDepartmentRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post("/departments", data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

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

const renameDepartmentApi = async (id: string, data: RenameDepartmentRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${id}/name`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const renameCodeDepartmentApi = async (id: string, data: RenameCodeDepartmentRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${id}/code`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const updateDescribeDepartmentApi = async (id: string, data: UpdateDescribeDepartmentRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${id}/describe`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const changeOfficeLocationApi = async (id: string, data: ChangeOfficeLocationRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${id}/office-location`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const clearOfficeLocationApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/departments/${id}/office-location`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const updateAvatarDepartmentApi = async (id: string, data: UpdateAvatarDepartmentRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${id}/avatar`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const removeAvatarDepartmentApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/departments/${id}/avatar`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const addMemberDepartmentApi = async (id: string, data: AddMemberRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post(`/departments/${id}/members`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const removeMemberDepartmentApi = async (departmentId: string, lecturerId: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/departments/${departmentId}/members/${lecturerId}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const updateMemberPositionDepartmentApi = async (departmentId: string, lecturerId: string, data: UpdateMemberPositionRequest): Promise<ApiResponse<null>> => {
    try {
        const formData = new FormData();
        formData.append("newPosition", data.newPosition);
        if (data.disciplineId) formData.append("disciplineId", data.disciplineId);
        if (data.joinedAt) formData.append("joinedAt", data.joinedAt);

        const response = await api.put(`/departments/${departmentId}/members/${lecturerId}/position`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
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

const deleteDepartmentApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/departments/${id}`,{});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

const toggleDepartmentVisibilityApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.patch(`/departments/${id}/visibility`,{});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};