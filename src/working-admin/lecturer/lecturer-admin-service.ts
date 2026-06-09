import { api } from "@/_Common/_services/axios-service-config";
import { LecturerListAccountResponse } from "./lecturer-admin-type";
import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { success, fail } from "@/_lib/response-helper";

export const getLecturerAccountsAdminApi = async (searchParams: URLSearchParams): Promise<ApiResponse<LecturerListAccountResponse>> => {
    try {
        const res = await api.get('/lecturers/admin/accounts/list', { params: searchParams });
        return success(res.data);
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi tải danh sách tài khoản", error?.response?.data?.errors);
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
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi tìm kiếm giảng viên", error?.response?.data?.errors);
    }
};
export interface CreateLecturerAccountPayload {
    lecturerId: string;
    email: string;
    roles: string[];
}

export const registerLecturerAccountApi = async (payload: CreateLecturerAccountPayload): Promise<ApiResponse<any>> => {
    try {
        const res = await api.post('/authentication/register/Lecturer/', payload);
        return success(res.data);
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi tạo tài khoản giảng viên", error?.response?.data?.errors);
    }
};

export const addRoleAccountApi = async (payload: { accountId: string; roleName: string }): Promise<ApiResponse<any>> => {
    try {
        const res = await api.post('/authentication/manage/roles/add', payload);
        return success(res.data);
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi thêm quyền", error?.response?.data?.errors);
    }
};

export const revokeRoleAccountApi = async (payload: { accountId: string; roleName: string }): Promise<ApiResponse<any>> => {
    try {
        const res = await api.post('/authentication/manage/roles/revoke', payload);
        return success(res.data);
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi thu hồi quyền", error?.response?.data?.errors);
    }
};

export const lockAccountApi = async (payload: { accountId: string; type: number; timeBanned?: string | null; reason?: string | null }): Promise<ApiResponse<any>> => {
    try {
        const res = await api.post('/authentication/manage/account/lock', payload);
        return success(res.data);
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi khóa tài khoản", error?.response?.data?.errors);
    }
};

export const unlockAccountApi = async (payload: { accountId: string }): Promise<ApiResponse<any>> => {
    try {
        const res = await api.post('/authentication/manage/account/unlock', payload);
        return success(res.data);
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi mở khóa tài khoản", error?.response?.data?.errors);
    }
};

export const deleteAccountApi = async (accountId: string): Promise<ApiResponse<any>> => {
    try {
        const res = await api.delete(`/authentication/manage/account/${accountId}`);
        return success(res.data);
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi xóa tài khoản", error?.response?.data?.errors);
    }
};
