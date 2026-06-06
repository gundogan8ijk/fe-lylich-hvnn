'use client'

import { useState } from 'react'
import { storeProjectDetail } from '@/Project-Lecturer-Detail/Project-Detail-store'
import { Tag, Plus } from 'lucide-react'
import { removeDisciplineAction } from '@/Project-Lecturer-Detail/Project-Detail-hook'
import AddDisciplineDialog from './AddDisciplineDialog'
import DeleteDisciplineDialog from './DeleteDisciplineDialog'
import DisciplineItem from './DisciplineItem'

export default function DisciplinesSection() {
    const { data: detail } = storeProjectDetail()
    const [addOpen, setAddOpen] = useState(false)
    const [removeTarget, setRemoveTarget] = useState<{ id: string; name: string } | null>(null)
    const [loading, setLoading] = useState(false)

    if (!detail) return null

    const disciplines = detail.disciplines || []
    const isEditable = detail.isMyCreate && detail.confirmedStatus === 'Draft'
    const isFull = disciplines.length >= detail.maxDisciplines

    const handleRemove = async () => {
        if (!removeTarget) return
        setLoading(true)
        await removeDisciplineAction(detail.id, removeTarget.id)
        setLoading(false)
        setRemoveTarget(null)
    }

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
                <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Lĩnh vực nghiên cứu ({disciplines.length}/{detail.maxDisciplines})</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Các lĩnh vực khoa học liên quan</p>
                </div>
                {isEditable && !isFull && (
                    <button
                        type="button"
                        onClick={() => setAddOpen(true)}
                        className="w-full sm:w-auto px-2.5 py-1 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition-all text-[10px] sm:text-xs flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                        <Plus className="w-3 h-3" /> Thêm lĩnh vực
                    </button>
                )}
            </div>

            {disciplines.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl bg-muted/10">
                    <Tag className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-xs font-medium">Chưa có lĩnh vực nghiên cứu nào được chọn</p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {disciplines.map((d) => (
                        <DisciplineItem
                            key={d.id}
                            discipline={d}
                            disabled={!isEditable}
                            onRemoveClick={setRemoveTarget}
                        />
                    ))}
                </div>
            )}

            <AddDisciplineDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                projectId={detail.id}
                currentDisciplinesCount={disciplines.length}
                maxDisciplines={detail.maxDisciplines}
            />

            <DeleteDisciplineDialog
                disciplineId={removeTarget?.id || null}
                name={removeTarget?.name || ''}
                loading={loading}
                onClose={() => setRemoveTarget(null)}
                onConfirm={handleRemove}
            />
        </div>
    )
}

