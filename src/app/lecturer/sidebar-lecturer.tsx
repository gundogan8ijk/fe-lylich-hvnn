'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {BookOpen,FileText,BarChart3,Settings,HelpCircle, UserRoundCog} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
    onClose?: () => void
}

const menuItems = [
    {
        icon: BookOpen,
        label: 'Lớp học',
        href: '/dashboard/classes',
    },
    {
        icon: UserRoundCog,
        label: 'Hồ Sơ',
        href: '/lecturer/me',
    },
    {
        icon: FileText,
        label: 'Bài giảng',
        href: '/dashboard/lectures',
    },
    {
        icon: BarChart3,
        label: 'Đánh giá',
        href: '/dashboard/grades',
    },
    {
        icon: Settings,
        label: 'Cài đặt lớp',
        href: '/dashboard/settings',
    },
    {
        icon: HelpCircle,
        label: 'Trợ giúp',
        href: '/dashboard/help',
    },
]

export function SidebarLecturer({ onClose }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className="w-64 border-r border-border bg-background h-full overflow-y-auto md:relative md:top-auto md:left-auto">
            <div className="p-4 sm:p-6 space-y-4">
                <h2 className="text-base sm:text-lg font-semibold text-foreground">Menu</h2>
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname.startsWith(item.href)

                        return (
                            <Link key={item.href} href={item.href} onClick={onClose}>
                                <div
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-2 sm:py-3 rounded-lg transition-colors cursor-pointer text-sm sm:text-base',
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-accent'
                                    )}
                                >
                                    <Icon size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}
