import { Role } from "@/types/base-type/auth-type";
import { decodeJwt } from "jose";

export {
    hasAnyRequiredRole,
    getDefaultFirstRole,
    getRolesFromTokenSync
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

function getRolesFromTokenSync(token: string): Role[] {
    try {
        const payload = decodeJwt(token);

        const raw =
            payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
            payload.roles ??
            payload.role ??
            [];

        const roles = (Array.isArray(raw) ? raw : [raw]) as Role[];

        if (!roles.includes(Role.VERIFIED)) roles.push(Role.VERIFIED);
        return roles;
    } catch {
        return [];
    }
}