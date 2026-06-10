'use client'

import React from 'react';
import { Card } from '@/_components/ui/card';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { BookOpen, Search, ArrowRight, Calendar, User, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storeBookListPublic } from '@/working-public/book-Public/book-public-store';
import { getPublicBooksListAction } from '@/working-public/book-Public/book-public-hook';
import PaginationButtonStore from '@/_components/query/paginationButton-dynamic';

export default function ContentBookPublic() {
    const data = storeBookListPublic((state) => state.data);
    const isLoading = storeBookListPublic((state) => state.loading);
    const page = storeBookListPublic((s) => s.query.page);
    const searchVal = storeBookListPublic((s) => s.query.search);
    const setQuery = storeBookListPublic((s) => s.setQuery);
    const router = useRouter();

    const [localSearch, setLocalSearch] = React.useState(searchVal || '');

    React.useEffect(() => {
        getPublicBooksListAction();
    }, [page, searchVal]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setQuery({ search: localSearch, page: 1 });
    };

    return (
        <div className="space-y-8 py-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Danh mục Sách khoa học
                </h1>
                <p className="text-muted-foreground text-sm">
                    Xem thông tin công khai về các ấn phẩm giáo trình, sách chuyên khảo do các cán bộ Học viện biên soạn.
                </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Tìm tên sách, ISBN, nhà xuất bản..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm">
                    Tìm kiếm
                </Button>
            </form>

            {/* Grid Content */}
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
            ) : !data || data.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
                    <p className="text-lg">Không tìm thấy sách hoặc giáo trình nào</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.map((book) => (
                        <Card key={book.id} className="p-6 bg-white border-none rounded-2xl flex flex-col justify-between gap-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600" />
                            <div className="space-y-3 pl-2">
                                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold uppercase">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>Sách / Giáo trình</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-slate-500 line-clamp-3">
                                    {book.describe || "Không có mô tả chi tiết."}
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-50">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Năm: {new Date(book.publishYear).getFullYear()}</span>
                                    </div>
                                    {book.publisher && (
                                        <div className="flex items-center gap-1.5 line-clamp-1">
                                            <span className="font-semibold text-slate-400">NXB:</span>
                                            <span className="truncate">{book.publisher}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pl-2 pt-2">
                                <span className="text-xs text-slate-400 font-medium">
                                    {book.isbn ? `ISBN: ${book.isbn}` : "Chưa có ISBN"}
                                </span>
                                <Button variant="ghost" className="text-emerald-600 hover:text-emerald-800 font-semibold gap-1"
                                    onClick={() => router.push(`/book/${book.id}`)}>
                                    <span>Xem chi tiết</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="pt-6">
                <PaginationButtonStore store={storeBookListPublic} />
            </div>
        </div>
    );
}
