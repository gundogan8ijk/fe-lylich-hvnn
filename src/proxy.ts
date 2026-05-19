import { NextRequest, NextResponse } from "next/server";
import { Role } from "./types/auth-type";
import { PROTECTED_ROUTES, ROLE_HOME } from "./constants/route-contant";
import { getDefaultFirstRole, getRolesFromToken, hasAnyRequiredRole } from "./lib/auth-helper";
import { refreshAccessTokenAction } from "./hooks/refreshToken-hook";

const ACCESS_TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_NAME_ACCESS_TOKEN ?? "";
const REFRESH_TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_NAME_REFRESH_TOKEN ?? "";


// ─── Middleware ───────────────────────────────────────────────────────────────

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
    const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

    // ── /auth/redirect: sau login, middleware quyết định đi đâu ───────────────
    if (pathname === "/auth/redirect") {
        if (!accessToken && !refreshToken) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        let roles: Role[] = accessToken ? await getRolesFromToken(accessToken) : [];

        if (roles.length === 0 && refreshToken) {
            const refreshed = await refreshAccessTokenAction(refreshToken);
            if (!refreshed) return NextResponse.redirect(new URL("/login", req.url));
            const newToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
            if (newToken) roles = await getRolesFromToken(newToken);
        }

        if (roles.length === 0) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // Redirect về đúng trang home theo role
        return NextResponse.redirect(
            new URL(ROLE_HOME[getDefaultFirstRole(roles)], req.url),
        );
    }

    // ── /login: nếu đã đăng nhập rồi → về trang home luôn ────────────────────
    if (pathname === "/login") {
        if (!accessToken && !refreshToken) return NextResponse.next();

        const roles = accessToken ? await getRolesFromToken(accessToken) : [];
        if (roles.length > 0) {
            return NextResponse.redirect(
                new URL(ROLE_HOME[getDefaultFirstRole(roles)], req.url),
            );
        }
        return NextResponse.next();
    }

    // ── Các route được bảo vệ ─────────────────────────────────────────────────
    const isProtected = PROTECTED_ROUTES.some((p) => pathname.startsWith(p.prefix));
    if (!isProtected) return NextResponse.next();

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL(`/login?from=${pathname}`, req.url));
    }

    let roles: Role[] = accessToken ? await getRolesFromToken(accessToken) : [];
    

    if (roles.length === 0 && refreshToken) {
        const refreshed = await refreshAccessTokenAction(refreshToken);
        if (!refreshed) return NextResponse.redirect(new URL("/login", req.url));
        const newToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
        if (newToken) roles = await getRolesFromToken(newToken);
    }

    if (roles.length === 0) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const route = PROTECTED_ROUTES.find((p) => pathname.startsWith(p.prefix));

    if (route && !hasAnyRequiredRole(roles, route.roles)) {
        return NextResponse.redirect(
            new URL(ROLE_HOME[getDefaultFirstRole(roles)], req.url),
        );
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