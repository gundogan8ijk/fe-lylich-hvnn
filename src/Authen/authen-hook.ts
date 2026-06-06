import { loginApi, refreshTokenApi, logoutApi, changePasswordApi, forgotPasswordApi, resetPasswordApi, registerLecturerApi } from "@/Authen/auth-service";

export {
    loginActionHook,
    refreshTokenHook,
    clearRefreshTimer,
    scheduleNextRefresh,
    logoutActionHook,
    changePasswordActionHook,
    forgotPasswordActionHook,
    resetPasswordActionHook,
    registerLecturerActionHook
};

type LoginRequest = {
    email: string;
    password: string;
};

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

function clearRefreshTimer() {
    if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
    }
}

function scheduleNextRefresh(expiresIn: number) {
    clearRefreshTimer();
    if (typeof window !== "undefined") {
        localStorage.setItem("auth_expires_at", String(Date.now() + expiresIn * 1000));
    }
    const delay = (expiresIn - 80) * 1000;
    if (delay > 0) {
        refreshTimer = setTimeout(() => refreshTokenHook(), delay);
    } else {
        refreshTokenHook();
    }
}

// --- Login ---
async function loginActionHook({ email, password }: LoginRequest): Promise<string | null> {
    const data = await loginApi(email, password);

    if (data.code !== 1) {
        return data.message;
    }

    if (data.data?.expiresIn) {
        scheduleNextRefresh(data.data.expiresIn);
    }

    window.location.href = "/dashboard";
    return null;
}

// --- Refresh Token ---
async function refreshTokenHook(): Promise<{ success: boolean; message?: string }> {
    const res = await refreshTokenApi();

    if (res.code !== 1) {
        clearRefreshTimer();
        if (typeof window !== "undefined") {
            localStorage.removeItem("auth_expires_at");
        }
        return { success: false, message: res.message };
    }

    if (res.data?.expiresIn) {
        scheduleNextRefresh(res.data.expiresIn);
    }

    return { success: true };
}

// --- Logout ---
async function logoutActionHook() {
    clearRefreshTimer();
    if (typeof window !== "undefined") {
        localStorage.removeItem("auth_expires_at");
    }
    try {
        await logoutApi();
    } catch (_) {
        // Ignore API error — always redirect to login
    } finally {
        window.location.href = "/login";
    }
}

// --- Change Password ---
async function changePasswordActionHook(form: any): Promise<string | null> {
    const res = await changePasswordApi(form);
    if (res.code !== 1) return res.message;
    return null;
}

// --- Forgot Password ---
async function forgotPasswordActionHook(email: string): Promise<string | null> {
    const res = await forgotPasswordApi(email);
    if (res.code !== 1) return res.message;
    return null;
}

// --- Reset Password ---
async function resetPasswordActionHook(form: any): Promise<string | null> {
    const res = await resetPasswordApi(form);
    if (res.code !== 1) return res.message;
    return null;
}

// --- Register Lecturer ---
async function registerLecturerActionHook(form: any): Promise<{ success: boolean; message?: string; errors?: any }> {
    const res = await registerLecturerApi(form);
    if (res.code !== 1) {
        return { success: false, message: res.message, errors: res.errors };
    }
    return { success: true };
}