'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Search } from 'lucide-react'
import Loading from '@/_components/utils/Loading'
import ResearchProjectCard from './Projects-Card'
import { ProjectStatus_OPTIONS, ProjectStatusName } from '@/_constants/project-constant'
import { ConfirmedStatus } from '@/_constants/base-constant'
import { ConfirmedStatusFilterSelect } from '@/_components/custom/StatusFilter-Select'
import { SearchSelectProps } from '@/_components/custom/selection-Props'
import RegisterProjectDialog from './Register-Project-Dialog'
import { SelectionOption, SortDirection } from '@/_Common/_types/query-types'
import { storeProjectLecturerList } from '@/Project-Lecturer-List/projects-lecturer-list-store'
import { registerListProjectLecturerAction } from '@/Project-Lecturer-List/projects-lecturer-list-hook'

const SORT_OPTIONS: readonly SelectionOption<SortDirection>[] = [
    { value: 'desc', label: 'Mới nhất' },
    { value: 'asc', label: 'Cũ nhất' },
]

const PROJECT_STATUS_OPTIONS: readonly SelectionOption<ProjectStatusName | 'all'>[] = [
    { value: 'all', label: 'Tất cả' },
    ...ProjectStatus_OPTIONS,
]

export default function ContentProjectsList() {
    const { data, loading } = storeProjectLecturerList()

    const [dialogOpen, setDialogOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<ProjectStatusName | 'all'>('all')
    const [filterConfirmed, setFilterConfirmed] = useState<ConfirmedStatus | 'all'>('all')
    const [sortOrder, setSortOrder] = useState<SortDirection>('desc')

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return data
            .filter((item) => {
                const matchSearch =
                    !q ||
                    item.title.toLowerCase().includes(q) ||
                    item.code.toLowerCase().includes(q)
                const matchStatus =
                    filterStatus === 'all' || item.projectStatus === filterStatus
                const matchConfirmed =
                    filterConfirmed === 'all' || item.confirmedStatus === filterConfirmed
                return matchSearch && matchStatus && matchConfirmed
            })
            .sort((a, b) => {
                const diff =
                    new Date(a.lastModify).getTime() - new Date(b.lastModify).getTime()
                return sortOrder === 'desc' ? -diff : diff
            })
    }, [data, search, filterStatus, filterConfirmed, sortOrder])



    const handleViewDetail = (id: string) => {
        console.log('view detail', id)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Đề tài nghiên cứu khoa học
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Quản lý các đề tài có liên quan tới bạn
                    </p>
                </div>
                <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">Đăng ký đề tài</Button>
            </div>

            {/* Search + Filter */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Tìm kiếm & Lọc</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {/* Search + Sort cùng hàng */}
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm theo tên hoặc mã đề tài..."
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

                    {/* Filter selects */}
                    <div className="flex flex-wrap gap-x-5">
                        <div className="flex gap-x-2 items-baseline-last">
                            <p>đề tài: </p>
                            <SearchSelectProps
                                value={filterStatus}
                                onChange={setFilterStatus}
                                options={PROJECT_STATUS_OPTIONS}
                                placeholder="Trạng thái..."
                            />
                        </div>

                        <div className="flex gap-x-2 items-baseline-last">
                            <p>xác thực: </p>
                            <ConfirmedStatusFilterSelect
                                value={filterConfirmed}
                                onChange={setFilterConfirmed}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* List */}
            {loading ? (
                <Loading />
            ) : (
                <div className="grid gap-4">
                    {filtered.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground text-sm">
                                {data.length === 0 ? 'Chưa có đề tài nào.' : 'Không tìm thấy đề tài phù hợp.'}
                            </CardContent>
                        </Card>
                    ) : (
                        filtered.map((item) => (
                            <ResearchProjectCard
                                key={item.id}
                                item={item}
                                onViewDetail={handleViewDetail}
                            />
                        ))
                    )}
                </div>
            )}

            <RegisterProjectDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={registerListProjectLecturerAction} />

        </div>
    )
}