'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, LogOut, User, Menu, X, Lock, Loader2, CheckCircle2, Home } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/_components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/_components/ui/dialog'
import { ScrollArea } from '@/_components/ui/scroll-area'
import { Badge } from '@/_components/ui/badge'
import { NavbarConfig, Notifications } from '@/_Common/_types/layout-navbar'
import { logoutActionHook, changePasswordActionHook } from '@/Authen/authen-hook'
import { Input } from '@/_components/ui/input'
import { Role } from '@/Authen/auth-type'
import { ROLE_HOME } from '@/_constants/route-constant'

const roleNameMap: Partial<Record<Role, string>> = {
    [Role.LECTURER]: 'Giảng viên',
    [Role.MANAGER]: 'Quản lý',
    [Role.ADMIN]: 'Quản trị viên',
}

interface NavbarProps {
    config: NavbarConfig,
    notifications: Notifications[],
    sidebarOpen?: boolean
    onSidebarToggle?: () => void
    userRoles?: Role[]
}

export function NavbarProtected({ config, notifications, sidebarOpen = false, onSidebarToggle, userRoles = [] }: NavbarProps) {
    const pathname = usePathname()
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [changePassOpen, setChangePassOpen] = useState(false)
    const [changePassForm, setChangePassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
    const [changePassLoading, setChangePassLoading] = useState(false)
    const [changePassError, setChangePassError] = useState('')
    const [changePassSuccess, setChangePassSuccess] = useState(false)

    const unreadCount = notifications.filter((n) => !n.read).length

    const handleChangePassSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setChangePassError('');
        setChangePassSuccess(false);

        if (changePassForm.newPassword.length < 8) {
            setChangePassError('Mật khẩu mới phải từ 8 ký tự trở lên.');
            return;
        }

        if (changePassForm.newPassword !== changePassForm.confirmPassword) {
            setChangePassError('Xác nhận mật khẩu mới không khớp.');
            return;
        }

        setChangePassLoading(true);
        try {
            const err = await changePasswordActionHook({
                currentPassword: changePassForm.currentPassword,
                newPassword: changePassForm.newPassword
            });
            if (err) {
                setChangePassError(err);
            } else {
                setChangePassSuccess(true);
                setChangePassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setTimeout(() => {
                    setChangePassOpen(false);
                    setChangePassSuccess(false);
                }, 1500);
            }
        } catch (e) {
            setChangePassError('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setChangePassLoading(false);
        }
    };

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

                    <h1 className="text-lg sm:text-xl font-bold text-foreground">{config.title}</h1>
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
                                <span className="text-sm font-bold"> {config.avatarText}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => {
                                setChangePassError('');
                                setChangePassSuccess(false);
                                setChangePassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                setChangePassOpen(true);
                            }}>
                                <Lock size={16} />
                                <span>Đổi mật khẩu</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            
                            <>
                                <DropdownMenuLabel>Quyền truy cập</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href="/" className="w-full flex items-center justify-between cursor-pointer gap-2">
                                        <div className="flex items-center gap-2">
                                            <Home size={16} />
                                            <span>Trang chủ</span>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                                {userRoles.map(r => {
                                    const path = ROLE_HOME[r] || '/';
                                    const isActive = pathname.startsWith(path);
                                    return (
                                        <DropdownMenuItem key={r} asChild>
                                            <Link href={path} className={`w-full flex items-center justify-between cursor-pointer ${isActive ? 'bg-accent text-primary font-bold' : ''}`}>
                                                <span>{roleNameMap[r] || r}</span>
                                                {isActive && <CheckCircle2 className="w-4 h-4 text-primary" />}
                                            </Link>
                                        </DropdownMenuItem>
                                    )
                                })}
                                <DropdownMenuSeparator />
                            </>

                            <DropdownMenuItem className="gap-2 cursor-pointer text-red-500" onClick={() => logoutActionHook()}>
                                <LogOut size={16} />
                                <span>Đăng xuất</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            {/* Change Password Dialog */}
            <Dialog open={changePassOpen} onOpenChange={(open) => {
                if (!changePassLoading) setChangePassOpen(open);
            }}>
                <DialogContent className="max-w-md mx-4 sm:mx-0">
                    <DialogHeader>
                        <DialogTitle>Đổi mật khẩu</DialogTitle>
                        <DialogDescription>
                            Vui lòng nhập mật khẩu hiện tại và mật khẩu mới của bạn.
                        </DialogDescription>
                    </DialogHeader>

                    {changePassError && (
                        <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-900/40 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 text-center animate-in fade-in duration-200">
                            {changePassError}
                        </div>
                    )}

                    {changePassSuccess && (
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/40 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 text-center flex items-center justify-center gap-1.5 animate-in fade-in duration-200">
                            <CheckCircle2 className="w-4 h-4" /> Đổi mật khẩu thành công!
                        </div>
                    )}

                    <form onSubmit={handleChangePassSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mật khẩu hiện tại</label>
                            <Input
                                required
                                type="password"
                                value={changePassForm.currentPassword}
                                onChange={(e) => setChangePassForm(p => ({ ...p, currentPassword: e.target.value }))}
                                disabled={changePassLoading || changePassSuccess}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mật khẩu mới</label>
                            <Input
                                required
                                type="password"
                                value={changePassForm.newPassword}
                                onChange={(e) => setChangePassForm(p => ({ ...p, newPassword: e.target.value }))}
                                disabled={changePassLoading || changePassSuccess}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Xác nhận mật khẩu mới</label>
                            <Input
                                required
                                type="password"
                                value={changePassForm.confirmPassword}
                                onChange={(e) => setChangePassForm(p => ({ ...p, confirmPassword: e.target.value }))}
                                disabled={changePassLoading || changePassSuccess}
                            />
                        </div>

                        <DialogFooter className="pt-4 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setChangePassOpen(false)}
                                disabled={changePassLoading}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={changePassLoading || changePassSuccess}
                            >
                                {changePassLoading ? (
                                    <span className="flex items-center gap-1.5">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Đang cập nhật...
                                    </span>
                                ) : 'Cập nhật'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

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


export const notifications = [
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
