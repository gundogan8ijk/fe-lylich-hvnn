'use client';

import { storeBookDetail } from '@/Book-Lecturer-Detail/Book-Detail-store';
import { useState } from 'react';
import UpdateBookDialog from './UpdateBookDialog';

export default function BookInfoSection() {
    const { data: book } = storeBookDetail();
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!book) return null;

    const canUpdate = book.confirmedStatus === 'Draft' && book.isMyCreate;

    return (
        <div className="bg-card rounded-lg border border-border shadow-sm p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-foreground">Thông tin sách</h2>
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

            <div className="mb-8 space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Tiêu đề sách</label>
                <p className="text-base text-foreground font-medium">{book.title}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Nhà xuất bản</label>
                    <p className="text-base text-foreground font-medium">{book.publisher || '—'}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Năm xuất bản</label>
                    <p className="text-base text-foreground font-medium">{book.publishYear}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">ISBN</label>
                    <p className="text-base text-foreground font-medium">{book.isbn || '—'}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Người đăng ký</label>
                    <p className="text-base text-foreground font-medium">{book.createdByName}</p>
                </div>
            </div>

            {book.detailUrl && (
                <div className="mt-6 space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Link chi tiết</label>
                    <a href={book.detailUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm break-all hover:underline">
                        {book.detailUrl}
                    </a>
                </div>
            )}

            <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">File minh chứng</label>
                {book.proofDocumentUrl ? (
                    <a href={book.proofDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm break-all hover:underline">
                        Xem file PDF
                    </a>
                ) : (
                    <p className="text-muted-foreground text-sm">Không có</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Ngày tạo</label>
                    <p className="text-base text-foreground font-medium">{book.createdAt}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Cập nhật lần cuối</label>
                    <p className="text-base text-foreground font-medium">{new Date(book.lastModify).toLocaleDateString('vi-VN')}</p>
                </div>
            </div>

            <UpdateBookDialog
                key={dialogOpen ? `open-${book.id}` : `closed-${book.id}`}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                book={book}
            />
        </div>
    );
}