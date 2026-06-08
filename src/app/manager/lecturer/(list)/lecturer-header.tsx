'use client';

import { Filter } from 'lucide-react';
import { SortButtonDynamic } from '@/_components/query/sort-Button-dynamic';
import React from 'react';
import { SearchBoxWithField } from '@/_components/query/SearchBoxWithField';
import { LecturerSearchOptions, LecturerSortOptions } from '@/_constants/lecturer-constant';
import { storeLecturerListManger } from '@/working-manager/lecturer/lecturer-manger-store';
import { getListLecturerManagerAction } from '@/working-manager/lecturer/lecturer-manger-hook';
import LecturerAddDialog from './lecturer-add-dialog';

export default function LecturerHeader() {
    const page = storeLecturerListManger((s) => s.query.page);
    const sort = storeLecturerListManger((s) => s.query.sort);
    const field = storeLecturerListManger((s) => s.searchField);
    const isSearch = storeLecturerListManger((s) => s.isSearch);
    const setField = storeLecturerListManger((s) => s.setSearchField);

    React.useEffect(() => {
        getListLecturerManagerAction();
    }, [page, sort, isSearch]);

    return (
        <div className="mb-12 space-y-8">
            <div className="relative flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                <h1 className="text-3xl pb-1 md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Danh sách giảng viên
                </h1>
                <LecturerAddDialog />
            </div>

            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col lg:flex-row gap-6 lg:items-center">
                <SearchBoxWithField
                    store={storeLecturerListManger}
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
                                store={storeLecturerListManger}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
