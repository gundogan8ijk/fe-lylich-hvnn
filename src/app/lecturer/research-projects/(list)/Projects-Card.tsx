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
import { ConfirmedStatus, STATUS_LABELS, confirmedGradient } from '@/_constants/base-constant'
import { getDateOnly, getLabel } from '@/_lib/display-variable-helper'
import { ProjectItem } from '@/working-Lecturer/Project-List/Project-List-type'

type ResearchProjectCardProps = {
    item: ProjectItem
    onViewDetail: (id: string) => void
}


export default function ResearchProjectCard({
    item,
    onViewDetail,
}: ResearchProjectCardProps) {

    const statusStyle = projectStatusStyle[item.projectStatus] ?? projectStatusStyle.Pending
    const confirmedInfo = confirmedStyle[item.confirmedStatus] ?? confirmedStyle.Pending
    const evalStyle = evaluationStyle[item.evaluation] ?? evaluationStyle.NotSet

    return (
        <Card className="group relative overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
            {/* Accent bars */}
            <div 
                className="absolute inset-x-0 top-0 h-1" 
                style={{ 
                    background: `linear-gradient(to right, ${confirmedColorMap[item.confirmedStatus] || confirmedColorMap.Pending} 44%, ${projectStatusColorMap[item.projectStatus] || projectStatusColorMap.Pending} 56%)` 
                }}
            />

            <div className="p-4">
                {/* Header */}
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className='flex items-center gap-x-2 flex-wrap'>
                            <FlaskConical className="h-4 w-4 flex-shrink-0 text-slate-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {item.code}
                            </span>
                            {item.isMyCreate ? (
                                <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 border-0 text-[10px] py-0.5 px-2 font-medium">
                                    Cá nhân đăng ký
                                </Badge>
                            ) : (
                                <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-850 dark:text-slate-350 border-0 text-[10px] py-0.5 px-2 font-medium">
                                    Được gán
                                </Badge>
                            )}
                        </div>

                        {/* Xác nhận */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Xác nhận:</span>
                            <Badge className={`${confirmedInfo.bg} ${confirmedInfo.text} border-0 text-xs font-medium`}>
                                {STATUS_LABELS[item.confirmedStatus]}
                            </Badge>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 text-balance group-hover:text-blue-600 transition-colors">
                        {item.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 mb-2">
                        {item.describe || 'Không có mô tả.'}
                    </p>

                </div>

                <div className="my-3 h-px bg-slate-200 dark:bg-slate-800" />

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            Cập nhật: <strong>{getDateOnly(item.lastModify)}</strong>
                        </div>

                        {/* Trạng thái đề tài */}
                        <div className="flex items-center gap-1.5">
                            <span>Trạng thái:</span>
                            <Badge className={`${statusStyle.bg} ${statusStyle.text} border-0 text-xs font-medium`}>
                                {getLabel(ProjectStatus_OPTIONS, item.projectStatus)}
                            </Badge>
                        </div>

                        {/* Kết quả */}
                        <div className="flex items-center gap-1.5">
                            <span>Kết quả:</span>
                            <Badge className={`${evalStyle.bg} ${evalStyle.text} border-0 text-xs font-medium`}>
                                {getLabel(EvaluationResult_OPTIONS, item.evaluation)}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-2 mt-2 sm:mt-0">
                        <Button variant="ghost" size="sm"
                            className="h-7 gap-1.5 px-2.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                            onClick={() => onViewDetail(item.id)}
                        >
                            <Eye className="h-3.5 w-3.5" /> Xem chi tiết
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
    InProgress: { bg: 'bg-blue-50   dark:bg-blue-950/30', text: 'text-blue-700   dark:text-blue-300' },
    UnderReview: { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300' },
    Completed: { bg: 'bg-green-50  dark:bg-green-950/30', text: 'text-green-700  dark:text-green-300' },
    Cancelled: { bg: 'bg-red-50    dark:bg-red-950/30', text: 'text-red-700    dark:text-red-300' },
}

const projectStatusGradient: Record<ProjectStatusName, string> = {
    Pending: 'from-yellow-400 to-yellow-500',
    InProgress: 'from-blue-400 to-blue-500',
    UnderReview: 'from-purple-400 to-purple-500',
    Completed: 'from-green-400 to-green-500',
    Cancelled: 'from-red-400 to-red-500',
}

const projectStatusColorMap: Record<ProjectStatusName, string> = {
    Pending: '#fbbf24',    // yellow-400
    InProgress: '#60a5fa', // blue-400
    UnderReview: '#c084fc',// purple-400
    Completed: '#4ade80',  // green-400
    Cancelled: '#f87171',  // red-400
}

const confirmedColorMap: Record<ConfirmedStatus, string> = {
    Draft: '#94a3b8',      // slate-400
    Pending: '#fbbf24',    // amber-400
    Verified: '#34d399',   // emerald-400
    Cancelled: '#fb7185',  // rose-400
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

