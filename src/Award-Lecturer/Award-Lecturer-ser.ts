import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { api } from "@/_Common/_services/axios-service-config";
import { AwardLecturer } from "./Award-Lecturer-type";

export {
    registerAwardByLecturerApi,
    deleteAwardByLecturerApi,
    updateAwardByLecturerApi,
    submitAwardByLecturerApi
};
export type RegisterAwardByLecturerForm = {
    title: string
    publishedAt: string
    proofUrl: string
    articleRole: string
    journalName?: string
    doi?: string
    detailUrl?: string
}

const registerAwardByLecturerApi = async (award: RegisterAwardByLecturerForm): Promise<ApiResponse<AwardLecturer>> => {
    try {
        const detailUrl = `/awards/register`;
        const response = await api.post(detailUrl, award);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// --- Hủy/Xóa Giải thưởng ---
const deleteAwardByLecturerApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const detailUrl = `/awards/${id}`;
        await api.delete(detailUrl);
        return success(null);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

// --- Form Cập nhật Giải thưởng ---
export type UpdateAwardByLecturerForm = {
    awardId: string;
    name: string;
    awardDate: string;
    level: string;
    description: string;
    proofUrl: string;
};

const updateAwardByLecturerApi = async (payload: UpdateAwardByLecturerForm): Promise<ApiResponse<AwardLecturer>> => {
    try {
        const response = await api.put(`/awards/${payload.awardId}`, {
            name: payload.name,
            awardDate: payload.awardDate,
            level: payload.level,
            description: payload.description,
            proofUrl: payload.proofUrl || null
        });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const submitAwardByLecturerApi = async (
    id: string
): Promise<ApiResponse<AwardLecturer>> => {
    try {
        const response = await api.put(`/awards/${id}/submit`, {});

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }

        return fail();
    }
};