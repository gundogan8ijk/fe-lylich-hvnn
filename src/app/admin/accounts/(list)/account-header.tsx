'use client';

import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { Role } from "@/Authen/auth-type";
import { SearchBoxState } from "@/_components/query/search-Box-state";

import { Button } from "@/_components/ui/button";
import { Plus } from "lucide-react";
import DialogCreateLecturerAccount from "./dialog-create-lecturer-account";

import DialogCreateManagerAccount from "./dialog-create-manager-account";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";

export default function AccountHeader() {
    const { query, isSearch, role, setRole, refreshTrigger } = useAccountAdminStore();
    const [isAddLecturerOpen, setIsAddLecturerOpen] = useState(false);
    const [isAddManagerOpen, setIsAddManagerOpen] = useState(false);

    useEffect(() => {
        import("@/working-admin/account/account-admin-hook").then((m) => m.getAccountAdminListAction());
    }, [query.page, query.sort, query.search, isSearch, role, refreshTrigger]);

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 pt-0 border-b border-border/50">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Danh sách Tài khoản
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Quản lý tất cả tài khoản trong hệ thống
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Select value={role || "All"} onValueChange={(val) => { setRole(val); }}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">Tất cả</SelectItem>
                        <SelectItem value={Role.ADMIN}>Quản trị viên</SelectItem>
                        <SelectItem value={Role.MANAGER}>Quản lý</SelectItem>
                        <SelectItem value={Role.LECTURER}>Giảng viên</SelectItem>
                        <SelectItem value="None">Chưa có tài khoản</SelectItem>
                    </SelectContent>
                </Select>

                <SearchBoxState
                    store={useAccountAdminStore}
                    placeholder="Tìm theo email hoặc username..."
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Thêm tài khoản
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsAddLecturerOpen(true)}>
                            Thêm Giảng viên
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAddManagerOpen(true)}>
                            Thêm Quản lý
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <DialogCreateLecturerAccount 
                isOpen={isAddLecturerOpen} 
                onClose={() => setIsAddLecturerOpen(false)} 
            />
            
            <DialogCreateManagerAccount 
                isOpen={isAddManagerOpen} 
                onClose={() => setIsAddManagerOpen(false)} 
            />
        </div>
    );
}
