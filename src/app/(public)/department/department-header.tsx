'use client';

import { Filter } from 'lucide-react';
import { DepartmentSortOptions, SearchType } from '@/types/department-type';
import { storeDepartment } from '@/stores/department-store';
import { SearchBoxDynamic } from '@/components/query/search-Box-dynamic';
import { SortButtonDynamic } from '@/components/query/sortButton-dynamic';
import { SearchSelectDynamic } from '@/components/query/SearchSelect-dynamic';
import React from 'react';
import { getDepartmentsListAction } from '@/hooks/department-hook';

interface DepartmentHeaderProps {
    onSearch?: (value: string, type: SearchType) => void;
}

export default function DepartmentHeader(
    onSearch: DepartmentHeaderProps) {
    const page = storeDepartment((s)=>s.query.page)

    const field = storeDepartment((s) => s.field)

    React.useEffect(() => {
        getDepartmentsListAction(page);
    }, [page]);

    return (
        <div className="mb-12 space-y-8">
            {/* Header Title with Gradient */}
            <div className="relative">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Danh sách khoa đào tạo
                </h1>
            </div>

            {/* Glassmorphism Control Bar */}
            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col lg:flex-row gap-6 lg:items-center">

                {/* Search Section */}
                <div className="flex flex-1 items-center gap-3">


                    <SearchBoxDynamic store={storeDepartment} showButton={false} placeholder={field === 'name' ? 'Tìm tên khoa...' : 'Nhập mã khoa...'} />

                    <SearchSelectDynamic
                        useStore={storeDepartment} />
                </div>

                {/* Separator for Desktop */}
                <div className="hidden lg:block w-px h-8 bg-border" />

                {/* Sort Section */}
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
