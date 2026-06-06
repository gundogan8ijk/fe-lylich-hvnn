'use client';

import { useEffect } from "react";
import { refreshTokenHook, scheduleNextRefresh } from "./authen-hook";

const PUBLIC_PATHS = ["/login", "/forgot-password", "/reset-password", "/register"];

export default function AuthRefresher() {
    useEffect(() => {
        const initAuthRefresher = async () => {
            if (typeof window === "undefined") return;

            // Không chạy refresh trên trang public
            const isPublicPage = PUBLIC_PATHS.some(p =>
                window.location.pathname.startsWith(p)
            );
            if (isPublicPage) return;

            const expiresAt = localStorage.getItem("auth_expires_at");
            if (expiresAt) {
                const remaining = (Number(expiresAt) - Date.now()) / 1000;

                if (remaining > 80) {
                    // Token còn hạn, lên lịch refresh
                    scheduleNextRefresh(remaining);
                } else {
                    // Token sắp hoặc đã hết hạn, refresh ngay
                    await refreshTokenHook();
                }
            }
            // Không refresh khi không có auth_expires_at (user chưa đăng nhập)
        };

        initAuthRefresher();
    }, []);

    return null;
}
