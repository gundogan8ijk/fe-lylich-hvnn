'use client'

import { Card } from '@/_components/ui/card'
import { Badge } from '@/_components/ui/badge'
import { Button } from '@/_components/ui/button'
import { Eye, Calendar, FlaskConical, Trash2 } from 'lucide-react' // Thêm Trash2 ở đây
import {
    ProjectStatusName,
    ProjectStatus_OPTIONS,
    level_PROJECT_OPTIONS,
} from '@/_constants/project-constant'
import { ConfirmedStatus, STATUS_LABELS, confirmedStyle } from '@/_constants/base-constant'
import { getDateOnly, getLabel } from '@/_lib/display-variable-helper'
import { MangerProjectItems } from '@/working-manager/project-list/project-list-type'

type ResearchProjectCardProps = {
    item: MangerProjectItems
    onViewDetail: (id: string) => void
    onDelete?: (id: string) => void
}

export default function MangerResearchProjectCard({
    item,
    onViewDetail,
    onDelete,
}: ResearchProjectCardProps) {
    const statusStyle = projectStatusStyle[item.status] ?? projectStatusStyle.Pending
    const confirmedInfo = confirmedStyle[item.confirmed] ?? confirmedStyle.Pending

    const statusGradient: Record<ConfirmedStatus, string> = {
        Draft: "from-slate-400 to-slate-500",
        Pending: "from-amber-400 to-amber-500",
        Verified: "from-emerald-400 to-emerald-500",
        Cancelled: "from-red-400 to-red-500",
    }
    const gradient = statusGradient[item.confirmed as ConfirmedStatus] ?? "from-blue-500 to-purple-500"

    return (
        <Card className="group relative overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
            {/* Accent bar */}
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`} />

            <div className="p-4">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-y-2">
                    <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-x-2">
                            <FlaskConical className="h-4 w-4 flex-shrink-0 text-slate-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {item.code}
                            </span>
                            {item.isMyCreate && (
                                <Badge
                                    variant="secondary"
                                    className="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 text-[10px] font-medium px-1.5 py-0 shadow-none"
                                >
                                    tự tạo
                                </Badge>
                            )}
                        </div>

                        {/* Xác nhận */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Xác nhận:</span>
                            <Badge className={`${confirmedInfo.bg} ${confirmedInfo.text} border-0 text-xs font-medium shadow-none`}>
                                {STATUS_LABELS[item.confirmed] || item.confirmed}
                            </Badge>
                        </div>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 text-balance line-clamp-2">
                        {item.title}
                    </h3>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs">
                    {/* Trạng thái đề tài */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-slate-500 dark:text-slate-400">Trạng thái:</span>
                        <Badge className={`${statusStyle.bg} ${statusStyle.text} border-0 text-xs font-medium shadow-none`}>
                            {getLabel(ProjectStatus_OPTIONS, item.status)}
                        </Badge>
                    </div>

                    {/* Cấp đề tài mới */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-slate-500 dark:text-slate-400">Cấp đề tài:</span>
                        <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-0 text-xs font-medium shadow-none">
                            {getLabel(level_PROJECT_OPTIONS, item.level)}
                        </Badge>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-4 h-px bg-slate-200 dark:bg-slate-800" />

                {/* Footer */}
                <div className="flex items-center justify-between gap-x-3">
                    {/* Cập nhật lần cuối */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Cập nhật: {getDateOnly(item.lastModify)}</span>
                    </div>

                    {/* Nhóm nút hành động */}
                    <div className="flex items-center gap-x-1">
                        {item.canDelete && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 gap-1.5 px-2.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 dark:hover:text-red-300"
                                onClick={() => onDelete?.(item.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" /> Xóa
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1.5 px-3 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={() => onViewDetail(item.id)}
                        >
                            <Eye className="h-3.5 w-3.5" /> Xem
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

// ─── Config maps ──────────────────────────────────────────────────────────────

const projectStatusStyle: Record<ProjectStatusName, { bg: string; text: string }> = {
    Pending: { bg: 'bg-yellow-50 dark:bg-yellow-950/30', text: 'text-yellow-700 dark:text-yellow-300' },
    InProgress: { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-300' },
    UnderReview: { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300' },
    Completed: { bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-700 dark:text-green-300' },
    Cancelled: { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-300' },
}
