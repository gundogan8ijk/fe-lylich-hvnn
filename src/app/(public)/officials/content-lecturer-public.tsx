'use client'

import React from 'react';
import { Card } from '@/_components/ui/card';
import { Badge } from '@/_components/ui/badge';
import Image from 'next/image';
import { Button } from '@/_components/ui/button';
import { Building2, BookOpen, Filter, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { storeLecturerListPublic } from '@/working-public/lecturer-Public/lecturer-public-store';
import { getPublicLecturersListAction } from '@/working-public/lecturer-Public/lecturer-public-hook';
import { SearchBoxWithField } from '@/_components/query/SearchBoxWithField';
import { SortButtonDynamic } from '@/_components/query/sort-Button-dynamic';
import { LecturerSearchOptions, LecturerSortOptions } from '@/_constants/lecturer-constant';
import PaginationButtonStore from '@/_components/query/paginationButton-dynamic';

export default function ContentLecturerPublic() {
    const data = storeLecturerListPublic((state) => state.data);
    const isLoading = storeLecturerListPublic((state) => state.loading);
    const page = storeLecturerListPublic((s) => s.query.page);
    const sort = storeLecturerListPublic((s) => s.query.sort);
    const field = storeLecturerListPublic((s) => s.searchField);
    const isSearch = storeLecturerListPublic((s) => s.isSearch);
    const setField = storeLecturerListPublic((s) => s.setSearchField);
    const router = useRouter();

    React.useEffect(() => {
        getPublicLecturersListAction();
    }, [page, sort, isSearch]);

    const getInitials = (name: string) =>
        name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="space-y-8 py-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Danh sách giảng viên
                </h1>
                <p className="text-muted-foreground text-sm">
                    Xem lý lịch khoa học công khai của các cán bộ, giảng viên Học viện.
                </p>
            </div>

            {/* Filter Section */}
            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col lg:flex-row gap-6 lg:items-center">
                <SearchBoxWithField
                    store={storeLecturerListPublic}
                    fieldOptions={LecturerSearchOptions}
                    field={field}
                    onFieldChange={setField}
                    placeholder={(f) => f === "name" ? "Tìm tên giảng viên..." : "Nhập mã giảng viên..."}
                />

                <div className="hidden lg:block w-px h-8 bg-border" />

                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Sắp xếp theo:
                    </span>

                    <div className="flex gap-2">
                        {LecturerSortOptions.map((item) => (
                            <SortButtonDynamic
                                key={item.value}
                                field={item.value}
                                label={item.label}
                                store={storeLecturerListPublic}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
            ) : !data || data.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
                    <p className="text-lg">Không tìm thấy giảng viên nào</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.map((lecturer) => (
                        <Card key={lecturer.lecturerId} className="pt-0 relative overflow-hidden bg-card border-muted">
                            <div className="relative h-40 overflow-hidden bg-slate-100">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

                                {lecturer.avatarUrl ? (
                                    <Image
                                        src={lecturer.avatarUrl}
                                        alt={lecturer.fullName}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted text-4xl">
                                        {lecturer.fullName.charAt(0)}
                                    </div>
                                )}

                                <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1">
                                    <Badge className="bg-white/90 backdrop-blur-sm text-emerald-700 border-none shadow-sm hover:bg-white w-fit">
                                        {lecturer.code}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col h-[200px] justify-between">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold leading-tight line-clamp-2 pb-2">
                                        {lecturer.fullName}
                                    </h3>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="p-1.5 rounded-md bg-emerald-50">
                                                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                                            </div>
                                            <span className="line-clamp-1">{lecturer.departmentName || "Chưa cập nhật khoa"}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="p-1.5 rounded-md bg-orange-50">
                                                <BookOpen className="w-3.5 h-3.5 text-orange-600" />
                                            </div>
                                            <span className="line-clamp-1">{lecturer.disciplineName ? `Bộ môn ${lecturer.disciplineName}` : "Chưa cập nhật bộ môn"}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full mt-2 relative overflow-hidden bg-emerald-600 hover:bg-emerald-700 text-white"
                                    asChild>
                                    <Link href={`/officials/${lecturer.lecturerId}`} className="flex items-center justify-center">
                                        Xem chi tiết
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="pt-6">
                <PaginationButtonStore store={storeLecturerListPublic} />
            </div>
        </div>
    );
}
