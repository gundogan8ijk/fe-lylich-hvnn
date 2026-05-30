import { ProtectedRoute, Role } from "@/Authen/auth-type";


export const PROTECTED_ROUTES: ProtectedRoute[] = [
    { prefix: "/admin", roles: [Role.ADMIN] },
    { prefix: "/lecturer", roles: [Role.LECTURER] },
    { prefix: "/manager", roles: [Role.MANAGER] },
];

export const ROLE_HOME: Record<Role, string> = {
    [Role.ADMIN]: "/admin",
    [Role.LECTURER]: "/lecturer",
    [Role.MANAGER]: "/manager",
};