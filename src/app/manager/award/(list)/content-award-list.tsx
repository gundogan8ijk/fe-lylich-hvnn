'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card'
import { Input } from '@/_components/ui/input'
import { Search } from 'lucide-react'
import Loading from '@/_components/utils/Loading'
import { ConfirmedStatus } from '@/_constants/base-constant'
import { ConfirmedStatusFilterSelect } from '@/_components/custom/StatusFilter-Select'
import { SearchSelectProps } from '@/_components/custom/selection-Props'
import { SelectionOption, SortDirection } from '@/_Common/_types/query-types'
import { AWARD_LEVEL_OPTIONS } from '@/_constants/award-constant'
import { storeAwardListManager } from '@/working-manager/award/award-manager-store'
import AwardManagerCard from './award-manager-card'

const SORT_OPTIONS: readonly SelectionOption<SortDirection>[] = [
    { value: 'desc', label: 'Mới cập nhật nhất' },
    { value: 'asc', label: 'Cũ nhất' },
]

export default function ContentAwardList() {
    const router = useRouter()
    const data = storeAwardListManager((s) => s.data)
    const isLoading = storeAwardListManager((s) => s.isLoading)

    const [search, setSearch] = useState('')
    const [filterConfirmed, setFilterConfirmed] = useState<ConfirmedStatus | 'all'>('all')
    const [sortOrder, setSortOrder] = useState<SortDirection>('desc')
    
    const [filterLevel, setFilterLevel] = useState<string>('all')

    const levelOptions = [
        { value: 'all', label: 'Tất cả cấp bậc' },
        ...AWARD_LEVEL_OPTIONS
    ];

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return data
            .filter((item) => {
                const matchSearch = !q || 
                    item.awardsName?.toLowerCase()?.includes(q) || 
                    item.fullName?.toLowerCase()?.includes(q) || 
                    item.lecturerCode?.toLowerCase()?.includes(q)
                
                const matchConfirmed = filterConfirmed === 'all' || item.confirmedStatus === filterConfirmed
                const matchLevel = filterLevel === 'all' || 
                    item.awardLevel === filterLevel || 
                    item.awardLevel === AWARD_LEVEL_OPTIONS.find(d => d.value === filterLevel)?.label

                return matchSearch && matchConfirmed && matchLevel
            })
            .sort((a, b) => {
                const diff = new Date(a.lastModify).getTime() - new Date(b.lastModify).getTime()
                return sortOrder === 'desc' ? -diff : diff
            })
    }, [data, search, filterConfirmed, sortOrder, filterLevel])

    const handleViewDetail = (id: string) => {
        router.push(`/manager/award/${id}`)
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                    <h1 className="text-3xl pb-1 md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Quản lý Giải thưởng
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Xem và quản lý tất cả giải thưởng của giảng viên
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Tìm kiếm & Lọc</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm tên giải thưởng, tên GV, mã GV..."
                                className="pl-10 text-sm"
                            />
                        </div>
                        <SearchSelectProps
                            value={sortOrder}
                            onChange={setSortOrder}
                            options={SORT_OPTIONS}
                            placeholder="Sắp xếp..."
                        />
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-3">
                        <div className="flex gap-x-2 items-baseline-last">
                            <p className="text-sm">Trạng thái: </p>
                            <ConfirmedStatusFilterSelect
                                value={filterConfirmed}
                                onChange={setFilterConfirmed}
                                excludeDraft={true}
                            />
                        </div>

                        <div className="flex gap-x-2 items-baseline-last min-w-[200px]">
                            <p className="text-sm">Cấp bậc: </p>
                            <SearchSelectProps
                                value={filterLevel}
                                onChange={setFilterLevel}
                                options={levelOptions}
                                placeholder="Chọn cấp bậc"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="grid gap-4">
                    {filtered.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground text-sm">
                                {data.length === 0 ? 'Chưa có giải thưởng nào.' : 'Không tìm thấy giải thưởng phù hợp.'}
                            </CardContent>
                        </Card>
                    ) : (
                        filtered.map((item) => (
                            <AwardManagerCard
                                key={item.awardId}
                                item={item}
                                onViewDetail={handleViewDetail}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
