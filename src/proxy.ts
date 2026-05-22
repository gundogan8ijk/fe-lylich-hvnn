import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth-helper';

// 1. Specify protected and public routes
const PROTECTED_PREFIXES = ['/dashboard', '/admin', '/lecturer', '/manager']
const AUTH_ROUTES = ['/login']

const ACCESS_TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_NAME_ACCESS_TOKEN ?? "";

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname
    //các role
    const isProtectedRoute = PROTECTED_PREFIXES.some(r => path.startsWith(r))
    const isAuthRoute = AUTH_ROUTES.includes(path)

    //lấy token sau đó xác thực
    const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value ?? "";
    const isAuthenticated = await verifyToken(accessToken)

    if (isProtectedRoute && !isAuthenticated)
        return NextResponse.redirect(new URL('/login', req.nextUrl))

    if (isAuthRoute && isAuthenticated)
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon\.ico|sitemap\.xml|robots\.txt|.*\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)',
    ],
}