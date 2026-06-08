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

export interface CreateLecturerAccountPayload {
    lecturerId: string;
    email: string;
    roles: string[];
}

export const registerLecturerAccountApi = async (payload: CreateLecturerAccountPayload): Promise<ApiResponse<any>> => {
    try {
        const formData = new FormData();
        formData.append('lecturerId', payload.lecturerId);
        formData.append('email', payload.email);
        payload.roles.forEach(r => formData.append('Roles', r)); // The backend expects 'Roles'
        
        const res = await api.post('/authentication/register/Lecturer/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return success(res.data);
    } catch (error: any) {
        return fail(error?.response?.data?.message || "Lỗi tạo tài khoản giảng viên", error?.response?.data?.errors);
    }
};
