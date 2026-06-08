'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Search } from 'lucide-react'
import Loading from '@/_components/utils/Loading'
import { ConfirmedStatus } from '@/_constants/base-constant'
import { ConfirmedStatusFilterSelect } from '@/_components/custom/StatusFilter-Select'
import { SearchSelectProps } from '@/_components/custom/selection-Props'
import { SelectionOption, SortDirection } from '@/_Common/_types/query-types'
import { storeArticleLecturerList } from '@/working-Lecturer/Article-List/Article-Lecturer-store'
import { registerArticleLecturerAction } from '@/working-Lecturer/Article-List/Article-Lecturer-hook'
import ArticleLecturerCard from './Article-Lecturer-Card'
import RegisterArticleDialog from './Register-Article-Dialog'

const SORT_OPTIONS: readonly SelectionOption<SortDirection>[] = [
    { value: 'desc', label: 'Mới nhất' },
    { value: 'asc', label: 'Cũ nhất' },
]

export default function ContentArticlesList() {
    const router = useRouter()
    const { data, loading } = storeArticleLecturerList()

    const [dialogOpen, setDialogOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [filterConfirmed, setFilterConfirmed] = useState<ConfirmedStatus | 'all'>('all')
    const [sortOrder, setSortOrder] = useState<SortDirection>('desc')

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return data
            .filter((item) => {
                const matchSearch = !q || item.title.toLowerCase().includes(q)
                const matchConfirmed = filterConfirmed === 'all' || item.confirmedStatus === filterConfirmed
                return matchSearch && matchConfirmed
            })
            .sort((a, b) => {
                const diff = new Date(a.lastModify).getTime() - new Date(b.lastModify).getTime()
                return sortOrder === 'desc' ? -diff : diff
            })
    }, [data, search, filterConfirmed, sortOrder])

    const handleViewDetail = (id: string) => {
        router.push(`/lecturer/article/${id}`)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Bài báo khoa học
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Quản lý và công bố các bài báo nghiên cứu khoa học của bạn
                    </p>
                </div>
                <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">
                    Đăng ký bài báo
                </Button>
            </div>

            {/* Search + Filter */}
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
                                placeholder="Tìm kiếm theo tiêu đề bài báo..."
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

                    <div className="flex flex-wrap gap-x-5">
                        <div className="flex gap-x-2 items-baseline-last">
                            <p>Trạng thái xác thực: </p>
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
                                {data.length === 0 ? 'Chưa có bài báo nào.' : 'Không tìm thấy bài báo phù hợp.'}
                            </CardContent>
                        </Card>
                    ) : (
                        filtered.map((item) => (
                            <ArticleLecturerCard
                                key={item.id}
                                item={item}
                                onViewDetail={handleViewDetail}
                            />
                        ))
                    )}
                </div>
            )}

            <RegisterArticleDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={registerArticleLecturerAction}
            />
        </div>
    )
}