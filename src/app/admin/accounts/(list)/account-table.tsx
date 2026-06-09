'use client';

import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { Badge } from "@/_components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";
import { Button } from "@/_components/ui/button";
import { MoreHorizontal, Lock, Unlock, ShieldAlert, Trash2 } from "lucide-react";
import dayjs from "dayjs";

export default function AccountTable() {
    const { data, loading } = useAccountAdminStore();

    if (loading) {
        return (
            <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle">Tài khoản</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle">Giảng viên</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle">Vai trò</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle">Trạng thái</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle"><div className="h-4 w-[200px] bg-muted animate-pulse rounded" /></td>
                                <td className="p-4 align-middle"><div className="h-4 w-[150px] bg-muted animate-pulse rounded" /></td>
                                <td className="p-4 align-middle"><div className="h-4 w-[100px] bg-muted animate-pulse rounded" /></td>
                                <td className="p-4 align-middle"><div className="h-4 w-[80px] bg-muted animate-pulse rounded" /></td>
                                <td className="p-4 align-middle text-right"><div className="h-8 w-8 ml-auto bg-muted animate-pulse rounded" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card/50">
                <div className="rounded-full bg-muted p-3 mb-4">
                    <ShieldAlert className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Không tìm thấy tài khoản</h3>
                <p className="text-sm text-muted-foreground mt-1">Không có tài khoản nào khớp với điều kiện tìm kiếm hiện tại.</p>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-b">
                    <tr>
                        <th className="h-12 px-4 font-medium text-muted-foreground align-middle">Email / Username</th>
                        <th className="h-12 px-4 font-medium text-muted-foreground align-middle">Liên kết Giảng viên</th>
                        <th className="h-12 px-4 font-medium text-muted-foreground align-middle">Vai trò</th>
                        <th className="h-12 px-4 font-medium text-muted-foreground align-middle">Trạng thái</th>
                        <th className="h-12 px-4 font-medium text-muted-foreground align-middle text-right">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((account) => (
                        <tr key={account.accountId} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle font-medium">
                                {account.email}
                            </td>
                            <td className="p-4 align-middle">
                                {account.lecturerId ? (
                                    <div>
                                        <div className="text-sm font-medium">{account.fullName}</div>
                                        <div className="text-xs text-muted-foreground">{account.lecturerCode}</div>
                                    </div>
                                ) : (
                                    <span className="text-sm text-muted-foreground italic">Chưa liên kết</span>
                                )}
                            </td>
                            <td className="p-4 align-middle">
                                <div className="flex flex-wrap gap-1">
                                    {account.roles.length > 0 ? account.roles.map(r => (
                                        <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
                                    )) : <span className="text-xs text-muted-foreground">Không có</span>}
                                </div>
                            </td>
                            <td className="p-4 align-middle">
                                {account.isLocked ? (
                                    <Badge variant="destructive" className="flex w-fit items-center gap-1">
                                        <Lock className="h-3 w-3" /> Bị khóa
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="flex w-fit items-center gap-1 bg-green-500/10 text-green-600 border-green-500/20">
                                        <Unlock className="h-3 w-3" /> Hoạt động
                                    </Badge>
                                )}
                            </td>
                            <td className="p-4 align-middle text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Mở menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="text-destructive">
                                            {account.isLocked ? <Unlock className="mr-2 h-4 w-4" /> : <Lock className="mr-2 h-4 w-4" />}
                                            {account.isLocked ? "Mở khóa" : "Khóa tài khoản"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Xóa tài khoản
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
