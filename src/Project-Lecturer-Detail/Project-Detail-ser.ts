import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from "../_Common/_services/axios-service-config";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import {
    ProjectDetail,
    UpdateProjectForm,
    AddContributorForm,
    AddParticipantForm,
    UpdateParticipantForm,
    AddDisciplinesForm,
    UpdateDetailLinkForm,
} from "./Project-Detail-type";

export {
    getProjectDetailApi,
    updateProjectApi,
    updateProjectDetailLinkApi,
    submitProjectApi,
    cancelProjectApi,
    deleteProjectApi,
    addContributorApi,
    removeContributorApi,
    addDisciplinesApi,
    removeDisciplineApi,
    addParticipantApi,
    updateParticipantApi,
    removeParticipantApi,
};

// GET detail
const getProjectDetailApi = async (id: string): Promise<ApiResponse<ProjectDetail>> => {
    try {
        const res = await api.get(`/projects/${id}/lecturer`);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// PUT update basic info — /projects/{id}/lecturer
const updateProjectApi = async (id: string, form: UpdateProjectForm): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/projects/${id}/lecturer`, form);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// PUT update detail link — /projects/{id}/detail-link
const updateProjectDetailLinkApi = async (id: string, form: UpdateDetailLinkForm): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/projects/${id}/detail-link`, form);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// PUT submit — /projects/{id}/submit
const submitProjectApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/projects/${id}/submit`, {});
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// PUT cancel — /projects/{id}/cancel
const cancelProjectApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/projects/${id}/cancel`, {});
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// DELETE — /projects/{id}
const deleteProjectApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/projects/${id}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// POST contributor — /projects/{id}/contributors
const addContributorApi = async (id: string, form: AddContributorForm): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/projects/${id}/contributors`, {
            LecturerId: form.LecturerId,
            JoinedAt: form.JoinedAt,
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

// DELETE contributor — /projects/{id}/contributors/{contributorId}
const removeContributorApi = async (id: string, contributorId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/projects/${id}/contributors/${contributorId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// POST disciplines — /projects/{id}/disciplines
const addDisciplinesApi = async (id: string, form: AddDisciplinesForm): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/projects/${id}/disciplines`, { DisciplineIds: form.DisciplineIds });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// DELETE discipline — /projects/{id}/disciplines/{disciplineId}
const removeDisciplineApi = async (id: string, disciplineId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/projects/${id}/disciplines/${disciplineId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// POST participant — /projects/{id}/participants
const addParticipantApi = async (id: string, form: AddParticipantForm): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/projects/${id}/participants`, {
            FullName: form.FullName,
            Role: form.Role,
            Email: form.Email ?? null,
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

// PUT participant — /projects/{id}/participants/{participantId}
const updateParticipantApi = async (
    id: string,
    participantId: string,
    form: UpdateParticipantForm
): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/projects/${id}/participants/${participantId}`, {
            FullName: form.FullName,
            Role: form.Role,
            Email: form.Email ?? null,
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

// DELETE participant — /projects/{id}/participants/{participantId}
const removeParticipantApi = async (id: string, participantId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/projects/${id}/participants/${participantId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};
