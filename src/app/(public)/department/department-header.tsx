'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

import {Search, Filter } from 'lucide-react';
import {  DepartmentSearchFieldOptions, DepartmentSortOptions, SearchType } from '@/types/department-type';
import { SortButton } from '@/components/query/sortButton-Props';
import { storeDepartment } from '@/stores/department-store';
import { SearchSelect } from '@/components/query/search-Selection';



interface DepartmentHeaderProps {
    onSearch?: (value: string, type: SearchType) => void;
}

export default function DepartmentHeader({
    onSearch,
}: DepartmentHeaderProps) {
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState<SearchType>('name');

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        onSearch?.(value, searchType);
    };



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
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder={searchType === 'name' ? 'Tìm tên khoa...' : 'Nhập mã khoa...'}
                            value={searchValue}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30 rounded-xl transition-all"
                        />
                    </div>

                    {/* <Select value={searchType} onValueChange={(v: SearchType) => setSearchType(v)}> */}
                        <SearchSelect
                        value={searchType}
                        onChange={setSearchType}
                        options={DepartmentSearchFieldOptions}
                    />
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
                            <SortButton
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
