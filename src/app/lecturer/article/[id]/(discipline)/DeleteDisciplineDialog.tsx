'use client';

import { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { storeArticleDetail } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-store';
import { removeDisciplineAction } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-hook';

interface Props {
    disciplineId: string | null;
    onClose: () => void;
}

export default function DeleteDisciplineDialog({ disciplineId, onClose }: Props) {
    const { data } = storeArticleDetail();
    const [loading, setLoading] = useState(false);

    if (!disciplineId) return null;

    // Lấy tên discipline từ store để hiển thị
    const discipline = data?.disciplines.find(d => d.id === disciplineId);
    if (!discipline) return null;

    const handleConfirm = async () => {
        if (!data?.id) return;
        setLoading(true);
        await removeDisciplineAction(data.id, disciplineId);
        onClose();
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-background rounded-xl shadow-xl max-w-sm w-full border border-border animate-in zoom-in-95 duration-150">
                <div className="px-6 py-4 border-b border-border flex items-center gap-2.5 text-destructive">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <h3 className="text-base font-semibold text-foreground">Xác nhận gỡ lĩnh vực</h3>
                </div>
                <div className="px-6 py-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Bạn có chắc chắn muốn gỡ lĩnh vực{' '}
                        <span className="font-semibold text-foreground">{discipline.name}</span>{' '}
                        khỏi danh sách lĩnh vực của bài báo này?
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