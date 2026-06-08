import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from "@/_Common/_services/axios-service-config";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import {
    ArticleDetailItem,
    AddInternalContributorForm,
    AddExternalContributorForm,
    UpdateExternalContributorForm,
    UpdateArticleByLecturerForm,
} from "./ArticleDetail-Lecturer-type";

export {
    getArticleDetailByLecturerApi,
    addInternalContributorApi,removeInternalContributorApi,
    addExternalContributorApi,  removeExternalContributorApi,updateExternalContributorApi,
    submitArticleApi,
    backToDraftArticleApi,
    deleteArticleByLecturerApi,updateArticleByLecturerApi,
    removeDisciplineApi,addDisciplinesApi
}

// ── Get Article Detail ─────────────────────────────────────────────────────
const getArticleDetailByLecturerApi = async (articleId: string): Promise<ApiResponse<ArticleDetailItem>> => {
    try {
        const res = await api.get(`/articles/${articleId}/lecturer`);
        return success(res.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Add Internal Contributor ───────────────────────────────────────────────
const addInternalContributorApi = async (
    articleId: string,
    form: AddInternalContributorForm
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/articles/${articleId}/contributors`, {
            lecturerId: form.lecturerId,
            role: form.role,
        });
        return success(void 0);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Add External Contributor ───────────────────────────────────────────────
const addExternalContributorApi = async (
    articleId: string,
    form: AddExternalContributorForm
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/articles/${articleId}/external-contributors`, {
            fullName: form.fullName,
            role: form.role,
            email: form.email ?? null,
        });
        return success(void 0);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Remove Internal Contributor ────────────────────────────────────────────
const removeInternalContributorApi = async (
    articleId: string,
    contributorId: string
): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/articles/${articleId}/contributors/${contributorId}`);
        return success(void 0);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Remove External Contributor ────────────────────────────────────────────
const removeExternalContributorApi = async (
    articleId: string,
    externalContributorId: string
): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/articles/${articleId}/external-contributors/${externalContributorId}`);
        return success(void 0);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Update External Contributor ────────────────────────────────────────────
const updateExternalContributorApi = async (
    articleId: string,
    externalContributorId: string,
    form: UpdateExternalContributorForm
): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/articles/${articleId}/external-contributors/${externalContributorId}`, {
            fullName: form.fullName,
            role: form.role,
            email: form.email ?? null,
        });
        return success(void 0);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Submit Article ─────────────────────────────────────────────────────────
const submitArticleApi = async (articleId: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/articles/${articleId}/submit`,{});
        return success(void 0);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const backToDraftArticleApi = async (articleId: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/articles/${articleId}/back-to-draft`, {});
        return success(void 0);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Delete Article ────────────────────────────────────────────────────────
const deleteArticleByLecturerApi = async (articleId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/articles/${articleId}`);
        return success(void 0);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};


const updateArticleByLecturerApi = async (
    articleId: string,
    form: UpdateArticleByLecturerForm
): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/articles/${articleId}/lecturer`, {
            title: form.title,
            describe: form.describe,       // ← thêm
            publishedAt: form.publishedAt,
            proofUrl: form.proofUrl ?? null,
            journalName: form.journalName ?? null,
            dOI: form.doi ?? null,         // ← đổi từ doi → DOI
            detailUrl: form.detailUrl ?? null,
        })
        return success(void 0)
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data
            return fail(data?.message || data?.detail, data?.errors)
        }
        return fail()
    }
}


const addDisciplinesApi = async (
    articleId: string,
    disciplineIds: string[]
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/articles/${articleId}/disciplines`, { disciplineIds });
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Lỗi thêm lĩnh vực", data?.errors);
        }
        return fail();
    }
};

// Xóa discipline khỏi bài báo
const removeDisciplineApi = async (articleId: string, disciplineId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/articles/${articleId}/disciplines/${disciplineId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Lỗi xóa lĩnh vực");
        }
        return fail();
    }
};