'use client'

import { useState } from 'react'
import { Card } from "@/_components/ui/card"
import { Button } from "@/_components/ui/button"
import { Plus, Wallet, Trash2 } from "lucide-react"
import { storeProjectManagerDetail } from "@/working-manager/project-detail/project-detail-store"
import AddFundingDialog from './AddFundingDialog'
import DeleteConfirmDialog from '@/_components/custom/DeleteConfirmDialog'
import { deleteFundingByManagerAction } from '@/working-manager/project-detail/project-detail-hook'

export default function ContentFundingManger() {
    const data = storeProjectManagerDetail((s) => s.data)
    const isDeleting = storeProjectManagerDetail((s) => s.isDeleting)
    
    const [selectedFunding, setSelectedFunding] = useState<{ source: string; label: string } | null>(null)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    if (!data) return null

    const funding = data.funding ?? []
    const perm = data.permissions
    const canUpdate = perm?.canUpdateFunding
    const max = perm?.maxFunding ?? 4

    const getSourceLabel = (src: string) => {
        if (src === 'StateBudget') return 'Ngân sách Nhà nước'
        if (src === 'CorporateFunding') return 'Tài trợ Doanh nghiệp'
        if (src === 'SelfFunded') return 'Tự túc / Tự tài trợ'
        return src
    }

    const handleDeleteConfirm = async () => {
        if (!selectedFunding) return
        await deleteFundingByManagerAction(selectedFunding.source)
        setIsDeleteOpen(false)
        setSelectedFunding(null)
    }

    const totalFunding = funding.reduce((sum, f) => sum + f.amount, 0)

    return (
        <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 rounded-2xl p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl">
                        <Wallet className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Nguồn kinh phí</h2>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            {funding.length}/{max} nguồn kinh phí
                        </p>
                    </div>
                </div>

                {canUpdate && funding.length < max && (
                    <Button
                        size="sm"
                        onClick={() => setIsAddOpen(true)}
                        className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Thêm nguồn kinh phí
                    </Button>
                )}
            </div>

            {/* List */}
            {funding.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                        <Wallet className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-400 dark:text-slate-500 italic">Chưa có thông tin kinh phí.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-3">
                        {funding.map((f, i) => (
                            <div key={i} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                        {getSourceLabel(f.source)}
                                    </h4>
                                    {f.description && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            {f.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                        {f.amount.toLocaleString('vi-VN')} ₫
                                    </span>
                                    {canUpdate && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => { setSelectedFunding({ source: f.source, label: getSourceLabel(f.source) }); setIsDeleteOpen(true); }}
                                            className="w-8 h-8 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg animate-fade-in"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="bg-emerald-50/40 border border-emerald-100/50 dark:bg-emerald-950/10 dark:border-emerald-900/40 rounded-xl p-4 flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tổng cộng kinh phí</span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                            {totalFunding.toLocaleString('vi-VN')} ₫
                        </span>
                    </div>
                </div>
            )}

            <AddFundingDialog
                open={isAddOpen}
                onOpenChange={setIsAddOpen}
                projectId={data.id}
            />

            <DeleteConfirmDialog
                open={isDeleteOpen}
                deleting={isDeleting}
                description={`Nguồn kinh phí "${selectedFunding?.label}" sẽ bị xóa khỏi đề tài.`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => { setIsDeleteOpen(false); setSelectedFunding(null); }}
            />
        </Card>
    )
}
