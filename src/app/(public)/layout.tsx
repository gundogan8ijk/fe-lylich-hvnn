import Footer from "@/_components/layouts/footer"
import { PublicNavbar } from "@/_components/layouts/public-navbar"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <PublicNavbar />

            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}