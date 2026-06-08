'use client'

import { Button } from "@/_components/ui/button"
import { Plus, X } from 'lucide-react'
import { MODAL_Manger_detail_PROJECT_KEYS } from '@/_constants/project-constant'
import { storeProjectManagerDetail } from "@/working-manager/ProjectManger/store-detail-project-manger"
import AddDisciplineDialog from "./AddDisciplineDialog"
import DeleteConfirmDialog from "@/_components/custom/DeleteConfirmDialog"
import { deleteDisciplineByManagerAction } from "@/working-manager/ProjectManger/hook-projects-manger"
import { useState } from "react"

export default function DisciplineSection() {
    const data = storeProjectManagerDetail((s) => s.data)
    const isDeleting = storeProjectManagerDetail((s) => s.isDeleting)
    const { openModal, closeModal, isModalOpen } = storeProjectManagerDetail()

    const [selectedDiscipline, setSelectedDiscipline] = useState<{ id: string; name: string } | null>(null)

    if (!data) return null

    const base = data.baseInfo
    const perm = data.permissions

    return (
        <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 space-y-4 bg-white dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-indigo-500 rounded-full" /> Lĩnh vực nghiên cứu
                </h3>
                {perm?.canUpdateBase && base?.disciplines && base.disciplines.length < (perm.maxDisciplines ?? 5) && (
                    <Button 
                        onClick={() => openModal(MODAL_Manger_detail_PROJECT_KEYS.ADD_DISCIPLINE)}
                        variant="ghost" 
                        size="sm" 
                        className="h-8 gap-1 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                    >
                        <Plus className="w-3.5 h-3.5" /> Thêm
                    </Button>
                )}
            </div>

            {!base?.disciplines || base.disciplines.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">Chưa có lĩnh vực nghiên cứu nào được gán.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {base.disciplines.map((d) => (
                        <span
                            key={d.id}
                            className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/50 dark:text-indigo-300 pl-3 pr-2 py-1 rounded-lg text-xs font-medium group transition-all"
                        >
                            {/* Tên lĩnh vực */}
                            {d.name}

                            {/* Nút xóa - Chỉ hiển thị khi có quyền update */}
                            {perm?.canUpdateBase && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedDiscipline({ id: d.id, name: d.name })
                                        openModal(MODAL_Manger_detail_PROJECT_KEYS.REMOVE_DISCIPLINE)
                                    }}
                                    className="p-0.5 rounded-md text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 dark:text-indigo-500 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/60 transition-colors"
                                    title={`Xóa ${d.name}`}
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </span>
                    ))}
                </div>
            )}

            <AddDisciplineDialog />
            <DeleteConfirmDialog
                open={isModalOpen(MODAL_Manger_detail_PROJECT_KEYS.REMOVE_DISCIPLINE)}
                deleting={isDeleting}
                description={`Lĩnh vực "${selectedDiscipline?.name}" sẽ bị xóa`}
                onConfirm={() => deleteDisciplineByManagerAction(selectedDiscipline?.id ?? '')}
                onCancel={() => {
                    closeModal(MODAL_Manger_detail_PROJECT_KEYS.REMOVE_DISCIPLINE)
                    setSelectedDiscipline(null)
                }}
            />
        </div>
    )
}
