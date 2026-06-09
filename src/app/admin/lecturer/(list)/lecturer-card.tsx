"use client";

import { LecturerItemAccountRecord } from "@/working-admin/lecturer/lecturer-admin-type";
import { User, PlusCircle, Key, Hash, Phone, CreditCard, Mail, Plus, MoreVertical, Lock, Unlock, ShieldAlert, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Role } from "@/Authen/auth-type";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import CreateAccountDialog from "./Create-Account-Dialog";
import LockAccountDialog from "./Lock-Account-Dialog";
import UnlockAccountDialog from "./Unlock-Account-Dialog";
import DeleteAccountDialog from "./Delete-Account-Dialog";
import Image from "next/image";
import AddRoleDialog from "./Add-Role-Dialog";
import LockInfoDialog from "./Lock-Info-Dialog";
import RevokeRoleDialog from "./Revoke-Role-Dialog";

interface Props {
    data: LecturerItemAccountRecord;
}

export default function LecturerCard({ data }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
    const [isLockOpen, setIsLockOpen] = useState(false);
    const [isUnlockOpen, setIsUnlockOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isLockInfoOpen, setIsLockInfoOpen] = useState(false);
    const [isRevokeOpen, setIsRevokeOpen] = useState(false);
    const [roleToRevoke, setRoleToRevoke] = useState("");

    const normalizedRoles = (data.roles || []).map((r: unknown) => {
        const obj = r as { name?: string; Name?: string };
        return String(obj?.name || obj?.Name || r).toLowerCase();
    });

    const hasAccount = !!data.accountId;
    const hasManagerRole = normalizedRoles.includes(Role.MANAGER.toLowerCase());
    const hasLecturerRole = normalizedRoles.includes(Role.LECTURER.toLowerCase());
    const isAdminRole = normalizedRoles.includes(Role.ADMIN.toLowerCase());
    const hasBothRoles = hasManagerRole && hasLecturerRole;

    const roleNames = (data.roles || []).map((r: unknown) => {
        const obj = r as { name?: string; Name?: string };
        return String(obj?.name || obj?.Name || r);
    });

    return (
        <div className="flex flex-col bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
            <div className="relative h-24 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="absolute -bottom-10 left-6">
                    <div className="h-20 w-20 rounded-full border-4 border-background bg-muted overflow-hidden flex items-center justify-center">
                        {data.avatarUrl ? (
                            <Image src={data.avatarUrl} alt={data.fullName} width={80} height={80} className="h-full w-full object-cover" unoptimized />
                        ) : (
                            <User className="h-10 w-10 text-muted-foreground/50" />
                        )}
                    </div>
                </div>

                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <div className="flex gap-1 items-center flex-wrap justify-end">
                        {roleNames.map((roleName) => {
                            const isCurrentRoleAdmin = roleName.toLowerCase() === Role.ADMIN.toLowerCase();
                            
                            return (
                                <span key={roleName} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 group">
                                    {roleName}
                                    {hasAccount && !isCurrentRoleAdmin && (
                                        <button 
                                            onClick={() => {
                                                setRoleToRevoke(roleName);
                                                setIsRevokeOpen(true);
                                            }}
                                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive outline-none"
                                            title={`Xóa quyền ${roleName}`}
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </span>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-1.5 justify-end">
                        {/* Chưa có account → nút tạo */}
                        {!hasAccount && (
                            <button
                                onClick={() => setIsCreateOpen(true)}
                                className="inline-flex items-center justify-center p-1.5 rounded-full bg-primary text-white hover:bg-primary/90 transition shadow-sm"
                                title="Tạo tài khoản"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        )}

                        {/* Có account nhưng chưa đủ 2 role → nút thêm role */}
                        {hasAccount && !hasBothRoles && (
                            <button
                                onClick={() => setIsAddRoleOpen(true)}
                                className="inline-flex items-center justify-center p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
                                title="Thêm quyền"
                            >
                                <PlusCircle className="w-3.5 h-3.5" />
                            </button>
                        )}

                        {/* Có account và không phải admin → dropdown lock/unlock/delete */}
                        {hasAccount && !isAdminRole && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="inline-flex items-center justify-center p-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition shadow-sm" title="Khác">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {!data.isLocked && (
                                        <DropdownMenuItem onClick={() => setIsLockOpen(true)} className="cursor-pointer text-amber-600 focus:text-amber-600">
                                            <Lock className="mr-2 h-4 w-4" /> Khóa tài khoản
                                        </DropdownMenuItem>
                                    )}
                                    {data.isLocked && (
                                        <DropdownMenuItem onClick={() => setIsUnlockOpen(true)} className="cursor-pointer text-green-600 focus:text-green-600">
                                            <Unlock className="mr-2 h-4 w-4" /> Mở khóa
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} className="cursor-pointer text-destructive focus:text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" /> Xóa tài khoản
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 pt-12 pb-5 px-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-1" title={data.fullName}>
                        {data.fullName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                        <Hash className="w-3.5 h-3.5" />
                        <span>{data.lecturerCode}</span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-1">{data.email || "Chưa có Email"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-1">{data.cccd || "Chưa có CCCD"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4 shrink-0" />
                            <span>{data.gender || "Chưa xác định"}</span>
                        </div>
                        {data.isLocked && (
                            <button 
                                onClick={() => setIsLockInfoOpen(true)} 
                                className="inline-flex items-center justify-center p-1.5 rounded-full text-destructive hover:bg-destructive/10 transition-colors"
                                title="Xem thông tin khóa tài khoản"
                            >
                                <Lock className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isCreateOpen && <CreateAccountDialog isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} lecturer={data} />}
            {isAddRoleOpen && <AddRoleDialog isOpen={isAddRoleOpen} onClose={() => setIsAddRoleOpen(false)} lecturer={data} />}
            {isLockOpen && <LockAccountDialog isOpen={isLockOpen} onClose={() => setIsLockOpen(false)} lecturer={data} />}
            {isUnlockOpen && <UnlockAccountDialog isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} lecturer={data} />}
            {isDeleteOpen && <DeleteAccountDialog isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} lecturer={data} />}
            {isLockInfoOpen && <LockInfoDialog isOpen={isLockInfoOpen} onClose={() => setIsLockInfoOpen(false)} lecturer={data} />}
            {isRevokeOpen && <RevokeRoleDialog isOpen={isRevokeOpen} onClose={() => setIsRevokeOpen(false)} lecturer={data} roleToRevoke={roleToRevoke} />}
        </div>
    );
}