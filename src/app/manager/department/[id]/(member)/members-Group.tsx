'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { ChevronLeft, ChevronRight, Search, BookOpen, Award, Calendar, Trash2 } from 'lucide-react';
import Loading from '@/_components/utils/Loading';
import { getPages } from '@/_lib/getPages -Button-helper';
import { toSearchParams } from '@/_lib/query-options-toUrl-helper';
import { getInitials, getYear } from '@/_lib/display-variable-helper';
import Image from 'next/image';
import Link from 'next/link';
import { DepartmentMembersListPublic } from '@/working-manager/department/infor/department-manger-type';
import { ListQuery, SortDirection } from '@/_Common/_types/query-types';
import { getListMemberDepartmentPublicAction, removeMemberDepartmentAction } from '@/working-manager/department/infor/department-manger-hook';
import AddMemberDialog from './add-member-dialog';
import EditMemberPositionDialog, { AcademicPositions } from './edit-member-position-dialog';
import FilterPosition from './filter-position';
import FilterDiscipline from './filter-discipline';
import SortJoinedAt from './sort-joined-at';
import RemoveMemberDialog from './remove-member-dialog';

const PerPage = 20;

export function MembersGroup({ id }: { id: string }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const LocalPerPage = 10;
    const [memberList, setMemberList] = useState<DepartmentMembersListPublic | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [positionFilter, setPositionFilter] = useState('all');
    const [disciplineFilter, setDisciplineFilter] = useState('all');
    const [sortJoinedAt, setSortJoinedAt] = useState('desc');

    useEffect(() => {
                // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1);
    }, [positionFilter, disciplineFilter, sortJoinedAt, searchQuery]);

    const getPositionDisplayName = (name: string) => {
        const pos = AcademicPositions.find(p => p.name === name);
        return pos ? pos.displayName : name;
    }

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

            const res = await getListMemberDepartmentPublicAction(id, queryParam);
            if (res) setMemberList(res);

            setLoading(false);
        }

        fetchData();
    }, [id, isSearch, refreshTrigger]);

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

    filteredItems = positionFilter === 'all' 
        ? filteredItems 
        : filteredItems.filter(item => item.position === positionFilter);

    filteredItems = disciplineFilter === 'all'
        ? filteredItems
        : filteredItems.filter(item => item.disciplineName === disciplineFilter);

    filteredItems = [...filteredItems].sort((a, b) => {
        const dateA = new Date(a.joinedAt).getTime();
        const dateB = new Date(b.joinedAt).getTime();
        return sortJoinedAt === 'desc' ? dateB - dateA : dateA - dateB;
    });

    const totalLocalPages = Math.ceil(filteredItems.length / LocalPerPage) || 1;
    const paginatedItems = filteredItems.slice((currentPage - 1) * LocalPerPage, currentPage * LocalPerPage);

    return (
        <div className="w-full px-4">
            <div className="w-full max-w-7xl mx-auto">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Danh sách giảng viên</h2>
                    <AddMemberDialog departmentId={id} onAdded={() => setRefreshTrigger(prev => prev + 1)} />
                </div>
                
                <div className="flex items-center gap-4 flex-wrap">
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
                            className="pl-10 h-9 bg-white"
                        />
                    </div>
                    
                    {/* FILTER POSITION */}
                    <FilterPosition value={positionFilter} onChange={setPositionFilter} />
                    
                    {/* FILTER DISCIPLINE */}
                    <FilterDiscipline departmentId={id} value={disciplineFilter} onChange={setDisciplineFilter} />

                    {/* SORT DATE */}
                    <SortJoinedAt value={sortJoinedAt} onChange={setSortJoinedAt} />

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
                            className="p-5 bg-white border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-200"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <Link href={`/manager/lecturer/${item.id}`} className="flex items-start gap-4 flex-1 min-w-0 group">
                                    {item.avatarUrl ? (
                                        <Image
                                            src={item.avatarUrl}
                                            alt={item.fullName}
                                            width={48}
                                            height={48}
                                            className=" rounded-lg object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <span className="text-sm font-semibold text-primary">{getInitials(item.fullName)}</span>
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-3">
                                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
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
                                            <span>{getPositionDisplayName(item.position)}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4 flex-shrink-0 text-primary/60" />
                                            <span>Tham gia: {getYear(item.joinedAt)}</span>
                                        </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* ACTIONS */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <EditMemberPositionDialog 
                                        departmentId={id} 
                                        lecturerId={item.id} 
                                        initialPosition={item.position} 
                                        onUpdated={() => setRefreshTrigger(prev => prev + 1)} 
                                    />
                                    <RemoveMemberDialog 
                                        departmentId={id} 
                                        lecturerId={item.id} 
                                        lecturerName={item.fullName} 
                                        onRemoved={() => setRefreshTrigger(prev => prev + 1)} 
                                    />
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
