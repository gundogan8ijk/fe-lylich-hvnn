'use client'

import { Card } from '@/_components/ui/card'
import { Badge } from '@/_components/ui/badge'
import { Button } from '@/_components/ui/button'
import { Eye, Calendar, FileText, ExternalLink, UserCheck } from 'lucide-react'
import { ConfirmedStatus, STATUS_LABELS } from '@/_constants/base-constant'
import { getDateOnly } from '@/_lib/display-variable-helper'

export type ArticleLecturerItem = {
    id: string
    title: string
    confirmedStatus: ConfirmedStatus
    lastModify: string
    proofDocumentUrl: string
    isMyCreate: boolean
}

type ArticleLecturerCardProps = {
    item: ArticleLecturerItem
    onViewDetail: (id: string) => void
}

export default function ArticleLecturerCard({
    item,
    onViewDetail,
}: ArticleLecturerCardProps) {

    const confirmedInfo = confirmedStyle[item.confirmedStatus] ?? confirmedStyle.Pending

    return (
        <Card className="group relative overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
            {/* Thanh màu sắc trang trí trên đỉnh Card */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />

            <div className="p-4">
                {/* Header */}
                <div className="mb-3 flex flex-col gap-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-x-2">
                            <FileText className="h-4 w-4 flex-shrink-0 text-blue-500" />
                            {item.isMyCreate && (
                                <Badge variant="secondary" className="gap-1 text-xs font-normal bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-0">
                                    <UserCheck className="h-3 w-3" /> Tôi tạo
                                </Badge>
                            )}
                        </div>

                        {/* Xác thực trạng thái phê duyệt */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Xác thực:</span>
                            <Badge className={`${confirmedInfo.bg} ${confirmedInfo.text} border-0 text-xs font-medium`}>
                                {STATUS_LABELS[item.confirmedStatus]}
                            </Badge>
                        </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50 text-balance mt-1 leading-snug">
                        {item.title}
                    </h3>
                </div>

                {/* Divider */}
                <div className="my-3 h-px bg-slate-200 dark:bg-slate-800" />

                {/* Footer thông tin & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-x-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Cập nhật mới nhất: <strong>{getDateOnly(item.lastModify)}</strong></span>
                    </div>

                    {/* Nhóm nút hành động */}
                    <div className="flex items-center gap-x-2">
                        {item.proofDocumentUrl && (
                            <Button asChild variant="outline" size="sm" className="h-7 gap-1 px-2.5 text-xs">
                                <a href={item.proofDocumentUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3" /> Minh chứng
                                </a>
                            </Button>
                        )}
                        <Button variant="ghost" size="sm"
                            className="h-7 gap-1.5 px-2.5 text-xs text-slate-600 dark:text-slate-400"
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

// ─── Config maps trạng thái duyệt bài báo ───────────────────────────────────────

const confirmedStyle: Record<ConfirmedStatus, { bg: string; text: string }> = {
    Draft: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
    Pending: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-300' },
    Verified: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
    Cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-300' },
}