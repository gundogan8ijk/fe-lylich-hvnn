import { api } from "@/services/axios-service-config"
import { AuthUser } from "@/types/auth-type";
import { ApiResponse } from "@/types/result-typeConfig";
import { fail, success } from "@/lib/response-helper";
import axios from "axios";

const loginUrl = "/authentication/login/";
const refreshTokenUrl = "/authentication/refresh";

export { loginApi, refreshTokenApi };

const loginApi = async (email: string, password: string): Promise<ApiResponse<AuthUser>> => {
    try {
        const response = await api.post(loginUrl,
            {
                email,
                password,
            }
        )

        return success(response.data);
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

const refreshTokenApi = async (): Promise<ApiResponse<AuthUser>> => {
    try {
        const response = await api.post(refreshTokenUrl);

        return success(response.data);
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