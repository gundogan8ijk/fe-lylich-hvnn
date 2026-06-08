'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { ChevronLeft, ChevronRight, Search, BookOpen } from 'lucide-react';
import Loading from '@/_components/utils/Loading';
import { getPages } from '@/_lib/getPages -Button-helper';
import { toSearchParams } from '@/_lib/query-options-toUrl-helper';
import { CourseListResponse } from '@/working-manager/department/discipline/discipline-manger-type';
import { ListQuery, SortDirection } from '@/_Common/_types/query-types';
import { getListCourseByDisciplineAction } from '@/working-manager/department/discipline/discipline-manger-hook';
import AddDisciplineCourseDialog from './add-discipline-course-dialog';

export function CoursesGroup({ id, disciplineId }: { id: string, disciplineId: string }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const LocalPerPage = 10;
    const [courseList, setCourseList] = useState<CourseListResponse | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            const query: ListQuery<undefined, SortDirection> = {
                search: searchQuery,
                filters: undefined,
                sort: null,
                page: 1,
                perPage: 100, // Fetch max allowed for local filtering and pagination
            };

            const queryParam = toSearchParams(query);

            const res = await getListCourseByDisciplineAction(disciplineId, queryParam);
            if (res) setCourseList(res);

            setLoading(false);
        }

        fetchData();
    }, [disciplineId, isSearch, refreshTrigger]);

    const handleSearch = () => {
        setIsSearch(prev => !prev);
        setCurrentPage(1);
    };

    if (isLoading) return <Loading></Loading>;
    if (!courseList) return <></>;

    const items = courseList.items ?? [];

    let filteredItems = items;

    if (searchQuery.trim()) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.code.toLowerCase().includes(lowerQuery)
        );
    }

    const totalLocalPages = Math.ceil(filteredItems.length / LocalPerPage) || 1;
    const paginatedItems = filteredItems.slice((currentPage - 1) * LocalPerPage, currentPage * LocalPerPage);

    return (
        <div className="w-full px-4">
            <div className="w-full max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-foreground">Danh sách môn học</h2>
                        <AddDisciplineCourseDialog
                            disciplineId={disciplineId}
                            onAdded={() => setRefreshTrigger(prev => prev + 1)}
                        />
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                        {/* SEARCH */}
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

                            <Input
                                placeholder="Tìm kiếm theo tên hoặc mã..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                                className="pl-10 h-9 bg-white"
                            />
                        </div>

                        {/* INFO */}
                        <p className="text-sm whitespace-nowrap">
                            {filteredItems.length} kết quả | ({currentPage}/{totalLocalPages})
                        </p>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    {paginatedItems.length > 0 ? (
                        paginatedItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => router.push(`/manager/department/${id}/${disciplineId}/${item.id}`)}
                                className="p-5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-6 h-6 text-indigo-600" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {item.name}
                                            </h3>
                                            <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                                {item.code}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center border border-border rounded-xl bg-secondary/20">
                            <p className="text-muted-foreground">Không có kết quả phù hợp</p>
                        </div>
                    )}
                </div>

                {totalLocalPages > 1 && (
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

                        {getPages(currentPage, totalLocalPages).map((page, idx) => (
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
                            onClick={() => setCurrentPage(p => Math.min(totalLocalPages, p + 1))}
                            disabled={currentPage === totalLocalPages}
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
