'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { BookOpen, Loader2, UploadCloud } from 'lucide-react';
import { Input } from '@/_components/ui/input';
import { uploadToPdfCloudinary } from '@/_Common/_services/pdf-config';
import { BookDetail, UpdateBookForm } from '@/Book-Lecturer-Detail/Book-Detail-type';
import { updateBookAction } from '@/Book-Lecturer-Detail/Book-Detail-hook';

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    book: BookDetail;
};

export default function UpdateBookDialog({ open, onOpenChange, book }: Props) {
    const [form, setForm] = useState<UpdateBookForm>({
        title: book.title ?? '',
        describe: book.describe ?? '',
        publisher: book.publisher ?? '',
        publishYear: book.publishYear ?? '',
        proofUrl: book.proofDocumentUrl ?? '',
        isbn: book.isbn ?? '',
        detailUrl: book.detailUrl ?? '',
    });
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.publishYear) return;

        setSubmitting(true);
        try {
            let finalProofUrl = form.proofUrl;
            if (pdfFile) {
                finalProofUrl = await uploadToPdfCloudinary(pdfFile);
            }

            const finalFormData: UpdateBookForm = {
                title: form.title.trim(),
                describe: form.describe.trim(),
                publisher: form.publisher?.trim() || undefined,
                publishYear: form.publishYear,
                proofUrl: finalProofUrl?.trim() || undefined,
                isbn: form.isbn?.trim() || undefined,
                detailUrl: form.detailUrl?.trim() || undefined,
            };

            const res = await updateBookAction(book.id, finalFormData);
            if (res) {
                onOpenChange(false);
            }
        } catch (error) {
            console.error('Lỗi cập nhật sách:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    const setField = (key: keyof UpdateBookForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [key]: e.target.value }));

    const canSubmit = form.title.trim() && form.publishYear;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <BookOpen className="h-4 w-4" /> Cập nhật thông tin sách
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="space-y-4 py-1">
                    <div className="space-y-1.5">
                        <Label className="text-xs">Tiêu đề sách <span className="text-red-500">*</span></Label>
                        <Input placeholder="Nhập tiêu đề..." value={form.title} onChange={setField('title')} disabled={submitting} />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">Mô tả <span className="text-red-500">*</span></Label>
                        <Input placeholder="Mô tả tóm tắt..." value={form.describe} onChange={setField('describe')} disabled={submitting} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs">Nhà xuất bản</Label>
                            <Input placeholder="NXB..." value={form.publisher} onChange={setField('publisher')} disabled={submitting} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Năm xuất bản <span className="text-red-500">*</span></Label>
                            <Input type="date" value={form.publishYear} onChange={setField('publishYear')} disabled={submitting} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">ISBN</Label>
                        <Input placeholder="978-3-16-148410-0" value={form.isbn} onChange={setField('isbn')} disabled={submitting} />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">File minh chứng mới (PDF - để trống nếu giữ nguyên)</Label>
                        <div className="relative flex items-center">
                            <Input
                                type="file"
                                accept="application/pdf"
                                disabled={submitting}
                                className="cursor-pointer pr-10 text-sm"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setPdfFile(file);
                                }}
                            />
                            <UploadCloud className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                        {book.proofDocumentUrl && !pdfFile && (
                            <p className="text-[11px] text-muted-foreground italic mt-0.5 pl-1">
                                🔗 Đang có sẵn file minh chứng cũ.
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">Link chi tiết (URL nếu có)</Label>
                        <Input placeholder="https://..." value={form.detailUrl} onChange={setField('detailUrl')} disabled={submitting} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" size="sm" onClick={handleCancel} disabled={submitting}>Hủy</Button>
                    <Button size="sm" disabled={!canSubmit || submitting} onClick={handleSubmit}>
                        {submitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                        {submitting ? 'Đang xử lý...' : 'Cập nhật'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}