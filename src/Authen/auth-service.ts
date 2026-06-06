import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { TimeToken } from "@/Authen/auth-type";
import { api } from "@/_Common/_services/axios-service-config";

const loginUrl = "/authentication/login/";
const refreshTokenUrl = "/authentication/refresh";
const logoutUrl = "/authentication/logout";
const changePasswordUrl = "/authentication/change-password";
const forgotPasswordUrl = "/authentication/forgot-password";
const resetPasswordUrl = "/authentication/reset-password";
const registerLecturerUrl = "/authentication/register/Lecturer/";

export {
    loginApi,
    refreshTokenApi,
    logoutApi,
    changePasswordApi,
    forgotPasswordApi,
    resetPasswordApi,
    registerLecturerApi
};

const loginApi = async (email: string, password: string): Promise<ApiResponse<TimeToken>> => {
    try {
        const res = await api.post(loginUrl, { email, password, })

        return success(res.data);
    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
            const data = err.response?.data;

            return fail(
                data?.message || data?.detail || "Login failed",
            );
        }

        return fail("Unknown error");
    }
}

const refreshTokenApi = async (): Promise<ApiResponse<TimeToken>> => {
    try {
        const res = await api.post(refreshTokenUrl);

        return success(res.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            return fail(
                data?.message || data?.detail || "Refresh token failed"
            );
        }

        return fail("Unknown error");
    }
};

const logoutApi = async (): Promise<ApiResponse<null>> => {
    try {
        const res = await api.post(logoutUrl);
        return success(res.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            return fail(data?.message || data?.detail || "Logout failed");
        }
        return fail("Unknown error");
    }
};

const changePasswordApi = async (form: any): Promise<ApiResponse<null>> => {
    try {
        const res = await api.put(changePasswordUrl, form);
        return success(res.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            return fail(data?.message || data?.detail || "Change password failed");
        }
        return fail("Unknown error");
    }
};

const forgotPasswordApi = async (email: string): Promise<ApiResponse<null>> => {
    try {
        const res = await api.post(forgotPasswordUrl, { email });
        return success(res.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            return fail(data?.message || data?.detail || "Forgot password failed");
        }
        return fail("Unknown error");
    }
};

const resetPasswordApi = async (form: any): Promise<ApiResponse<null>> => {
    try {
        const res = await api.post(resetPasswordUrl, form);
        return success(res.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            return fail(data?.message || data?.detail || "Reset password failed");
        }
        return fail("Unknown error");
    }
};

const registerLecturerApi = async (form: any): Promise<ApiResponse<any>> => {
    try {
        const res = await api.post(registerLecturerUrl, form);
        return success(res.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            return fail(data?.message || data?.detail || "Registration failed", data?.errors);
        }
        return fail("Unknown error");
    }
};