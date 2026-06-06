import Footer from "@/_components/layouts/footer"
import { PublicNavbar } from "@/_components/layouts/public-navbar"
import { cookies } from "next/headers"
import { getRolesFromToken } from "@/Authen/auth-helper"

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
        <div className="min-h-screen flex flex-col">
            <PublicNavbar userRoles={validRoles} />

            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}