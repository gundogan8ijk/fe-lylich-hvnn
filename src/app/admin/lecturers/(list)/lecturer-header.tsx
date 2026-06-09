"use client";

import { SearchBoxWithField } from '@/_components/query/SearchBoxWithField';
import { LecturerSearchOptions } from '@/_constants/lecturer-constant';
import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import { Search } from "lucide-react";
import { useRef, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { Role } from "@/Authen/auth-type";

export default function LecturerHeader() {
    const { query, setQuery, role, setRole, isSearch, refreshTrigger, searchField, setSearchField } = useLecturerAdminStore();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        import("@/working-admin/lecturer/lecturer-admin-hook").then((m) => m.getLecturerAdminListAction());
    }, [query.page, query.sort, query.search, isSearch, role, refreshTrigger, searchField]);

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
                <Select value={role || "All"} onValueChange={(val) => { setRole(val); setQuery({ page: 1 }); }}>
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

                <SearchBoxWithField
                    store={useLecturerAdminStore as any}
                    fieldOptions={LecturerSearchOptions}
                    field={searchField}
                    onFieldChange={setSearchField}
                    placeholder={(f) => f === "name" ? "Tìm tên giảng viên..." : "Nhập mã giảng viên..."}
                />
            </div>
        </div>
    );
}
