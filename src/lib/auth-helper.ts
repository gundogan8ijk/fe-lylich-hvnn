import { Role } from "@/types/base-type/auth-type";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export {
    hasAnyRequiredRole,
    getRolesFromTokenSync,
    verifyToken,hasRequiredRolesAsync
}

function hasAnyRequiredRole(userRoles: Role[], requiredRoles: Role[]): boolean {
    return requiredRoles.some(r =>
        userRoles.map(ur => ur.toLowerCase()).includes(r.toLowerCase())
    );
}

async function getRolesFromTokenSync(token: string): Promise<Role[] | -1> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    try {
        const { payload } = await jwtVerify(token, secret);

        const raw =
            payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
            payload.roles ??
            payload.role ??
            [];

        const roles = (Array.isArray(raw) ? raw : [raw]) as Role[];

        return roles;
    } catch {
        return -1;
    }
}


async function verifyToken(accessToken: string): Promise<boolean> {
    if (!accessToken) return false;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    try {
        await jwtVerify(accessToken, secret);
        return true;
    } catch {
        return false;
    }
}


async function hasRequiredRolesAsync(requiredRoles: Role[]): Promise<boolean> {
    const cookieStore = await cookies();
    const ACCESS_TOKEN_COOKIE_NAME =
        process.env.NEXT_PUBLIC_NAME_ACCESS_TOKEN ?? "";
    const token = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

    const thudangco = token ? await getRolesFromTokenSync(token) : [];
    if (thudangco === -1) return false;

    return hasAnyRequiredRole(thudangco, requiredRoles)

}