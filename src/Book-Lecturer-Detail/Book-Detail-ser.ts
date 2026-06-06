import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from "@/_Common/_services/axios-service-config";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import {
    BookDetail,
    AddInternalContributorForm,
    AddExternalContributorForm,
    UpdateExternalContributorForm,
    UpdateBookForm,
} from "./Book-Detail-type";

export {
    getBookDetailApi,
    addInternalContributorApi,
    removeInternalContributorApi,
    addExternalContributorApi,
    removeExternalContributorApi,
    updateExternalContributorApi,
    submitBookApi,
    deleteBookDetailApi,
    updateBookApi,
    addDisciplinesApi,
    removeDisciplineApi,
    backToDraftBookApi,
};

// Get detail
const getBookDetailApi = async (id: string): Promise<ApiResponse<BookDetail>> => {
    try {
        const res = await api.get(`/books/${id}/lecturer`);
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
    bookId: string,
    form: AddInternalContributorForm
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/books/${bookId}/contributors`, {
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
    bookId: string,
    contributorId: string
): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/books/${bookId}/contributors/${contributorId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// External contributors
const addExternalContributorApi = async (
    bookId: string,
    form: AddExternalContributorForm
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/books/${bookId}/external-contributors`, {
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

const removeExternalContributorApi = async (
    bookId: string,
    externalContributorId: string
): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/books/${bookId}/external-contributors/${externalContributorId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateExternalContributorApi = async (
    bookId: string,
    externalContributorId: string,
    form: UpdateExternalContributorForm
): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/books/${bookId}/external-contributors/${externalContributorId}`, {
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
const submitBookApi = async (bookId: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/books/${bookId}/submit`, {});
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const backToDraftBookApi = async (bookId: string): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/books/${bookId}/back-to-draft`, {});
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteBookDetailApi = async (bookId: string): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/books/${bookId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateBookApi = async (
    bookId: string,
    form: UpdateBookForm
): Promise<ApiResponse<void>> => {
    try {
        await api.put(`/books/${bookId}/lecturer`, form);
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
    bookId: string,
    disciplineIds: string[]
): Promise<ApiResponse<void>> => {
    try {
        await api.post(`/books/${bookId}/disciplines`, { disciplineIds });
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
    bookId: string,
    disciplineId: string
): Promise<ApiResponse<void>> => {
    try {
        await api.delete(`/books/${bookId}/disciplines/${disciplineId}`);
        return success(void 0);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};