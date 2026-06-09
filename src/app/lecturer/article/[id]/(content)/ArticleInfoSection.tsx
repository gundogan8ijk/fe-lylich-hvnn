'use client';

import { useState } from 'react';
import { storeArticleDetail } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-store';
import UpdateArticleDialog from './UpdateArticleDialog';

export default function ArticleInfoSection() {
    const { data: article } = storeArticleDetail();
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!article) return null;

    const canUpdate = article.confirmedStatus === 'Draft' && article.isMyCreate;

    return (
        <div className="space-y-6">
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex justify-between items-center mb-2">

                {canUpdate && (
                    <button
                        onClick={() => setDialogOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Chỉnh sửa
                    </button>
                )}
            </div>

            {/* ── Nội dung các trường (giữ nguyên logic hiển thị) ──────────── */}
            <div className="mb-6 space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Tên bài báo</label>
                <p className="text-base text-foreground font-medium">{article.title}</p>
            </div>

            <div className="mb-6 space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Mô tả</label>
                <p className="text-base text-foreground font-medium whitespace-pre-wrap">{article.describe || '—'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Ngày công bố</label>
                    <p className="text-base text-foreground font-medium">{article.publishedAt}</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Người đăng kí</label>
                    <p className="text-base text-foreground font-medium">{article.createdByName}</p>
                </div>
            </div>

            {/* ── Update Dialog ───────────────────────────────────────────── */}
            <UpdateArticleDialog
                key={dialogOpen ? `open-${article.id}` : `closed-${article.id}`}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                article={article}
            />
        </div>
    );
}