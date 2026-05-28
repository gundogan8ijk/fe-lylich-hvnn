"use client"

import { useState } from "react"
import { SidebarConfig } from "../../components/layouts/sidebar"
import { managerMenu } from "@/_types/base-type/layout-Sidebar-type"
import { NavbarProtected, notifications } from "@/components/layouts/navbar-ptotected"
import { managerNavbarConfig } from "@/_types/base-type/layout-navbar"

export default function LayoutClient({ children, }: { children: React.ReactNode }) {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen bg-background">
            <NavbarProtected config={managerNavbarConfig} notifications={notifications}
                sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - ẩn trên mobile, hiển thị từ md trở lên */}
                <div className="hidden md:block md:w-64 lg:w-72">
                    <SidebarConfig items={managerMenu} />
                </div>

                {/* Mobile Sidebar - Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                <div className={`fixed left-0 top-16 bottom-0 w-64 z-50 transform transition-transform md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <SidebarConfig items={managerMenu} onClose={() => setSidebarOpen(false)} />
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto w-full md:w-auto">
                    <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col"> 
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}


// /*<main className="flex-1 overflow-y-auto w-full md:w-auto flex flex-col">
//     {children}
// </main>*/