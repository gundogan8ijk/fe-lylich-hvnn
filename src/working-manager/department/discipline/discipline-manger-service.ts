import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from '@/_Common/_services/axios-service-config';
import { 
    RenameDisciplineRequest, 
    RenameCodeDisciplineRequest, 
    UpdateDescribeDisciplineRequest, 
    UpdateTotalCreditsDisciplineRequest,
    AddCourseRequest,
    AddDisciplineRequest
} from "./discipline-manger-type";

export const renameDisciplineApi = async (departmentId: string, id: string, data: RenameDisciplineRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${departmentId}/disciplines/${id}/name`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const renameCodeDisciplineApi = async (departmentId: string, id: string, data: RenameCodeDisciplineRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${departmentId}/disciplines/${id}/code`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const updateDescribeDisciplineApi = async (departmentId: string, id: string, data: UpdateDescribeDisciplineRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${departmentId}/disciplines/${id}/describe`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const updateTotalCreditsDisciplineApi = async (departmentId: string, id: string, data: UpdateTotalCreditsDisciplineRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/departments/${departmentId}/disciplines/${id}/total-credits`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const deleteDisciplineApi = async (departmentId: string, id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/departments/${departmentId}/disciplines/${id}`, {});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const toggleDisciplineVisibilityApi = async (departmentId: string, id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.patch(`/departments/${departmentId}/disciplines/${id}/visibility`, {});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const addCourseDisciplineApi = async (id: string, data: AddCourseRequest): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post(`/disciplines/${id}/courses`, data);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const addDisciplineApi = async (departmentId: string, data: AddDisciplineRequest): Promise<ApiResponse<string>> => {
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
