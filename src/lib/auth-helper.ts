import { Role } from "@/types/auth-type";
import { jwtVerify } from "jose";

export {
    hasAnyRequiredRole,
    getDefaultFirstRole,
    getRolesFromToken
}

function hasAnyRequiredRole(userRoles: Role[], requiredRoles: Role[]): boolean {
    return requiredRoles.some((r) => userRoles.includes(r));
}

function getDefaultFirstRole(roles: Role[]): Role {
    const priority: Role[] = [Role.ADMIN, Role.MANAGER, Role.LECTURER];
    return priority.find((r) => roles.includes(r)) ?? Role.VERIFIED;
}

async function getRolesFromToken(token: string): Promise<Role[]> {
const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET ?? "");
    try {
        const { payload } = await jwtVerify(token, SECRET);
        const roles = (payload.roles ?? []) as Role[];
        if (!roles.includes(Role.VERIFIED)) roles.push(Role.VERIFIED);
        return roles;
    } catch {
        return [];
    }
}