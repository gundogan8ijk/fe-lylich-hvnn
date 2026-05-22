import { loginApi, refreshTokenApi } from "@/services/base-ser/auth-service";

export { loginActionHook, refreshTokenHook, clearRefreshTimer };

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
    const delay = (expiresIn - 80) * 1000;
    refreshTimer = setTimeout(() => refreshTokenHook(), delay);
}

// --- Login ---
async function loginActionHook({ email, password }: LoginRequest): Promise<string | null> {
    const data = await loginApi(email, password);

    if (data.code !== 1) {
        return data.message; // dừng lại, trả lỗi
    }

    // Login thành công → schedule refresh ngay
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
        return { success: false, message: res.message };
    }

    if (res.data?.expiresIn) {
        scheduleNextRefresh(res.data.expiresIn);
    }

    return { success: true };
}