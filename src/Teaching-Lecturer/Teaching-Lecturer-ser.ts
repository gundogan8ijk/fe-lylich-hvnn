import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from "@/_Common/_services/axios-service-config";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { GetDetailTeachingSubjectResponse, DisciplineCourseDto } from "./Teaching-Lecturer-type";

export const getTeachingDetailApi = async (): Promise<ApiResponse<GetDetailTeachingSubjectResponse>> => {
    try {
        const res = await api.get('/teaching-subjects/detail');
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export const getDisciplineCoursesApi = async (): Promise<ApiResponse<DisciplineCourseDto[]>> => {
    try {
        const res = await api.get('/teaching-subjects/discipline-courses');
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export const addInternalCourseApi = async (courseId: string): Promise<ApiResponse<void>> => {
    try {
        await api.post('/teaching-subjects', { courseId });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export const removeInternalCourseApi = async (courseId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/teaching-subjects/${courseId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export const addExternalCourseApi = async (disciplineName: string): Promise<ApiResponse<void>> => {
    try {
        await api.post('/teaching-subjects/external', { disciplineName });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export const removeExternalCourseApi = async (externalSubjectId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/teaching-subjects/external/${externalSubjectId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};
