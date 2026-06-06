'use client'

import { Loader2, Trash2, X } from 'lucide-react'
import { Button } from '@/_components/ui/button'

type Props = {
    disciplineId: string | null
    name: string
    loading: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function DeleteDisciplineDialog({ disciplineId, name, loading, onClose, onConfirm }: Props) {
    if (!disciplineId) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between p-5 pb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-50 dark:bg-rose-900/30">
                        <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="px-5 pb-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        Xóa lĩnh vực?
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Bạn có chắc muốn xóa lĩnh vực <strong className="text-slate-800 dark:text-slate-200">"{name}"</strong> khỏi đề tài?
                    </p>
                </div>
                <div className="flex gap-2.5 px-5 pb-5">
                    <Button variant="outline" size="sm" className="flex-1" onClick={onClose} disabled={loading}>
                        Hủy
                    </Button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    )
}
