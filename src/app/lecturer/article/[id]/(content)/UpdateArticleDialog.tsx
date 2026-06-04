'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { FileText, Loader2, UploadCloud } from 'lucide-react';
import { Input } from '@/_components/ui/input';
import { uploadToPdfCloudinary } from '@/_Common/_services/pdf-config';
import { ArticleDetailItem, UpdateArticleByLecturerForm } from '@/Article-Lecturer-Detail/ArticleDetail-Lecturer-type';
import { updateArticleByLecturerAction } from '@/Article-Lecturer-Detail/ArticleDetail-Lecturer-hook';

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    article: ArticleDetailItem;
};

export default function UpdateArticleDialog({ open, onOpenChange, article }: Props) {
    const [form, setForm] = useState<UpdateArticleByLecturerForm>({
        title: article.title ?? '',
        describe: article.describe ?? '',
        publishedAt: article.publishedAt ?? '',
        proofUrl: article.proofDocumentUrl ?? '',
        journalName: article.journalName ?? '',
        doi: article.doi ?? '',
        detailUrl: article.detailUrl ?? '',
    });
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.publishedAt) return;

        setSubmitting(true);
        try {
            let finalProofUrl = form.proofUrl;

            // Nếu người dùng chọn file PDF mới -> Upload lên Cloudinary
            if (pdfFile) {
                finalProofUrl = await uploadToPdfCloudinary(pdfFile);
            }

            const finalFormData: UpdateArticleByLecturerForm = {
                title: form.title.trim(),
                describe: form.describe.trim(),            // ← thêm
                publishedAt: form.publishedAt,
                proofUrl: finalProofUrl?.trim() || undefined,
                journalName: form.journalName?.trim() || undefined,
                doi: form.doi?.trim() || undefined,
                detailUrl: form.detailUrl?.trim() || undefined,
            };

            const res = await updateArticleByLecturerAction(article.id, finalFormData);
            if (res) {
                onOpenChange(false);
            }
        } catch (error) {
            console.error('Lỗi trong quá trình cập nhật bài báo:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    const set = (key: keyof UpdateArticleByLecturerForm) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }));

    const canSubmit = form.title?.trim() && form.publishedAt;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <FileText className="h-4 w-4" /> Cập nhật thông tin bài báo
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="space-y-4 py-1">
                    {/* Tiêu đề bài báo */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Tiêu đề bài báo <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            placeholder="Nhập tiêu đề bài báo..."
                            value={form.title}
                            onChange={set('title')}
                            disabled={submitting}
                        />
                    </div>

                    {/* Mô tả bài báo */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Mô tả <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            placeholder="Nhập mô tả bài báo..."
                            value={form.describe}
                            onChange={set('describe')}
                            disabled={submitting}
                        />
                    </div>

                    {/* Ngày xuất bản */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Ngày xuất bản <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="date"
                            value={form.publishedAt}
                            onChange={set('publishedAt')}
                            disabled={submitting}
                        />
                    </div>

                    {/* Tên tạp chí */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Tên tạp chí / Hội nghị</Label>
                        <Input
                            placeholder="Nhập tên tạp chí danh tiếng, hội nghị..."
                            value={form.journalName}
                            onChange={set('journalName')}
                            disabled={submitting}
                        />
                    </div>

                    {/* DOI */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Mã định danh (DOI)</Label>
                        <Input
                            placeholder="Ví dụ: 10.1145/3613904..."
                            value={form.doi}
                            onChange={set('doi')}
                            disabled={submitting}
                        />
                    </div>

                    {/* File minh chứng PDF */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            File tài liệu minh chứng (PDF mới - để trống nếu giữ nguyên)
                        </Label>
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
                        {article.proofDocumentUrl && !pdfFile && (
                            <p className="text-[11px] text-muted-foreground italic mt-0.5 pl-1">
                                🔗 Đang có sẵn file minh chứng cũ trên hệ thống.
                            </p>
                        )}
                    </div>

                    {/* Link chi tiết */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Link chi tiết bài báo (URL nếu có)</Label>
                        <Input
                            placeholder="https://sciencedirect.com/article-path..."
                            value={form.detailUrl}
                            onChange={set('detailUrl')}
                            disabled={submitting}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" size="sm" onClick={handleCancel} disabled={submitting}>
                        Hủy
                    </Button>
                    <Button size="sm" disabled={!canSubmit || submitting} onClick={handleSubmit}>
                        {submitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                        {submitting ? 'Đang xử lý...' : 'Cập nhật'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}