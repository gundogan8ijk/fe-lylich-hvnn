'use client';

import { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { storeArticleDetail } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-store';
import { removeExternalContributorAction } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-hook';

interface Props {
    externalContributorId: string | null;
    onClose: () => void;
}

export default function DeleteExternalContributorDialog({ externalContributorId, onClose }: Props) {
    const { data } = storeArticleDetail();
    const [loading, setLoading] = useState(false);

    if (!externalContributorId) return null;

    const contributor = data?.externalContributors.find(c => c.id === externalContributorId);
    if (!contributor) return null;

    const handleConfirm = async () => {
        if (!data?.id) return;
        setLoading(true);
        try {
            await removeExternalContributorAction(data.id, externalContributorId);
            onClose();
        } catch (error) {
            console.error("Lỗi khi gỡ tác giả ngoài:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-background rounded-xl shadow-xl max-w-sm w-full border border-border animate-in zoom-in-95 duration-150">
                <div className="px-6 py-4 border-b border-border flex items-center gap-2.5 text-destructive">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <h3 className="text-base font-semibold text-foreground">Xác nhận gỡ tác giả ngoài</h3>
                </div>
                <div className="px-6 py-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Bạn có chắc chắn muốn gỡ tác giả tự do{' '}
                        <span className="font-semibold text-foreground">{contributor.fullName}</span>{' '}
                        khỏi danh sách đóng góp của bài báo này?
                    </p>
                </div>
                <div className="px-6 py-4 border-t border-border flex justify-end gap-2.5">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors flex items-center gap-1.5 min-w-[90px] justify-center"
                    >
                        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Xác nhận xóa'}
                    </button>
                </div>
            </div>
        </div>
    );
}