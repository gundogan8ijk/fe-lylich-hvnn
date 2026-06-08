'use client'

import { useState } from 'react'
import { storeProjectDetail } from '@/working-Lecturer/Project-Detail/Project-Detail-store'
import { ProjectParticipant } from '@/working-Lecturer/Project-Detail/Project-Detail-type'
import { Users, Plus } from 'lucide-react'
import { removeParticipantAction } from '@/working-Lecturer/Project-Detail/Project-Detail-hook'
import AddParticipantDialog from './AddParticipantDialog'
import DeleteParticipantDialog from './DeleteParticipantDialog'
import ParticipantItem from './ParticipantItem'

export default function ParticipantsSection() {
    const { data: detail } = storeProjectDetail()
    const [addOpen, setAddOpen] = useState(false)
    const [editTarget, setEditTarget] = useState<ProjectParticipant | null>(null)
    const [removeTarget, setRemoveTarget] = useState<{ id: string; name: string } | null>(null)
    const [loading, setLoading] = useState(false)

    if (!detail) return null

    const participants = detail.participants || []
    const isEditable = detail.isMyCreate && detail.confirmedStatus === 'Draft'
    const isFull = participants.length >= detail.maxParticipants

    const handleRemove = async () => {
        if (!removeTarget) return
        setLoading(true)
        await removeParticipantAction(detail.id, removeTarget.id)
        setLoading(false)
        setRemoveTarget(null)
    }

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
                <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Người tham gia ({participants.length}/{detail.maxParticipants})</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Sinh viên hỗ trợ hoặc cộng tác viên ngoài trường</p>
                </div>
                {isEditable && !isFull && (
                    <button
                        type="button"
                        onClick={() => { setEditTarget(null); setAddOpen(true) }}
                        className="w-full sm:w-auto px-2.5 py-1 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition-all text-[10px] sm:text-xs flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                        <Plus className="w-3 h-3" /> Thêm người tham gia
                    </button>
                )}
            </div>

            {participants.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl bg-muted/10">
                    <Users className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-xs font-medium">Chưa có người tham gia nào ngoài nhóm nghiên cứu chính</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {participants.map((p) => (
                        <ParticipantItem
                            key={p.id}
                            participant={p}
                            disabled={!isEditable}
                            onEditClick={(participant) => { setEditTarget(participant); setAddOpen(true) }}
                            onRemoveClick={setRemoveTarget}
                        />
                    ))}
                </div>
            )}

            <AddParticipantDialog
                open={addOpen}
                onOpenChange={setAddOpen}
                projectId={detail.id}
                editTarget={editTarget}
            />

            <DeleteParticipantDialog
                participantId={removeTarget?.id || null}
                name={removeTarget?.name || ''}
                loading={loading}
                onClose={() => setRemoveTarget(null)}
                onConfirm={handleRemove}
            />
        </div>
    )
}

