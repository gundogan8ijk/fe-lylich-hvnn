import { api } from "@/services/axios-config"
import { AuthUser } from "@/types/auth";
import { ApiResponse } from "@/types/result-config";
import { fail, success } from "@/utils/response-helper";
import axios from "axios";

const loginUrl = "/authentication/login/";

export { loginApi };

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
                data?.message || data?.detail || "Login failed"
            );
        }

        return fail("Unknown error");
    }
}