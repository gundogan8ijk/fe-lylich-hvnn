'use client';

import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { Badge } from "@/_components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";
import { Button } from "@/_components/ui/button";
import { MoreHorizontal, Lock, Unlock, ShieldAlert, Trash2 } from "lucide-react";

import { useState } from "react";
import DialogDeleteAccount from "./dialog-delete-account";
import DialogLockAccount from "./dialog-lock-account";
import DialogUnlockAccount from "./dialog-unlock-account";
import DialogRevokeRole from "./dialog-revoke-role";
import DialogAddRole from "./dialog-add-role";
import DialogLockInfo from "./dialog-lock-info";
import DialogLinkLecturer from "./dialog-link-lecturer";
import { AccountItemDto } from "@/working-admin/account/account-admin-type";
import { Plus, X, UserCog } from "lucide-react";
import { Role } from "@/Authen/auth-type";

export default function AccountTable() {
    const { data, loading } = useAccountAdminStore();
    
    const [selectedAccount, setSelectedAccount] = useState<AccountItemDto | null>(null);
    const [dialogType, setDialogType] = useState<"lock" | "unlock" | "delete" | "add-role" | "revoke-role" | "lock-info" | "link-lecturer" | null>(null);
    const [roleToRevoke, setRoleToRevoke] = useState<string>("");

    const openDialog = (type: "lock" | "unlock" | "delete" | "add-role" | "revoke-role" | "lock-info" | "link-lecturer", account: AccountItemDto, role?: string) => {
        setSelectedAccount(account);
        setDialogType(type);
        if (role) setRoleToRevoke(role);
    };

    const closeDialog = () => {
        setDialogType(null);
        setSelectedAccount(null);
    };

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
                    {data.map((account) => {
                        const normalizedRoles = account.roles.map(r => r.toLowerCase());
                        const isAdminRole = normalizedRoles.includes(Role.ADMIN.toLowerCase());
                        const hasManagerRole = normalizedRoles.includes(Role.MANAGER.toLowerCase());
                        const hasLecturerRole = normalizedRoles.includes(Role.LECTURER.toLowerCase());
                        const canAddManager = !hasManagerRole;
                        const canAddLecturer = !hasLecturerRole && !!account.lecturerId;
                        const canAddAnyRole = canAddManager || canAddLecturer;

                        return (
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
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground italic">Chưa liên kết</span>
                                            <button
                                                onClick={() => openDialog("link-lecturer", account)}
                                                className="inline-flex items-center justify-center p-0.5 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition shadow-sm outline-none"
                                                title="Liên kết giảng viên"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 align-middle">
                                    <div className="flex flex-wrap gap-1 items-center">
                                        {account.roles.length > 0 ? account.roles.map(r => {
                                            const isCurrentRoleAdmin = r.toLowerCase() === Role.ADMIN.toLowerCase();
                                            return (
                                                <Badge key={r} variant="secondary" className="text-xs group flex items-center pr-1.5">
                                                    {r}
                                                    {!isCurrentRoleAdmin && (
                                                        <button
                                                            onClick={() => openDialog("revoke-role", account, r)}
                                                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive outline-none"
                                                            title={`Xóa quyền ${r}`}
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </Badge>
                                            );
                                        }) : <span className="text-xs text-muted-foreground">Không có</span>}
                                        
                                        {canAddAnyRole && !isAdminRole && (
                                            <button
                                                onClick={() => openDialog("add-role", account)}
                                                className="ml-1 inline-flex items-center justify-center p-0.5 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition shadow-sm"
                                                title="Thêm quyền"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 align-middle">
                                    {account.isLocked ? (
                                        <button onClick={() => openDialog("lock-info", account)} title="Xem thông tin khóa" className="outline-none">
                                            <Badge variant="destructive" className="flex w-fit items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                                                <Lock className="h-3 w-3" /> Bị khóa
                                            </Badge>
                                        </button>
                                    ) : (
                                        <Badge variant="outline" className="flex w-fit items-center gap-1 bg-green-500/10 text-green-600 border-green-500/20">
                                            <Unlock className="h-3 w-3" /> Hoạt động
                                        </Badge>
                                    )}
                                </td>
                                <td className="p-4 align-middle text-right">
                                    {!isAdminRole && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Mở menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {canAddAnyRole && (
                                                    <DropdownMenuItem className="cursor-pointer" onClick={() => openDialog("add-role", account)}>
                                                        <UserCog className="mr-2 h-4 w-4" />
                                                        Thêm quyền
                                                    </DropdownMenuItem>
                                                )}
                                                {!account.isLocked ? (
                                                    <DropdownMenuItem className="text-amber-600 focus:text-amber-600 cursor-pointer" onClick={() => openDialog("lock", account)}>
                                                        <Lock className="mr-2 h-4 w-4" />
                                                        Khóa tài khoản
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem className="text-green-600 focus:text-green-600 cursor-pointer" onClick={() => openDialog("unlock", account)}>
                                                        <Unlock className="mr-2 h-4 w-4" />
                                                        Mở khóa
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => openDialog("delete", account)}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Xóa tài khoản
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {selectedAccount && dialogType === "delete" && (
                <DialogDeleteAccount isOpen={true} onClose={closeDialog} account={selectedAccount} />
            )}
            {selectedAccount && dialogType === "lock" && (
                <DialogLockAccount isOpen={true} onClose={closeDialog} account={selectedAccount} />
            )}
            {selectedAccount && dialogType === "unlock" && (
                <DialogUnlockAccount isOpen={true} onClose={closeDialog} account={selectedAccount} />
            )}
            {selectedAccount && dialogType === "add-role" && (
                <DialogAddRole isOpen={true} onClose={closeDialog} account={selectedAccount} />
            )}
            {selectedAccount && dialogType === "revoke-role" && (
                <DialogRevokeRole isOpen={true} onClose={closeDialog} account={selectedAccount} roleToRevoke={roleToRevoke} />
            )}
            {selectedAccount && dialogType === "lock-info" && (
                <DialogLockInfo isOpen={true} onClose={closeDialog} account={selectedAccount} />
            )}
            {selectedAccount && dialogType === "link-lecturer" && (
                <DialogLinkLecturer isOpen={true} onClose={closeDialog} account={selectedAccount} />
            )}
        </div>
    );
}
