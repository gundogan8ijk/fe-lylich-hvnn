import { GraduationCap, CalendarDays, BookOpen, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Education } from '@/_types/educationType'
import { getDateOnly } from '@/lib/display-variable-helper'
import { STATUS_VARIANTS } from '@/constants/education-constan'
import { STATUS_LABELS } from '@/constants/base-constant'

interface EducationCardProps {
    education: Education
    onEdit: (edu: Education) => void
    onDelete: (id: string) => void
}

export function EducationCard({ education: edu, onEdit, onDelete }: EducationCardProps) {
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
                            variant={STATUS_VARIANTS[edu.status]}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                        >
                            {STATUS_LABELS[edu.status]}
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                    {/* Bằng cấp */}
                    <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground/90 font-semibold">
                        {edu.degreeName}
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
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => onEdit(edu)}
                    disabled={edu.status === "Verified"}
                >
                    <Pencil size={14} />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => onDelete(edu.id)}
                >
                    <Trash2 size={14} />
                </Button>
            </div>
        </div>
    )
}