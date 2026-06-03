'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/_lib/utils'
import { SidebarItem } from '@/_Common/_types/layout-Sidebar-type'

interface SidebarProps {
    items: SidebarItem[],
    onClose?: () => void
}

export function SidebarConfig({items, onClose }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className="w-64 border-r border-border bg-background h-full overflow-y-auto md:relative md:top-auto md:left-auto">
            <div className="p-4 sm:p-6 space-y-4">
                <h2 className="text-base sm:text-lg font-semibold text-foreground">Menu</h2>
                <nav className="space-y-2">
                    {items.map((item) => {
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
