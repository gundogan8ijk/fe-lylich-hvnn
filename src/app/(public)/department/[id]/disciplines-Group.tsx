'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { DisciplineList } from '@/_types/department-type';
import Loading from '@/components/utils/Loading';
import { ListQuery, SortDirection } from '@/_types/base-type/query-types';
import { toSearchParams } from '@/lib/query-options-toUrl-helper';
import { getListDisciplineAction } from '@/_hooks/department-hook';
import { getPages } from '@/lib/getPages -Button-helper';

const PerPage = 20;

export function DisciplinesGroup({ id }: { id: string }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [disciplineList, setDisciplineList] = useState<DisciplineList | null>(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            const query: ListQuery<undefined, SortDirection> = {
                search: searchQuery,
                filters: undefined,
                sort: null,
                page: currentPage,
                perPage: PerPage,
            };

            const queryParam = toSearchParams(query);

            const res = await getListDisciplineAction(id, queryParam);
            if (res) setDisciplineList(res);

            setLoading(false);
        }

        fetchData();
    }, [id, currentPage, isSearch]);

    const handleSearch = () => {
        setIsSearch(prev => !prev);
        setCurrentPage(1);
    };

    if (isLoading) return <Loading></Loading>;
    if (!disciplineList) return <></>;

    const items = disciplineList.items ?? [];
    const paged = disciplineList.pagination;

    return (
        <div className="max-w-4xl mx-auto mt-7 px-4 py-5">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-5">Danh sách chuyên ngành</h2>

                <div className="flex items-center gap-4">
                    {/* SEARCH */}
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

                        <Input
                            placeholder="Tìm kiếm theo tên..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch();
                            }}
                            className="pl-10 h-11 bg-gradient-to-br from-sky-100 to-slate-100 rounded-2xl outline-none"
                        />
                    </div>

                    {/* INFO */}
                    <p className="text-sm whitespace-nowrap">
                        {items.length} kết quả | ({currentPage}/{paged.totalPages || 1})
                    </p>
                </div>


            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 border rounded-lg hover:shadow-md"
                        >
                            {item.name}
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center border rounded-lg col-span-full">
                        chưa đăng kí đào tạo chuyên ngành
                    </div>
                )}
            </div>

            {paged.totalPages > 1 && (
                <div className="flex items-center justify-center gap-x-5">
                    <Button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Trước
                    </Button>

                    {getPages(currentPage, paged.totalPages).map((page, idx) => (
                        page === '...'
                            ? (
                                <span key={`dots-${idx}`} className="px-2">
                                    ...
                                </span>
                            )
                            : (
                                <button
                                    key={`page-${page}`}
                                    onClick={() => setCurrentPage(page as number)}
                                    className={`w-8 h-8 rounded ${currentPage === page ? 'bg-black text-white' : 'border'
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                    ))}

                    <Button
                        onClick={() => setCurrentPage(p => Math.min(paged.totalPages, p + 1))}
                        disabled={currentPage === paged.totalPages}
                        variant="outline"
                        size="sm"
                    >
                        Tiếp
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}