"use client";

import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import { Search } from "lucide-react";
import { useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { Role } from "@/Authen/auth-type";

export default function LecturerHeader() {
    const { query, setQuery } = useLecturerAdminStore();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = (value: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setQuery({ search: value, page: 1 });
        }, 500);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 pt-0 border-b border-border/50">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Tài khoản Giảng viên
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Quản lý tài khoản và quyền của giảng viên trong hệ thống
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Select value={query.role} onValueChange={(val) => setQuery({ role: val, page: 1 })}>
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

                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        defaultValue={query.search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-9 h-10 w-full sm:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>
        </div>
    );
}
