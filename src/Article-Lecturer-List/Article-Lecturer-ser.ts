import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from "../_Common/_services/axios-service-config";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { ArticleLecturerItem } from "./Article-Lecturer-type";

export {
    getListArticleLecturerApi,
    registerArticleLecturerApi,
    deleteArticleLecturerApi,
}

// ── Get List ───────────────────────────────────────────────────────────────
const getListArticleLecturerApi = async (): Promise<ApiResponse<ArticleLecturerItem[]>> => {
    try {
        const res = await api.get("/articles/my");
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Register ───────────────────────────────────────────────────────────────
export type RegisterArticleForm = {
    Title: string
    PublishedAt: string
    ProofUrl: string
    ArticleRole: string
    JournalName?: string
    DOI?: string
    DetailUrl?: string
}

const registerArticleLecturerApi = async (form: RegisterArticleForm): Promise<ApiResponse<ArticleLecturerItem>> => {
    try {
        const res = await api.post("/articles/register", form);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// ── Delete ─────────────────────────────────────────────────────────────────
const deleteArticleLecturerApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        const res = await api.delete(`/articles/${id}`);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};