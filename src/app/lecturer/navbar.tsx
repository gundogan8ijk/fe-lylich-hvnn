'use client'

import { useState } from 'react'
import { Bell, LogOut, Settings, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

interface NavbarProps {
    sidebarOpen?: boolean
    onSidebarToggle?: () => void
}



export function NavbarLecturer({ sidebarOpen = false, onSidebarToggle }: NavbarProps) {
    const [notificationOpen, setNotificationOpen] = useState(false)
    const unreadCount = notifications.filter((n) => !n.read).length

    return (
        <>
            <nav className="border-b border-border bg-background px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between h-16 sticky top-0 z-40">
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={onSidebarToggle}
                        className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
                        aria-label="Toggle menu"
                    >
                        {sidebarOpen ? (
                            <X size={20} className="text-foreground" />
                        ) : (
                            <Menu size={20} className="text-foreground" />
                        )}
                    </button>

                    <h1 className="text-lg sm:text-xl font-bold text-foreground">Giáo Viên</h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Notification Button */}
                    <button
                        onClick={() => setNotificationOpen(true)}
                        className="relative p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                        <Bell size={20} className="text-foreground" />
                        {unreadCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                                {unreadCount}
                            </Badge>
                        )}
                    </button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-9 w-9 rounded-full bg-accent"
                            >
                                <span className="text-sm font-bold">GV</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <User size={16} />
                                <span>Hồ sơ cá nhân</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Settings size={16} />
                                <span>Cài đặt</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer text-red-500">
                                <LogOut size={16} />
                                <span>Đăng xuất</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            {/* Notification Dialog */}
            <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
                <DialogContent className="max-w-md mx-4 sm:mx-0">
                    <DialogHeader>
                        <DialogTitle>Thông báo</DialogTitle>
                        <DialogDescription>
                            Bạn có {unreadCount} thông báo chưa đọc
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-96">
                        <div className="space-y-2 pr-4">
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${!notification.read
                                            ? 'bg-accent border-primary'
                                            : 'border-border'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm">{notification.title}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {notification.description}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {notification.time}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    Không có thông báo nào
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    )
}


const notifications = [
    {
        id: 1,
        title: 'Bài tập mới được nộp',
        description: 'Sinh viên Nguyễn Văn A vừa nộp bài tập môn Toán',
        time: '10 phút trước',
        read: false,
    },
    {
        id: 2,
        title: 'Lớp học sắp bắt đầu',
        description: 'Lớp Toán 1A bắt đầu trong 15 phút',
        time: '15 phút trước',
        read: false,
    },
    {
        id: 3,
        title: 'Có sinh viên hỏi câu hỏi',
        description: 'Sinh viên Trần Thị B hỏi về bài giảng Hôm nay',
        time: '30 phút trước',
        read: true,
    },
    {
        id: 4,
        title: 'Cập nhật hệ thống',
        description: 'Hệ thống đã được cập nhật phiên bản mới',
        time: '1 giờ trước',
        read: true,
    },
]