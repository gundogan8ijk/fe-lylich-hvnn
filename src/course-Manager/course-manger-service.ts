import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";
import { api } from "../_Common/_services/axios-service-config";
import { CourseDetailPublic } from "./course-manger-type";

export const getCourseDetailApi = async (id: string): Promise<ApiResponse<CourseDetailPublic>> => {
    try {
        const response = await api.get(`/courses/${id}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const updateCourseNameApi = async (id: string, newName: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/courses/${id}/name`, { newName });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const updateCourseDescribeApi = async (id: string, newDescribe: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/courses/${id}/describe`, { newDescribe });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const updateCourseCreditsApi = async (id: string, theory: number, practice: number): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/courses/${id}/credits`, { theory, practice });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const toggleCourseVisibilityApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/courses/${id}/toggle-visibility`,{});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};

export const deleteCourseApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/courses/${id}`,{});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data.error);
        }
        return fail();
    }
};
