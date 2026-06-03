'use client'

import { Card } from '@/_components/ui/card'
import { Badge } from '@/_components/ui/badge'
import { Button } from '@/_components/ui/button'
import { Eye, Calendar, FlaskConical } from 'lucide-react'
import {
    ProjectStatusName,
    ProjectStatus_OPTIONS,
    EvaluationResultName,
    EvaluationResult_OPTIONS,
} from '@/_constants/project-constant'
import { ConfirmedStatus, STATUS_LABELS } from '@/_constants/base-constant'
import { getDateOnly, getLabel } from '@/_lib/display-variable-helper'
import { ProjectLecturerItems } from '@/Project-Lecturer-List/projects-lecturer-list-type'

type ResearchProjectCardProps = {
    item: ProjectLecturerItems
    onViewDetail: (id: string) => void
}


export default function ResearchProjectCard({
    item,
    onViewDetail,
}: ResearchProjectCardProps) {

    const statusStyle = projectStatusStyle[item.projectStatus] ?? projectStatusStyle.Pending
    const confirmedInfo = confirmedStyle[item.confirmedStatus] ?? confirmedStyle.Pending
    const evalStyle = evaluationStyle[item.evaluation] ?? evaluationStyle.NotSet

    const startFmt = getDateOnly(item.startDate)
    const endFmt = getDateOnly(item.endDate)

    return (
        <Card className="group relative overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
            {/* Accent bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

            <div className="p-2">
                {/* Header */}
                <div className="mb-4 flex flex flex-col gap-y-2">
                    <div className="mb-1 flex items-center justify-between gap-2">
                        <div className='flex gap-x-3'>
                            <FlaskConical className="h-4 w-4 flex-shrink-0 text-slate-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {item.code}
                            </span>
                        </div>

                        {/* Xác nhận */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Xác nhận:</span>
                            <Badge className={`${confirmedInfo.bg} ${confirmedInfo.text} border-0 text-xs font-medium`}>
                                {STATUS_LABELS[item.confirmedStatus]}
                            </Badge>
                        </div>
                    </div>

                    <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50 text-balance">
                        {item.title}
                    </h3>

                    <div className="flex items-center gap-2">
                        <span className=" text-slate-500 dark:text-slate-400">cập nhật:</span>
                        <div>{getDateOnly(item.lastModify)}</div>
                    </div>

                    {/* Badges row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                        {/* chin sua lan cuoi */}

                        {/* Trạng thái đề tài */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Trạng thái:</span>
                            <Badge className={`${statusStyle.bg} ${statusStyle.text} border-0 text-xs font-medium`}>
                                {getLabel(ProjectStatus_OPTIONS, item.projectStatus)}
                            </Badge>
                        </div>

                        {/* Kết quả */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Kết quả:</span>
                            <Badge className={`${evalStyle.bg} ${evalStyle.text} border-0 text-xs font-medium`}>
                                {getLabel(EvaluationResult_OPTIONS, item.evaluation)}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-4 h-px bg-slate-200 dark:bg-slate-800" />

                {/* Date range */}
                {(startFmt || endFmt) && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>...</span>
                    </div>
                ) }

                {/* Actions */}
                <div className="flex items-center gap-x-3">
                    <Button variant="ghost" size="sm"
                        className="h-7 gap-1.5 px-2.5 text-xs text-slate-500"
                        onClick={() => onViewDetail(item.id)}
                    >
                        <Eye className="h-3.5 w-3.5" /> Xem
                    </Button>
                </div>
            </div>
        </Card>
    )
}

// ─── Config maps ──────────────────────────────────────────────────────────────

const projectStatusStyle: Record<ProjectStatusName, { bg: string; text: string }> = {
    Pending: { bg: 'bg-yellow-50 dark:bg-yellow-950/30', text: 'text-yellow-700 dark:text-yellow-300' },
    InProgress: { bg: 'bg-blue-50   dark:bg-blue-950/30', text: 'text-blue-700   dark:text-blue-300' },
    UnderReview: { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300' },
    Completed: { bg: 'bg-green-50  dark:bg-green-950/30', text: 'text-green-700  dark:text-green-300' },
    Cancelled: { bg: 'bg-red-50    dark:bg-red-950/30', text: 'text-red-700    dark:text-red-300' },
}

const confirmedStyle: Record<ConfirmedStatus, { bg: string; text: string }> = {
    Draft: { bg: 'bg-slate-100   dark:bg-slate-800', text: 'text-slate-600   dark:text-slate-300' },
    Pending: { bg: 'bg-slate-100   dark:bg-slate-800', text: 'text-slate-600   dark:text-slate-300' },
    Verified: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
    Cancelled: { bg: 'bg-red-100     dark:bg-red-900/30', text: 'text-red-600     dark:text-red-300' },
}

const evaluationStyle: Record<EvaluationResultName, { bg: string; text: string }> = {
    NotSet: { bg: 'bg-slate-100   dark:bg-slate-800', text: 'text-slate-500   dark:text-slate-400' },
    Excellent: { bg: 'bg-purple-50   dark:bg-purple-950/30', text: 'text-purple-700  dark:text-purple-300' },
    Good: { bg: 'bg-green-50    dark:bg-green-950/30', text: 'text-green-700   dark:text-green-300' },
    Pass: { bg: 'bg-blue-50     dark:bg-blue-950/30', text: 'text-blue-700    dark:text-blue-300' },
    Fail: { bg: 'bg-red-50      dark:bg-red-950/30', text: 'text-red-700     dark:text-red-300' },
}
