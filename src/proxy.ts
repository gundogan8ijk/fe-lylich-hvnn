import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES, ROLE_HOME } from "./constants/route-contant";
import { getDefaultFirstRole, getRolesFromTokenSync, hasAnyRequiredRole } from "./lib/auth-helper";
import { Role } from "./types/base-type/auth-type";

const ACCESS_TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_NAME_ACCESS_TOKEN ?? "";

// ─── Middleware ───────────────────────────────────────────────────────────────

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

    const roles: Role[] = accessToken ? getRolesFromTokenSync(accessToken) : [];

    // ── /auth/redirect: sau login hoặc refresh thành công client-side ────────
    if (pathname === "/auth/redirect") {
        if (roles.length === 0) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // Kiểm tra xem có tham số 'from' để quay lại trang cũ không
        const from = req.nextUrl.searchParams.get("from");
        if (from && from.startsWith("/")) {
            const matchedRoute = PROTECTED_ROUTES.find((p) => from.startsWith(p.prefix));
            if (matchedRoute) {
                if (hasAnyRequiredRole(roles, matchedRoute.roles)) {
                    return NextResponse.redirect(new URL(from, req.url));
                }
            }
        }

        // Mặc định redirect về home của role
        const defaultRole = getDefaultFirstRole(roles);
        return NextResponse.redirect(new URL(ROLE_HOME[defaultRole], req.url));
    }

    // ── /login: nếu đã đăng nhập rồi → về trang home luôn ────────────────────
    if (pathname === "/login") {
        if (roles.length > 0) {
            const defaultRole = getDefaultFirstRole(roles);
            return NextResponse.redirect(new URL(ROLE_HOME[defaultRole], req.url));
        }
        return NextResponse.next();
    }

    // ── Các route được bảo vệ ─────────────────────────────────────────────────
    const isProtected = PROTECTED_ROUTES.some((p) => pathname.startsWith(p.prefix));
    if (!isProtected) return NextResponse.next();

    // Nếu không có roles (không đăng nhập hoặc token không hợp lệ), chuyển hướng về login
    if (roles.length === 0) {
        return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(pathname)}`, req.url));
    }

    const matchedRoute = PROTECTED_ROUTES.find((p) => pathname.startsWith(p.prefix));

    // Kiểm tra quyền truy cập (Authorization)
    if (matchedRoute && !hasAnyRequiredRole(roles, matchedRoute.roles)) {
        const defaultRole = getDefaultFirstRole(roles);
        return NextResponse.redirect(new URL(ROLE_HOME[defaultRole], req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/auth/redirect",
        "/login",
        "/admin/:path*",
        "/lecturer/:path*",
        "/manager/:path*",
    ],
};