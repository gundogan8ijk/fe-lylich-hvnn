'use client';

import { Filter } from 'lucide-react';
import { SortButtonDynamic } from '@/_components/query/sort-Button-dynamic';
import React from 'react';
import { SearchBoxWithField } from '@/_components/query/SearchBoxWithField';
import { DepartmentSearchOptions, DepartmentSortOptions } from '@/_constants/department-constant';
import { storeDepartmentListPublic } from '@/department-Manager/department-manger-store';
import { getDepartmentsListPublicAction } from '@/department-Manager/department-manger-hook';
import DepartmentAddDialog from './department-add-dialog';


export default function DepartmentHeader() {
    const page = storeDepartmentListPublic((s) => s.query.page);
    const sort = storeDepartmentListPublic((s) => s.query.sort);
    const field = storeDepartmentListPublic((s) => s.searchField);
    const isSearch = storeDepartmentListPublic((s) => s.isSearch);
    const setField = storeDepartmentListPublic((s) => s.setSearchField);

    React.useEffect(() => {
        getDepartmentsListPublicAction();
    }, [page, sort, isSearch]);

    return (
        <div className="mb-12 space-y-8">
            <div className="relative flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                <h1 className="text-3xl pb-1 md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Danh sách khoa đào tạo
                </h1>
                <DepartmentAddDialog />
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