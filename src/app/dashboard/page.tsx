import { cookies } from "next/headers";
import { getRolesFromTokenSync } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { Role } from "@/_types/base-type/auth-type";

const ACCESS_TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_NAME_ACCESS_TOKEN ?? "";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value ?? "";

    const roles = accessToken ? await getRolesFromTokenSync(accessToken) : [];

    //chua login
    if (roles === -1) redirect("/login");
    if (roles.length === 0) redirect("/");

    return redirect(ROLE_HOME[getDefaultFirstRole(roles)]);
}

const ROLE_PRIORITY: Role[] = [Role.ADMIN, Role.MANAGER, Role.LECTURER];

function getDefaultFirstRole(roles: Role[]): Role {
    return ROLE_PRIORITY.find(r => roles.includes(r)) ?? roles[roles.length - 1];
}


export const ROLE_HOME: Record<Role, string> = {
    [Role.ADMIN]: "/admin",
    [Role.LECTURER]: "/lecturer",
    [Role.MANAGER]: "/manager",
};