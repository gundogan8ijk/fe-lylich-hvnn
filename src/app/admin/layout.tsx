import { cookies } from "next/headers"
import { getRolesFromToken } from "@/Authen/auth-helper"
import LayoutClient from "./layout-Client"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get(process.env.NEXT_PUBLIC_NAME_ACCESS_TOKEN ?? "")?.value;
    const rolesResult = token ? getRolesFromToken(token) : [];
    const validRoles = rolesResult !== -1 ? rolesResult : [];

    return (
        <LayoutClient userRoles={validRoles}>{children}</LayoutClient>
    )
}
