'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { FileText, Loader2, UploadCloud } from 'lucide-react';
import { Input } from '@/_components/ui/input';
import { SearchSelectProps } from '@/_components/custom/selection-Props';
import { uploadToPdfCloudinary } from '@/_Common/_services/pdf-config';
import { ProjectExternalDetail, UpdateProjectExternalForm } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-type';
import { updateProjectExternalAction } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-hook';
import { EVALUATION_PROJECT_EXTERNAL_OPTIONS, PROJECT_LEVEL_OPTIONS } from '@/_constants/ProjectExternal-constant';


type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    project: ProjectExternalDetail;
};

export default function UpdateProjectDialog({ open, onOpenChange, project }: Props) {
    const [form, setForm] = useState<UpdateProjectExternalForm>({
        title: project.title ?? '',
        describe: project.describe ?? '',
        certificateUrl: project.certificateUrl ?? '',
        organization: project.organization ?? '',
        completionAt: project.completionAt ?? '',
        level: project.level ?? '',
        evaluation: project.evaluation ?? 'NotSet',
        detailUrl: project.detailUrl ?? '',
    });
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.organization.trim() || !form.completionAt || !form.level) return;

        setSubmitting(true);
        try {
            let finalCertificateUrl = form.certificateUrl;
            if (pdfFile) {
                finalCertificateUrl = await uploadToPdfCloudinary(pdfFile);
            }

            const finalFormData: UpdateProjectExternalForm = {
                title: form.title.trim(),
                describe: form.describe.trim(),
                certificateUrl: finalCertificateUrl?.trim() || undefined,
                organization: form.organization.trim(),
                completionAt: form.completionAt,
                level: form.level,
                evaluation: form.evaluation === 'NotSet' ? undefined : form.evaluation,
                detailUrl: form.detailUrl?.trim() || undefined,
            };

            const res = await updateProjectExternalAction(project.id, finalFormData);
            if (res) {
                onOpenChange(false);
            }
        } catch (error) {
            console.error('Lỗi cập nhật đề tài:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    const setField = (key: keyof UpdateProjectExternalForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [key]: e.target.value }));

    const canSubmit = form.title.trim() && form.organization.trim() && form.completionAt && form.level;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <FileText className="h-4 w-4" /> Cập nhật thông tin đề tài
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="space-y-4 py-1">
                    {/* Tiêu đề */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Tiêu đề đề tài <span className="text-red-500">*</span></Label>
                        <Input placeholder="Nhập tiêu đề..." value={form.title} onChange={setField('title')} disabled={submitting} />
                    </div>

                    {/* Mô tả */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Mô tả <span className="text-red-500">*</span></Label>
                        <Input placeholder="Mô tả tóm tắt..." value={form.describe} onChange={setField('describe')} disabled={submitting} />
                    </div>

                    {/* Cơ quan chủ trì */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Cơ quan chủ trì <span className="text-red-500">*</span></Label>
                        <Input placeholder="Tên cơ quan..." value={form.organization} onChange={setField('organization')} disabled={submitting} />
                    </div>

                    {/* Cấp độ và đánh giá */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs">Cấp độ <span className="text-red-500">*</span></Label>
                            <SearchSelectProps
                                value={form.level}
                                onChange={(val) => setForm(f => ({ ...f, level: val }))}
                                options={PROJECT_LEVEL_OPTIONS}
                                placeholder="Chọn cấp độ..."
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Đánh giá</Label>
                            <SearchSelectProps
                                value={form.evaluation || 'NotSet'}
                                onChange={(val) => setForm(f => ({ ...f, evaluation: val }))}
                                options={EVALUATION_PROJECT_EXTERNAL_OPTIONS}
                                placeholder="Chọn đánh giá..."
                            />
                        </div>
                    </div>

                    {/* Ngày hoàn thành */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Ngày hoàn thành <span className="text-red-500">*</span></Label>
                        <Input type="date" value={form.completionAt} onChange={setField('completionAt')} disabled={submitting} />
                    </div>

                    {/* File chứng chỉ mới */}
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
                        {project.certificateUrl && !pdfFile && (
                            <p className="text-[11px] text-muted-foreground italic mt-0.5 pl-1">
                                🔗 Đang có sẵn file minh chứng cũ.
                            </p>
                        )}
                    </div>

                    {/* URL chi tiết */}
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