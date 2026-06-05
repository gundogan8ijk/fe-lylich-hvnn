'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { BookOpen, Loader2, UploadCloud } from 'lucide-react';
import { Input } from '@/_components/ui/input';
import { SearchSelectProps } from '@/_components/custom/selection-Props';
import { notify } from '@/_components/utils/Notify';
import { uploadToPdfCloudinary } from '@/_Common/_services/pdf-config';
import { RegisterBookForm } from '@/Book-Lecturer-List/Book-List-ser';
import { BOOK_CONTRIBUTOR_ROLE_OPTIONS } from '@/_constants/Book-constant';

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onSubmit: (data: RegisterBookForm) => Promise<boolean>;
};

const defaultForm: RegisterBookForm = {
    Title: '',
    Describe: '',
    Publisher: '',
    PublishYear: '',
    ProofUrl: '',
    ISBN: '',
    DetailUrl: '',
    BookRole: '',
};

export default function RegisterBookDialog({ open, onOpenChange, onSubmit }: Props) {
    const [form, setForm] = useState<RegisterBookForm>(defaultForm);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const resetForm = () => {
        setForm(defaultForm);
        setPdfFile(null);
    };

    const handleSubmit = async () => {
        if (!pdfFile) {
            notify.error('Vui lòng chọn file minh chứng PDF');
            return;
        }

        setSubmitting(true);
        try {
            const secureUrl = await uploadToPdfCloudinary(pdfFile);
            const finalFormData: RegisterBookForm = {
                ...form,
                ProofUrl: secureUrl,
            };
            const res = await onSubmit(finalFormData);
            if (res) {
                resetForm();
                onOpenChange(false);
            }
        } catch (error) {
            console.error('Lỗi đăng ký sách:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        resetForm();
        onOpenChange(false);
    };

    const setField = (key: keyof RegisterBookForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const canSubmit =
        form.Title && form.Describe && form.PublishYear && form.BookRole && pdfFile;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <BookOpen className="h-4 w-4" /> Đăng ký sách
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="space-y-4 py-1">
                    <div className="space-y-1.5">
                        <Label className="text-xs">Tiêu đề sách <span className="text-red-500">*</span></Label>
                        <Input placeholder="Nhập tiêu đề..." value={form.Title} onChange={setField('Title')} disabled={submitting} />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">Mô tả <span className="text-red-500">*</span></Label>
                        <Input placeholder="Mô tả tóm tắt..." value={form.Describe} onChange={setField('Describe')} disabled={submitting} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs">Nhà xuất bản</Label>
                            <Input placeholder="NXB Giáo dục..." value={form.Publisher} onChange={setField('Publisher')} disabled={submitting} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Năm xuất bản <span className="text-red-500">*</span></Label>
                            <Input type="date" value={form.PublishYear} onChange={setField('PublishYear')} disabled={submitting} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs">ISBN</Label>
                            <Input placeholder="978-3-16-148410-0" value={form.ISBN} onChange={setField('ISBN')} disabled={submitting} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Vai trò <span className="text-red-500">*</span></Label>
                            <SearchSelectProps
                                value={form.BookRole}
                                onChange={(val) => setForm(f => ({ ...f, BookRole: val }))}
                                options={BOOK_CONTRIBUTOR_ROLE_OPTIONS}
                                placeholder="Chọn vai trò..."
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">File minh chứng (PDF) <span className="text-red-500">*</span></Label>
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
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">Link chi tiết (URL nếu có)</Label>
                        <Input placeholder="https://..." value={form.DetailUrl} onChange={setField('DetailUrl')} disabled={submitting} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" size="sm" onClick={handleCancel} disabled={submitting}>Hủy</Button>
                    <Button size="sm" disabled={!canSubmit || submitting} onClick={handleSubmit}>
                        {submitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                        {submitting ? 'Đang xử lý...' : 'Đăng ký'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}