"use client"

import { useState } from "react"
import { SidebarConfig } from "@/_components/layouts/sidebar"
import { adminMenu } from "@/_Common/_types/layout-Sidebar-type"
import { NavbarProtected, notifications } from "@/_components/layouts/navbar-ptotected"
import { adminNavbarConfig } from "@/_Common/_types/layout-navbar"
import { Role } from "@/Authen/auth-type"

export default function LayoutClient({ children, userRoles = [] }: { children: React.ReactNode, userRoles?: Role[] }) {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen bg-background">
            <NavbarProtected config={adminNavbarConfig} notifications={notifications}
                sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} userRoles={userRoles} />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - ẩn trên mobile, hiển thị từ md trở lên */}
                <div className="hidden md:block md:w-64 lg:w-72">
                    <SidebarConfig items={adminMenu} />
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
                    <SidebarConfig items={adminMenu} onClose={() => setSidebarOpen(false)} />
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
