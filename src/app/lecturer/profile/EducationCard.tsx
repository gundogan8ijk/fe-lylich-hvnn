import { GraduationCap, CalendarDays, BookOpen, Pencil, Trash2, Send, ImageIcon, RotateCcw } from 'lucide-react'
import { Badge } from '@/_components/ui/badge'
import { Button } from '@/_components/ui/button'
import { getDateOnly, getLabel } from '@/_lib/display-variable-helper'
import { DEGREE_OPTIONS, STATUS_VARIANTS } from '@/_constants/education-constant'
import { STATUS_LABELS } from '@/_constants/base-constant'
import { EducationLecturer } from '@/working-Lecturer/profile/Educaion/Eduction-Lecturer-type'
import { useState } from 'react'
import SubmitConfirmDialog from '@/_components/custom/SubmitConfirmDialog'
import { submitEducationAction, backToDraftEducationAction } from '@/working-Lecturer/profile/Educaion/Education-Lecturer-hook'

interface EducationCardProps {
    education: EducationLecturer
    onEdit: (edu: EducationLecturer) => void
    onDelete: (id: string) => void
    onViewProof?: (url: string) => void
}

export function EducationCard({ education: edu, onEdit, onDelete, onViewProof }: EducationCardProps) {
    const [submitting, setSubmitting] = useState(false)
    const [isSubmitOpen, setIsSubmitOpen] = useState(false)
    const [isBackToDraftOpen, setIsBackToDraftOpen] = useState(false)

    async function handleConfirmSubmit() {
        setSubmitting(true)
        await submitEducationAction(edu.id)
        setIsSubmitOpen(false)
        setSubmitting(false)
    }

    async function handleConfirmBackToDraft() {
        setSubmitting(true)
        await backToDraftEducationAction(edu.id)
        setIsBackToDraftOpen(false)
        setSubmitting(false)
    }

    return (
        <div className="flex items-start gap-4 rounded-xl border border-muted-foreground/10 p-4 bg-card/50 hover:bg-muted/30 hover:border-muted-foreground/20 transition-all duration-200 shadow-sm">
            {/* Icon */}
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 border border-sky-100 dark:border-sky-900/30">
                <GraduationCap size={20} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm sm:text-base tracking-tight text-foreground line-clamp-1">
                        {edu.trainingName}
                    </span>
                    <div className="flex items-center gap-x-2 shrink-0">
                        <span className="text-xs text-muted-foreground/70 hidden sm:inline">
                            {getDateOnly(edu.lastModify)}
                        </span>
                        <Badge
                            variant={STATUS_VARIANTS[edu.confirmedStatus]}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                        >
                            {STATUS_LABELS[edu.confirmedStatus]}
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                    {/* Bằng cấp */}
                    <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground/90 font-semibold">
                        {getLabel(DEGREE_OPTIONS, edu.degreeName)}
                    </span>

                    {/* Ngành học */}
                    {edu.majorName && (
                        <span className="flex items-center gap-1 text-muted-foreground/80">
                            <BookOpen size={13} className="text-muted-foreground/60" />
                            {edu.majorName}
                        </span>
                    )}

                    {/* Ngày tốt nghiệp */}
                    {edu.graduatedAt && (
                        <span className="flex items-center gap-1 text-muted-foreground/80">
                            <CalendarDays size={13} className="text-muted-foreground/60" />
                            {getDateOnly(edu.graduatedAt)}
                        </span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-0.5 self-center sm:self-start">
                {/* Nút xem minh chứng — chỉ hiện khi proofUrl có giá trị thực */}
                {edu.proofUrl?.trim() && onViewProof && (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 text-xs"
                        onClick={() => onViewProof(edu.proofUrl!)}
                    >
                        <ImageIcon size={14} />
                        Xem minh chứng
                    </Button>
                )}

                {edu.confirmedStatus === 'Draft' && (
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

                {edu.confirmedStatus === 'Pending' && (
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                        onClick={() => setIsBackToDraftOpen(true)}
                        disabled={submitting}
                        title="Hủy chờ duyệt (Về nháp)"
                    >
                        <RotateCcw size={14} className={submitting ? 'animate-spin' : ''} />
                    </Button>
                )}

                {edu.confirmedStatus !== 'Pending' && (
                    <>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            onClick={() => onEdit(edu)}
                            disabled={edu.confirmedStatus !== 'Draft' || submitting}
                        >
                            <Pencil size={14} />
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            onClick={() => onDelete(edu.id)}
                            disabled={submitting}
                        >
                            <Trash2 size={14} />
                        </Button>
                    </>
                )}
            </div>

            <SubmitConfirmDialog
                open={isSubmitOpen}
                submitting={submitting}
                title="Xác nhận nộp bằng cấp?"
                description={`Bạn có chắc chắn muốn nộp phê duyệt thông tin học vấn từ "${edu.trainingName}" không?`}
                onConfirm={handleConfirmSubmit}
                onCancel={() => setIsSubmitOpen(false)}
            />

            <SubmitConfirmDialog
                open={isBackToDraftOpen}
                submitting={submitting}
                title="Xác nhận hủy gửi phê duyệt?"
                description={`Bạn có chắc chắn muốn chuyển thông tin học vấn từ "${edu.trainingName}" về trạng thái nháp không?`}
                confirmLabel="Xác nhận hủy"
                onConfirm={handleConfirmBackToDraft}
                onCancel={() => setIsBackToDraftOpen(false)}
            />
        </div>
    )
}