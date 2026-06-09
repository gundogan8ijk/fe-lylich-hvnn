import { fail, success } from "@/_lib/response-helper";
import { api } from "@/_Common/_services/axios-service-config";
import { AccountListResponse } from "./account-admin-type";
import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import axios from "axios";

export const getAccountAdminListApi = async (params: URLSearchParams): Promise<ApiResponse<AccountListResponse>> => {
    try {
        const response = await api.get<AccountListResponse>('/authentication/manage/accounts/list', { params });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi tải danh sách tài khoản", data?.errors);
        }
        return fail("Lỗi tải danh sách tài khoản");
    }
}

export const registerManagerAccountApi = async (payload: { email: string }): Promise<ApiResponse<unknown>> => {
    try {
        const res = await api.post('/authentication/register/manager/', payload);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi tạo tài khoản quản lý", data?.errors);
        }
        return fail("Lỗi tạo tài khoản quản lý");
    }
};

export const linkLecturerApi = async (payload: { accountId: string, lecturerId: string }): Promise<ApiResponse<unknown>> => {
    try {
        const res = await api.post('/authentication/manage/link-lecturer', payload);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || "Lỗi liên kết giảng viên", data?.errors);
        }
        return fail("Lỗi liên kết giảng viên");
    }
};
