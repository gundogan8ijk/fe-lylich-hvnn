'use client';

import { Filter } from 'lucide-react';
import { DepartmentSearchOptions, DepartmentSortOptions, } from '@/types/department-type';
import { storeDepartment } from '@/stores/store-list/department-store';
import { SortButtonDynamic } from '@/components/query/sort-Button-dynamic';
import React from 'react';
import { getDepartmentsListAction } from '@/hooks/department-hook';
import { SearchBoxWithField } from '@/components/query/SearchBoxWithField';


export default function DepartmentHeader() {
    const page = storeDepartment((s) => s.query.page);
    const sort = storeDepartment((s) => s.query.sort);
    const field = storeDepartment((s) => s.searchField);
    const isSearch = storeDepartment((s) => s.isSearch);
    const setField = storeDepartment((s) => s.setSearchField);

    React.useEffect(() => {
        getDepartmentsListAction();
    }, [page, sort, isSearch]);

    return (
        <div className="mb-12 space-y-8">
            <div className="relative">
                <h1 className="text-3xl pb-1 md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Danh sách khoa đào tạo
                </h1>
            </div>

            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col lg:flex-row gap-6 lg:items-center">

                <SearchBoxWithField
                    store={storeDepartment}
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
                                store={storeDepartment}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}