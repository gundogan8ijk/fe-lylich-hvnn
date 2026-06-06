'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storeArticleDetail } from '@/Article-Lecturer-Detail/ArticleDetail-Lecturer-store';
import {
    deleteArticleAction,
    submitArticleAction,
    backToDraftArticleAction,
} from '@/Article-Lecturer-Detail/ArticleDetail-Lecturer-hook';
import { Trash2, Send, ArrowLeft, Loader2, X, RotateCcw } from 'lucide-react';
import { Button } from '@/_components/ui/button';

type DialogType = 'submit' | 'delete' | 'back_to_draft' | null;

const DIALOG_CONFIG = {
    submit: {
        icon: <Send className="w-5 h-5 text-emerald-600" />,
        iconBg: 'bg-emerald-50',
        title: 'Gửi bài báo để duyệt?',
        description: 'Sau khi gửi, bài báo sẽ chuyển sang trạng thái chờ duyệt và không thể chỉnh sửa.',
        confirmLabel: 'Gửi duyệt',
        loadingLabel: 'Đang gửi...',
        confirmCls: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    back_to_draft: {
        icon: <RotateCcw className="w-5 h-5 text-amber-600" />,
        iconBg: 'bg-amber-50',
        title: 'Hủy gửi bài báo?',
        description: 'Bài báo sẽ được chuyển từ trạng thái Chờ duyệt về trạng thái Nháp để tiếp tục chỉnh sửa.',
        confirmLabel: 'Chuyển về Nháp',
        loadingLabel: 'Đang xử lý...',
        confirmCls: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    delete: {
        icon: <Trash2 className="w-5 h-5 text-rose-600" />,
        iconBg: 'bg-rose-50',
        title: 'Xóa bài báo này?',
        description: 'Toàn bộ dữ liệu bài báo sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.',
        confirmLabel: 'Xóa vĩnh viễn',
        loadingLabel: 'Đang xóa...',
        confirmCls: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
} as const;

function ConfirmDialog({
    type,
    loading,
    onConfirm,
    onCancel,
}: {
    type: DialogType;
    loading: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    if (!type) return null;
    const cfg = DIALOG_CONFIG[type];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between p-5 pb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.iconBg}`}>
                        {cfg.icon}
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
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
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={onCancel}
                        disabled={loading}
                    >
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
        </div>
    );
}

export default function ActionButtons() {
    const router = useRouter();
    const article = storeArticleDetail((s) => s.data);
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState<DialogType>(null);

    if (!article) return null;

    const canSubmit = article.confirmedStatus === 'Draft' && article.isMyCreate;
    const canBackToDraft = article.confirmedStatus === 'Pending' && article.isMyCreate;
    const canDelete =
        (article.confirmedStatus === 'Draft' || article.confirmedStatus === 'Cancelled') &&
        article.isMyCreate;

    const handleConfirm = async () => {
        setLoading(true);
        try {
            if (dialog === 'submit') await submitArticleAction();
            if (dialog === 'delete') await deleteArticleAction();
            if (dialog === 'back_to_draft') await backToDraftArticleAction();
            setDialog(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ConfirmDialog
                type={dialog}
                loading={loading}
                onConfirm={handleConfirm}
                onCancel={() => setDialog(null)}
            />

            <div className="flex items-center justify-between gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-700 gap-1.5"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại
                </Button>

                <div className="flex items-center gap-2">
                    {canDelete && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300"
                            onClick={() => setDialog('delete')}
                            disabled={loading}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Xóa bài báo
                        </Button>
                    )}

                    {canBackToDraft && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-amber-600 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                            onClick={() => setDialog('back_to_draft')}
                            disabled={loading}
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Hủy chờ duyệt (Về nháp)
                        </Button>
                    )}

                    {canSubmit && (
                        <Button
                            size="sm"
                            className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                            onClick={() => setDialog('submit')}
                            disabled={loading}
                        >
                            <Send className="w-3.5 h-3.5" />
                            Gửi duyệt
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}