
import LayoutClient from "./layout-Client"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <LayoutClient>{children}</LayoutClient>
    )
}
