import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshTokenApi } from "./auth-service";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});


const AUTH_ENDPOINTS = [
    "/authentication/login",
    "/authentication/refresh",
    "/authentication/logout",
];

function isAuthEndpoint(url?: string): boolean {
    return AUTH_ENDPOINTS.some((e) => url?.includes(e));
}

// ─── Refresh lock (race-condition guard) ─────────────────────────────────────
// Đảm bảo dù có nhiều request 401 cùng lúc, chỉ gọi refresh API một lần.
// Các request còn lại chờ promise đó resolve rồi tự retry.

let refreshPromise: Promise<boolean> | null = null;

async function getRefreshPromise(): Promise<boolean> {
    if (refreshPromise) return refreshPromise; // đang refresh → chờ

    refreshPromise = (async (): Promise<boolean> => {
        try {
            const res = await refreshTokenApi();
            return res.code === 1;
        } catch {
            return false;
        } finally {
            refreshPromise = null; // giải phóng lock
        }
    })();

    return refreshPromise;
}

// ─── Response interceptor ────────────────────────────────────────────────────

// Dùng để đánh dấu request đã được retry, tránh vòng lặp vô hạn
interface RetryableRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

api.interceptors.response.use(
    (response) => response, // 2xx → cho qua

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequest;

        // Chỉ xử lý 401 và chưa retry lần nào
        if (error.response?.status !== 401 || originalRequest._retry || isAuthEndpoint(originalRequest.url)) {
            return Promise.reject(error);
        }

        originalRequest._retry = true; // đánh dấu đã retry

        const refreshed = await getRefreshPromise();
        if (!refreshed) {
            // Refresh thất bại → token hết hạn hoàn toàn → về login
            window.location.href = `/login?from=${window.location.pathname}`;
            return Promise.reject(error);
        }

        // BE đã set cookie mới → retry request gốc, withCredentials tự gửi cookie mới
        return api(originalRequest);
    },
);