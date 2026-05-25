import { ApiResponse } from "@/_types/base-type/result-typeConfig";
import { fail, success } from "@/lib/response-helper";
import axios from "axios";
import { api } from "./axios-service-config";
import { TimeToken } from "@/_types/base-type/auth-type";

const loginUrl = "/authentication/login/";
const refreshTokenUrl = "/authentication/refresh";

export { loginApi, refreshTokenApi };

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