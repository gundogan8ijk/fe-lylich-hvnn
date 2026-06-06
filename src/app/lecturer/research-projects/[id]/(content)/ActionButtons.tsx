'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Trash2, Send, ArrowLeft, Loader2, X, Edit } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import { storeProjectDetail } from '@/Project-Lecturer-Detail/Project-Detail-store'
import { submitProjectAction, cancelProjectAction, deleteProjectAction } from '@/Project-Lecturer-Detail/Project-Detail-hook'
import UpdateProjectDialog from './UpdateProjectDialog'

type DialogType = 'submit' | 'cancel' | 'delete' | null

const DIALOG_CONFIG = {
    submit: {
        icon: <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        title: 'Gửi yêu cầu phê duyệt?',
        description: 'Sau khi gửi, đề tài sẽ chuyển sang trạng thái chờ duyệt và không thể chỉnh sửa.',
        confirmLabel: 'Gửi duyệt',
        loadingLabel: 'Đang gửi...',
        confirmCls: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    cancel: {
        icon: <X className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        title: 'Hủy yêu cầu phê duyệt?',
        description: 'Đề tài sẽ chuyển về trạng thái Bản Nháp để bạn có thể chỉnh sửa lại.',
        confirmLabel: 'Xác nhận hủy',
        loadingLabel: 'Đang hủy...',
        confirmCls: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    delete: {
        icon: <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
        iconBg: 'bg-rose-50 dark:bg-rose-900/30',
        title: 'Xóa đề tài này?',
        description: 'Toàn bộ dữ liệu đề tài sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.',
        confirmLabel: 'Xóa vĩnh viễn',
        loadingLabel: 'Đang xóa...',
        confirmCls: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
} as const

function ConfirmDialog({
    type,
    loading,
    onConfirm,
    onCancel,
}: {
    type: DialogType
    loading: boolean
    onConfirm: () => void
    onCancel: () => void
}) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!type || !mounted) return null
    const cfg = DIALOG_CONFIG[type]

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between p-5 pb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.iconBg}`}>
                        {cfg.icon}
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="px-5 pb-5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                        {cfg.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {cfg.description}
                    </p>
                </div>
                <div className="flex gap-2.5 px-5 pb-5">
                    <Button variant="outline" size="sm" className="flex-1" onClick={onCancel} disabled={loading}>
                        Hủy
                    </Button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${cfg.confirmCls}`}
                    >
                        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        {loading ? cfg.loadingLabel : cfg.confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default function ActionButtons() {
    const router = useRouter()
    const { data: detail } = storeProjectDetail()

    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState<DialogType>(null)
    const [editInfoOpen, setEditInfoOpen] = useState(false)

    if (!detail) return null

    const isEditable = detail.isMyCreate && detail.confirmedStatus === 'Draft'
    const canCancel = detail.isMyCreate && detail.confirmedStatus === 'Pending'
    const canDelete = detail.isMyCreate && (detail.confirmedStatus === 'Draft' || detail.confirmedStatus === 'Cancelled')

    const handleConfirm = async () => {
        setLoading(true)
        try {
            if (dialog === 'submit') await submitProjectAction(detail.id)
            if (dialog === 'cancel') await cancelProjectAction(detail.id)
            if (dialog === 'delete') await deleteProjectAction(detail.id)
            setDialog(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <ConfirmDialog
                type={dialog}
                loading={loading}
                onConfirm={handleConfirm}
                onCancel={() => setDialog(null)}
            />

            {isEditable && (
                <>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditInfoOpen(true)}
                        className="h-8 gap-1.5 px-3 text-xs bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                        <Edit className="w-3.5 h-3.5" /> Chỉnh sửa
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => setDialog('submit')}
                        className="h-8 gap-1.5 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
                    >
                        <Send className="w-3.5 h-3.5" /> Gửi duyệt
                    </Button>
                </>
            )}

            {canCancel && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDialog('cancel')}
                    className="h-8 gap-1.5 px-3 text-xs bg-white text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-400 cursor-pointer"
                >
                    <X className="w-3.5 h-3.5" /> Hủy yêu cầu duyệt
                </Button>
            )}

            {canDelete && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDialog('delete')}
                    className="h-8 w-8 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:text-rose-300 dark:hover:bg-rose-500/10 cursor-pointer"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            )}

            {editInfoOpen && (
                <UpdateProjectDialog
                    open={editInfoOpen}
                    onOpenChange={setEditInfoOpen}
                    project={detail}
                />
            )}
        </div>
    )
}

