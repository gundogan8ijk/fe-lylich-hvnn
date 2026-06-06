import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from "@/_Common/_services/axios-service-config";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import {
    ProjectExternalDetail,
    AddInternalContributorForm,
    AddExternalParticipantForm,
    UpdateExternalParticipantForm,
    UpdateProjectExternalForm,
} from "./ProjectExternal-Detail-type";

export {
    getProjectExternalDetailApi,
    addInternalContributorApi,
    removeInternalContributorApi,
    updateInternalContributorApi,
    addExternalParticipantApi,
    removeExternalParticipantApi,
    updateExternalParticipantApi,
    submitProjectExternalApi,
    deleteProjectExternalDetailApi,
    updateProjectExternalApi,
    removeDisciplineApi,
    addDisciplinesApi,
    backToDraftProjectExternalApi,
};

// Get detail
const getProjectExternalDetailApi = async (id: string): Promise<ApiResponse<ProjectExternalDetail>> => {
    try {
        const res = await api.get(`/external-projects/${id}/lecturer`);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// Internal contributors
const addInternalContributorApi = async (
    projectId: string,
    form: AddInternalContributorForm
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/external-projects/${projectId}/contributors`, {
            lecturerId: form.lecturerId,
            role: form.role,
        });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const removeInternalContributorApi = async (
    projectId: string,
    contributorId: string
): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/external-projects/${projectId}/contributors/${contributorId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateInternalContributorApi = async (
    projectId: string,
    contributorId: string,
    role: string
): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/external-projects/${projectId}/contributors/${contributorId}`, { role });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// External participants
const addExternalParticipantApi = async (
    projectId: string,
    form: AddExternalParticipantForm
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/external-projects/${projectId}/participants`, {
            fullName: form.fullName,
            role: form.role,
            email: form.email ?? null,
        });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const removeExternalParticipantApi = async (
    projectId: string,
    participantId: string
): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/external-projects/${projectId}/participants/${participantId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateExternalParticipantApi = async (
    projectId: string,
    participantId: string,
    form: UpdateExternalParticipantForm
): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/external-projects/${projectId}/participants/${participantId}`, {
            fullName: form.fullName,
            role: form.role,
            email: form.email ?? null,
        });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// Submit, update, delete
const submitProjectExternalApi = async (projectId: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/external-projects/${projectId}/submit`, {});
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const backToDraftProjectExternalApi = async (projectId: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/projects-external/${projectId}/back-to-draft`, {});
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteProjectExternalDetailApi = async (projectId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/external-projects/${projectId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateProjectExternalApi = async (
    projectId: string,
    form: UpdateProjectExternalForm
): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/external-projects/${projectId}/lecturer`, form);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// Disciplines
const addDisciplinesApi = async (
    projectId: string,
    disciplineIds: string[]
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/external-projects/${projectId}/disciplines`, { disciplineIds });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const removeDisciplineApi = async (
    projectId: string,
    disciplineId: string
): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/external-projects/${projectId}/disciplines/${disciplineId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};