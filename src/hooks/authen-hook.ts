
import { loginApi } from "@/services/base-ser/auth-service";

export {
    loginActionHook
}

type LoginRequest = {
    email: string;
    password: string;
};

async function loginActionHook({ email, password, }: LoginRequest): Promise<string | null> {
    const data = await loginApi(email, password);

    if (data.code !== 1) {
        return data.message;
    }

    window.location.href = "/auth/redirect";
    return null;
}
