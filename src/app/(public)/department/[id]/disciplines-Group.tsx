'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface DataItem {
    id: string;
    name: string;
}

interface DataTableProps {
    items: DataItem[];
    itemsPerPage?: number;
}

export function DisciplinesGroup({ items, itemsPerPage = 5 }: DataTableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) {
            return items;
        }

        return items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [items, searchQuery]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-6">Danh sách</h1>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm theo tên..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="pl-10 py-2 h-11"
                    />
                </div>

                <p className="text-sm text-muted-foreground mt-3">
                    {filteredItems.length} kết quả ({currentPage}/{totalPages})
                </p>
            </div>

            <div className="space-y-2 mb-8">
                {paginatedItems.length > 0 ? (
                    paginatedItems.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 bg-white border border-border rounded-lg hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer"
                        >
                            <h3 className="text-base font-medium text-foreground">
                                {item.name}
                            </h3>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center border border-border rounded-lg bg-secondary/20">
                        <p className="text-muted-foreground">Không có kết quả phù hợp</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between gap-4">
                    <Button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Trước
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`min-w-8 h-8 rounded text-sm font-medium transition-all ${currentPage === page
                                        ? 'bg-primary text-primary-foreground'
                                        : 'border border-border text-foreground hover:border-primary hover:bg-secondary/50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                    >
                        Tiếp
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
