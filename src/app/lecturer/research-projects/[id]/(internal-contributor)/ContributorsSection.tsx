'use client'

import { useState } from 'react'
import { storeProjectDetail } from '@/working-Lecturer/Project-Detail/Project-Detail-store'
import { UserCheck, Plus } from 'lucide-react'
import { removeContributorAction } from '@/working-Lecturer/Project-Detail/Project-Detail-hook'
import AddContributorDialog from './AddContributorDialog'
import DeleteContributorDialog from './DeleteContributorDialog'
import ContributorItem from './ContributorItem'

export default function ContributorsSection() {
    const { data: detail } = storeProjectDetail()
    const [addOpen, setAddOpen] = useState(false)
    const [removeTarget, setRemoveTarget] = useState<{ id: string; name: string } | null>(null)
    const [loading, setLoading] = useState(false)

    if (!detail) return null

    const contributors = detail.contributors || []
    const isEditable = detail.isMyCreate && detail.confirmedStatus === 'Draft'
    const isFull = contributors.length >= detail.maxContributors

    const handleRemove = async () => {
        if (!removeTarget) return
        setLoading(true)
        await removeContributorAction(detail.id, removeTarget.id)
        setLoading(false)
        setRemoveTarget(null)
    }

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
                <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Thành viên ({contributors.length}/{detail.maxContributors})</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Các giảng viên trong trường tham gia đề tài</p>
                </div>
                {isEditable && !isFull && (
                    <button
                        type="button"
                        onClick={() => setAddOpen(true)}
                        className="w-full sm:w-auto px-2.5 py-1 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition-all text-[10px] sm:text-xs flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                        <Plus className="w-3 h-3" /> Thêm thành viên
                    </button>
                )}
            </div>

            {contributors.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl bg-muted/10">
                    <UserCheck className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-xs font-medium">Chưa có thành viên nào</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {contributors.map((c) => (
                        <ContributorItem
                            key={c.id}
                            contributor={c}
                            isCreator={c.lecturerId === detail.lecturerCreateId}
                            disabled={!isEditable}
                            onRemoveClick={setRemoveTarget}
                        />
                    ))}
                </div>
            )}

            <AddContributorDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                projectId={detail.id}
            />

            <DeleteContributorDialog
                contributorId={removeTarget?.id || null}
                name={removeTarget?.name || ''}
                loading={loading}
                onClose={() => setRemoveTarget(null)}
                onConfirm={handleRemove}
            />
        </div>
    )
}

