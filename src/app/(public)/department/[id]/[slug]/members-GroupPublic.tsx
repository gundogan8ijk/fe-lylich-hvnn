'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Search, BookOpen, Award, Calendar } from 'lucide-react';
import Loading from '@/_components/utils/Loading';
import { getPages } from '@/_lib/getPages -Button-helper';
import { toSearchParams } from '@/_lib/query-options-toUrl-helper';
import { getInitials, getYear } from '@/_lib/display-variable-helper';
import Image from 'next/image';
import { ACADEMIC_POSITION_LABELS, AcademicPositionName } from '@/_constants/department-constant';
import { DepartmentMembersListPublic } from '@/working-public/department-Public/department-public-type';
import { ListQuery, SortDirection } from '@/_Common/_types/query-types';
import { getListMemberByPublicDisciplineAction } from '@/working-public/department-Public/department-public-hook';

function AvatarWithFallback({ src, alt, fullName }: { src: string | null | undefined; alt: string; fullName: string }) {
    const [error, setError] = useState(false);
    if (error || !src) {
        return (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">{getInitials(fullName)}</span>
            </div>
        );
    }
    return (
        <Image
            src={src}
            alt={alt}
            width={48}
            height={48}
            unoptimized
            className="rounded-lg object-cover flex-shrink-0"
            onError={() => setError(true)}
        />
    );
}

export function MembersGroupPublic({ departmentId, disciplineId }: { departmentId: string, disciplineId: string }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const LocalPerPage = 12;
    const [memberList, setMemberList] = useState<DepartmentMembersListPublic | null>(null);
    const [isLoading, setLoading] = useState(false);

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

            const res = await getListMemberByPublicDisciplineAction(departmentId, disciplineId, queryParam);
            if (res) setMemberList(res);

            setLoading(false);
        }

        fetchData();
    }, [departmentId, disciplineId, isSearch]);

    const handleSearch = () => {
        setIsSearch(prev => !prev);
        setCurrentPage(1);
    };

    if (isLoading) return <Loading></Loading>;
    if (!memberList) return <></>;

    const items = memberList.items ?? [];

    let filteredItems = items;

    if (searchQuery.trim()) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.fullName.toLowerCase().includes(lowerQuery) ||
            item.lecturerCode.toLowerCase().includes(lowerQuery)
        );
    }

    const totalLocalPages = Math.ceil(filteredItems.length / LocalPerPage) || 1;
    const paginatedItems = filteredItems.slice((currentPage - 1) * LocalPerPage, currentPage * LocalPerPage);

    return (
        <div className="w-full px-4">
            <div className="w-full max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-foreground">Danh sách giảng viên</h2>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                        {/* SEARCH */}
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

                            <Input
                                placeholder="Tìm kiếm theo tên..."
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
                                onClick={() => router.push(`/officials/${item.id}`)}
                                className="p-5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    <AvatarWithFallback
                                        src={item.avatarUrl}
                                        alt={item.fullName}
                                        fullName={item.fullName}
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-3">
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {item.fullName}
                                            </h3>
                                            <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                                                {item.lecturerCode}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <BookOpen className="w-4 h-4 flex-shrink-0 text-primary/60" />
                                                <span>{item.disciplineName}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Award className="w-4 h-4 flex-shrink-0 text-primary/60" />
                                                <span className="font-semibold">{ACADEMIC_POSITION_LABELS[item.position as AcademicPositionName] || item.position}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4 flex-shrink-0 text-primary/60" />
                                                <span>Tham gia: {getYear(item.joinedAt)}</span>
                                            </div>
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
