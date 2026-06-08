'use client'

import { useState } from 'react'
import { Card } from "@/_components/ui/card"
import { Button } from "@/_components/ui/button"
import { Badge } from "@/_components/ui/badge"
import { getDateOnly } from "@/_lib/display-variable-helper"
import { UserPlus, Users, Trash2, ShieldCheck, Edit, Mail } from "lucide-react"
import { storeProjectManagerDetail } from "@/working-manager/project-detail/project-detail-store"
import { ProjectParticipantRecord } from "@/working-manager/project-detail/project-detail-type"
import AddParticipantDialog from './AddParticipantDialog'
import DeleteConfirmDialog from '@/_components/custom/DeleteConfirmDialog'
import { deleteParticipantByManagerAction } from '@/working-manager/project-detail/project-detail-hook'

export default function ContentParticipantsManger() {
    const data = storeProjectManagerDetail((s) => s.data)
    const isDeleting = storeProjectManagerDetail((s) => s.isDeleting)
    
    const [selectedParticipant, setSelectedParticipant] = useState<{ id: string; name: string } | null>(null)
    const [editTarget, setEditTarget] = useState<ProjectParticipantRecord | null>(null)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    if (!data) return null

    const participants = data.participants ?? []
    const perm = data.permissions
    const canUpdate = perm?.canUpdateContributors // aligned with backend rule: Status is Pending or InProgress
    const max = perm?.maxParticipants ?? 5

    const handleDeleteConfirm = async () => {
        if (!selectedParticipant) return
        await deleteParticipantByManagerAction(selectedParticipant.id)
        setIsDeleteOpen(false)
        setSelectedParticipant(null)
    }

    return (
        <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 rounded-2xl p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl">
                        <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Người hỗ trợ (Thành viên ngoài)</h2>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            {participants.length}/{max} thành viên hỗ trợ
                        </p>
                    </div>
                </div>

                {canUpdate && participants.length < max && (
                    <Button
                        size="sm"
                        onClick={() => { setEditTarget(null); setIsAddOpen(true); }}
                        className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                    >
                        <UserPlus className="w-3.5 h-3.5" />
                        Thêm người hỗ trợ
                    </Button>
                )}
            </div>

            {/* List */}
            {participants.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                        <Users className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-400 dark:text-slate-500 italic">Chưa có người hỗ trợ nào.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {participants.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 font-bold text-sm">
                                {p.name.charAt(0)}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                                        {p.name}
                                    </span>
                                    {p.email && (
                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> {p.email}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                    <Badge
                                        variant="secondary"
                                        className="text-[10px] px-2 py-0 rounded-md font-medium shadow-none bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    >
                                        {p.role === 'Support' ? 'Sinh viên hỗ trợ' : p.role === 'Community' ? 'Cộng tác viên' : p.role}
                                    </Badge>
                                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                        Tham gia: {getDateOnly(p.joinedAt)}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            {canUpdate && (
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => { setEditTarget(p); setIsAddOpen(true); }}
                                        className="w-8 h-8 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => { setSelectedParticipant({ id: p.id, name: p.name }); setIsDeleteOpen(true); }}
                                        className="w-8 h-8 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <AddParticipantDialog
                open={isAddOpen}
                onOpenChange={setIsAddOpen}
                projectId={data.id}
                editTarget={editTarget}
            />

            <DeleteConfirmDialog
                open={isDeleteOpen}
                deleting={isDeleting}
                description={`Người hỗ trợ "${selectedParticipant?.name}" sẽ bị xóa khỏi đề tài.`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => { setIsDeleteOpen(false); setSelectedParticipant(null); }}
            />
        </Card>
    )
}
