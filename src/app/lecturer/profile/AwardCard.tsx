import { Trophy, CalendarDays, FileText, Pencil, Trash2, Send, ImageIcon } from 'lucide-react'
import { Badge } from '@/_components/ui/badge'
import { Button } from '@/_components/ui/button'
import { getDateOnly, getLabel } from '@/_lib/display-variable-helper'
import { AWARD_LEVEL_OPTIONS } from '@/_constants/award-constant'
import { STATUS_VARIANTS } from '@/_constants/education-constant'
import { STATUS_LABELS } from '@/_constants/base-constant'
import { AwardLecturer } from '@/Award-Lecturer/Award-Lecturer-type'
import { submitAwardAction } from '@/Award-Lecturer/Award-Lecturer-hook'
import { useState } from 'react'
import SubmitConfirmDialog from '@/_components/custom/SubmitConfirmDialog'

interface AwardCardProps {
    award: AwardLecturer
    onEdit: (award: AwardLecturer) => void
    onDelete: (id: string) => void
    onViewProof?: (url: string) => void
}

export function AwardCard({ award, onEdit, onDelete, onViewProof }: AwardCardProps) {
    const [submitting, setSubmitting] = useState(false)
    const [isSubmitOpen, setIsSubmitOpen] = useState(false)

    async function handleConfirmSubmit() {
        setSubmitting(true)
        await submitAwardAction(award.id)
        setIsSubmitOpen(false)
        setSubmitting(false)
    }

    return (
        <div className="flex items-start gap-4 rounded-xl border border-muted-foreground/10 p-4 bg-card/50 hover:bg-muted/30 hover:border-muted-foreground/20 transition-all duration-200 shadow-sm">
            {/* Icon Trophy */}
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
                <Trophy size={20} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm sm:text-base tracking-tight text-foreground line-clamp-1">
                        {award.name}
                    </span>
                    <div className="flex items-center gap-x-2 shrink-0">
                        <span className="text-xs text-muted-foreground/70 hidden sm:inline">
                            {getDateOnly(award.lastModify)}
                        </span>
                        <Badge
                            variant={STATUS_VARIANTS[award.confirmedStatus]}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                        >
                            {STATUS_LABELS[award.confirmedStatus]}
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                    {/* Cấp giải thưởng */}
                    <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground/90 font-semibold">
                        {getLabel(AWARD_LEVEL_OPTIONS, award.level)}
                    </span>

                    {/* Ngày nhận giải */}
                    {award.awardDate && (
                        <span className="flex items-center gap-1 text-muted-foreground/80">
                            <CalendarDays size={13} className="text-muted-foreground/60" />
                            {getDateOnly(award.awardDate)}
                        </span>
                    )}
                </div>

                {/* Mô tả ngắn gọn */}
                {award.description && (
                    <p className="text-xs text-muted-foreground/80 flex items-start gap-1 pt-0.5 line-clamp-2 font-normal">
                        <FileText size={13} className="text-muted-foreground/40 mt-0.5 shrink-0" />
                        {award.description}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-0.5 self-center sm:self-start">
                {/* Nút xem minh chứng — chỉ hiện khi proofUrl có giá trị thực */}
                {award.proofUrl?.trim() && onViewProof && (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 text-xs"
                        onClick={() => onViewProof(award.proofUrl!)}
                    >
                        <ImageIcon size={14} />
                        Xem minh chứng
                    </Button>
                )}

                {award.confirmedStatus === 'Draft' && (
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                        onClick={() => setIsSubmitOpen(true)}
                        disabled={submitting}
                        title="Gửi phê duyệt"
                    >
                        <Send size={14} className={submitting ? 'animate-pulse' : ''} />
                    </Button>
                )}

                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => onEdit(award)}
                    disabled={award.confirmedStatus !== 'Draft'}
                >
                    <Pencil size={14} />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => onDelete(award.id)}
                >
                    <Trash2 size={14} />
                </Button>
            </div>

            <SubmitConfirmDialog
                open={isSubmitOpen}
                submitting={submitting}
                title="Xác nhận nộp bằng cấp?"
                description={`Bạn có chắc chắn muốn nộp phê duyệt thông tin giải thưởng từ "${award.name}" không?`}
                onConfirm={handleConfirmSubmit}
                onCancel={() => setIsSubmitOpen(false)}
            />
        </div>
    )
}