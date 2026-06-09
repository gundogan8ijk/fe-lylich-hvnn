import { api } from "@/_Common/_services/axios-service-config";
import { LecturerListAccountResponse } from "./lecturer-admin-type";
import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";
import axios from "axios";

export const getLecturerAccountsAdminApi = async (searchParams: URLSearchParams): Promise<ApiResponse<LecturerListAccountResponse>> => {
    try {
        const res = await api.get('/lecturers/admin/accounts/list', { params: searchParams });
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi tải danh sách tài khoản", data?.errors);
        }
        return fail("Lỗi tải danh sách tài khoản");
    }
};

export interface LecturerNoAccountDto {
    id: string;
    code: string;
    name: string;
}

export const searchNoAccountLecturersApi = async (search: string): Promise<ApiResponse<LecturerNoAccountDto[]>> => {
    try {
        const res = await api.get('/lecturer/search-no-account-name-code', { params: { search } });
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi tìm kiếm giảng viên", data?.errors);
        }
        return fail("Lỗi tìm kiếm giảng viên");
    }
};

export interface CreateLecturerAccountPayload {
    lecturerId: string;
    email: string;
    roles: string[];
}

export const registerLecturerAccountApi = async (payload: CreateLecturerAccountPayload): Promise<ApiResponse<unknown>> => {
    try {
        const res = await api.post('/authentication/register/Lecturer/', payload);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi tạo tài khoản giảng viên", data?.errors);
        }
        return fail("Lỗi tạo tài khoản giảng viên");
    }
};

export const addRoleAccountApi = async (payload: { accountId: string; roleName: string }): Promise<ApiResponse<unknown>> => {
    try {
        const res = await api.post('/authentication/manage/roles/add', payload);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi thêm quyền", data?.errors);
        }
        return fail("Lỗi thêm quyền");
    }
};

export const revokeRoleAccountApi = async (payload: { accountId: string; roleName: string }): Promise<ApiResponse<unknown>> => {
    try {
        const res = await api.post('/authentication/manage/roles/revoke', payload);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi thu hồi quyền", data?.errors);
        }
        return fail("Lỗi thu hồi quyền");
    }
};

export const lockAccountApi = async (payload: { accountId: string; type: number; timeBanned?: string | null; reason?: string | null }): Promise<ApiResponse<unknown>> => {
    try {
        const res = await api.post('/authentication/manage/account/lock', payload);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi khóa tài khoản", data?.errors);
        }
        return fail("Lỗi khóa tài khoản");
    }
};

export const unlockAccountApi = async (payload: { accountId: string }): Promise<ApiResponse<unknown>> => {
    try {
        const res = await api.post('/authentication/manage/account/unlock', payload);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi mở khóa tài khoản", data?.errors);
        }
        return fail("Lỗi mở khóa tài khoản");
    }
};

export const deleteAccountApi = async (accountId: string): Promise<ApiResponse<unknown>> => {
    try {
        const res = await api.delete(`/authentication/manage/account/${accountId}`);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi xóa tài khoản", data?.errors);
        }
        return fail("Lỗi xóa tài khoản");
    }
};
