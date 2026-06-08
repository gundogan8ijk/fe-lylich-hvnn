'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Loading from '@/_components/utils/Loading';
import { toSearchParams } from '@/_lib/query-options-toUrl-helper';
import { getPages } from '@/_lib/getPages -Button-helper';
import { ListQuery, SortDirection } from '@/_Common/_types/query-types';
import { DisciplineOfDepartmentPublicList } from '@/working-manager/department/infor/department-manger-type';
import { getListDisciplineByDepartmentIdPublicAction } from '@/working-manager/department/infor/department-manger-hook';
import DisciplineAddDialog from './discipline-add-dialog';
import Link from 'next/link';

const PerPage = 20;

export function DisciplinesGroup({ id }: { id: string }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [disciplineList, setDisciplineList] = useState<DisciplineOfDepartmentPublicList | null>(null);
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

            const res = await getListDisciplineByDepartmentIdPublicAction(id, queryParam);
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
        <div className="w-full mt-8">
            <div className="w-full max-w-7xl mx-auto">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold">Danh sách chuyên ngành</h2>
                    <DisciplineAddDialog departmentId={id} onSuccess={() => handleSearch()} />
                </div>

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
                        <Link
                            href={`/manager/department/${id}/${item.id}`}
                            key={item.id}
                            className="p-4 border rounded-lg hover:shadow-md hover:border-primary transition-all duration-200 block cursor-pointer"
                        >
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        </Link>
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
        </div>
    );
}