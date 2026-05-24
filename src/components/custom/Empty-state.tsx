import { type LucideIcon } from 'lucide-react'

interface EmptyStateProps {
    icon: LucideIcon
    title?: string
    description?: string
}

export function EmptyState({
    icon: Icon,
    title = 'Không có dữ liệu',
    description = 'Thử thay đổi bộ lọc hoặc thêm mới.',
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-12 rounded-xl border border-dashed border-muted-foreground/20 bg-muted/10">
            <div className="p-3 bg-muted rounded-full text-muted-foreground/60">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-xs text-muted-foreground/70">{description}</p>
        </div>
    )
}