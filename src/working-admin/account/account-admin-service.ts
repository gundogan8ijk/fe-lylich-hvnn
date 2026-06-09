import { fail, success } from "@/_lib/response-helper";
import { api } from "@/_Common/_services/axios-service-config";
import { AccountListResponse } from "./account-admin-type";
import { ApiResponse } from "@/_Common/_types/result-typeConfig";

export const getAccountAdminListApi = async (params: URLSearchParams): Promise<ApiResponse<AccountListResponse>> => {
    try {
        const response = await api.get<AccountListResponse>('/authentication/manage/accounts/list', { params });
        return success(response.data);
    } catch (error) {
        return fail(error as Error);
    }
}
