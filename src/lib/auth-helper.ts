import { Role } from "@/types/base-type/auth-type";
import { jwtVerify } from "jose";

export {
    hasAnyRequiredRole,
    getDefaultFirstRole,
    getRolesFromToken
}

function hasAnyRequiredRole(userRoles: Role[], requiredRoles: Role[]): boolean {
    return requiredRoles.some(r =>
        userRoles.map(ur => ur.toLowerCase()).includes(r.toLowerCase())
    );
}

const ROLE_PRIORITY: Role[] = [Role.ADMIN, Role.MANAGER, Role.LECTURER, Role.VERIFIED];

function getDefaultFirstRole(roles: Role[]): Role {
    return ROLE_PRIORITY.find(r => roles.includes(r)) ?? roles[roles.length-1];
}

async function getRolesFromToken(token: string): Promise<Role[]> {
    const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET ?? "");
    try {
        const { payload } = await jwtVerify(token, SECRET);

        const raw =
            payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
            payload.roles ??
            payload.role ??
            [];

        // Normalize về array vì .NET có thể trả string nếu chỉ có 1 role
        const roles = (Array.isArray(raw) ? raw : [raw]) as Role[];

        if (!roles.includes(Role.VERIFIED)) roles.push(Role.VERIFIED);
        return roles;
    } catch {
        return [];
    }
}