'use client';

import { Filter } from 'lucide-react';
import { SortButtonDynamic } from '@/_components/query/sort-Button-dynamic';
import React from 'react';
import { SearchBoxWithField } from '@/_components/query/SearchBoxWithField';
import { DepartmentSearchOptions, DepartmentSortOptions } from '@/_constants/department-constant';
import { storeDepartmentListPublic } from '@/working-public/department-Public/department-public-store';
import { getPublicDepartmentsListAction } from '@/working-public/department-Public/department-public-hook';


export default function DepartmentHeader() {
    const page = storeDepartmentListPublic((s) => s.query.page);
    const sort = storeDepartmentListPublic((s) => s.query.sort);
    const field = storeDepartmentListPublic((s) => s.searchField);
    const isSearch = storeDepartmentListPublic((s) => s.isSearch);
    const setField = storeDepartmentListPublic((s) => s.setSearchField);

    React.useEffect(() => {
        getPublicDepartmentsListAction();
    }, [page, sort, isSearch]);

    return (
        <div className="space-y-8 py-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Danh sách Khoa đào tạo
                </h1>
                <p className="text-muted-foreground text-sm">
                    Xem thông tin công khai về các khoa đào tạo và danh sách cán bộ, giảng viên trực thuộc.
                </p>
            </div>

            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col lg:flex-row gap-6 lg:items-center">

                <SearchBoxWithField
                    store={storeDepartmentListPublic}
                    fieldOptions={DepartmentSearchOptions}
                    field={field}
                    onFieldChange={setField}
                    placeholder={(f) => f === "name" ? "Tìm tên khoa..." : "Nhập mã khoa..."}
                />

                <div className="hidden lg:block w-px h-8 bg-border" />

                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Sắp xếp theo:
                    </span>

                    <div className="flex gap-2">
                        {DepartmentSortOptions.map((item) => (
                            <SortButtonDynamic
                                key={item.value}
                                field={item.value}
                                label={item.label}
                                store={storeDepartmentListPublic}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}