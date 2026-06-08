'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { FileText, Loader2, UploadCloud } from 'lucide-react';
import { Input } from '@/_components/ui/input';
import { SearchSelectProps } from '@/_components/custom/selection-Props';
import { notify } from '@/_components/utils/Notify';
import { uploadToPdfCloudinary } from '@/_Common/_services/pdf-config';
import { RegisterProjectExternalForm } from '@/working-Lecturer/ProjectExternal-List/ProjectExternal-List-ser';
import { EVALUATION_PROJECT_EXTERNAL_OPTIONS, PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS, PROJECT_LEVEL_OPTIONS } from '@/_constants/ProjectExternal-constant';


type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: RegisterProjectExternalForm) => Promise<boolean>;
};

const defaultForm: RegisterProjectExternalForm = {
  Title: '',
  Describe: '',
  CertificateUrl: '',
  Organization: '',
  CompletionAt: '',
  Level: '',
  Evaluation: 'NotSet',
  Role: '',
  DetailUrl: '',
};

export default function RegisterProjectExternalDialog({ open, onOpenChange, onSubmit }: Props) {
  const [form, setForm] = useState<RegisterProjectExternalForm>(defaultForm);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setForm(defaultForm);
    setPdfFile(null);
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      notify.error('Vui lòng chọn file minh chứng (chứng chỉ / quyết định)');
      return;
    }

    setSubmitting(true);
    try {
      const secureUrl = await uploadToPdfCloudinary(pdfFile);
      const finalFormData: RegisterProjectExternalForm = {
        ...form,
        CertificateUrl: secureUrl,
      };
      const res = await onSubmit(finalFormData);
      if (res) {
        resetForm();
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Lỗi đăng ký đề tài ngoài:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const setField = (key: keyof RegisterProjectExternalForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const canSubmit =
    form.Title &&
    form.Describe &&
    form.Organization &&
    form.CompletionAt &&
    form.Level &&
    form.Role &&
    pdfFile;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" /> Đăng ký đề tài nghiên cứu ngoài
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="space-y-4 py-1">
          {/* Tiêu đề */}
          <div className="space-y-1.5">
            <Label className="text-xs">Tiêu đề đề tài <span className="text-red-500">*</span></Label>
            <Input placeholder="Nhập tiêu đề..." value={form.Title} onChange={setField('Title')} disabled={submitting} />
          </div>

          {/* Mô tả */}
          <div className="space-y-1.5">
            <Label className="text-xs">Mô tả <span className="text-red-500">*</span></Label>
            <Input placeholder="Mô tả tóm tắt nội dung..." value={form.Describe} onChange={setField('Describe')} disabled={submitting} />
          </div>

          {/* Cơ quan chủ trì */}
          <div className="space-y-1.5">
            <Label className="text-xs">Cơ quan chủ trì <span className="text-red-500">*</span></Label>
            <Input placeholder="Tên cơ quan, trường, viện..." value={form.Organization} onChange={setField('Organization')} disabled={submitting} />
          </div>

          {/* Cấp độ và đánh giá */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Cấp độ <span className="text-red-500">*</span></Label>
              <SearchSelectProps
                value={form.Level}
                onChange={(val) => setForm(f => ({ ...f, Level: val }))}
                options={PROJECT_LEVEL_OPTIONS}
                placeholder="Chọn cấp độ..."
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Đánh giá (tự đánh giá)</Label>
              <SearchSelectProps
                value={form.Evaluation || 'NotSet'}
                onChange={(val) => setForm(f => ({ ...f, Evaluation: val }))}
                options={EVALUATION_PROJECT_EXTERNAL_OPTIONS}
                placeholder="Chọn đánh giá..."
              />
            </div>
          </div>

          {/* Ngày hoàn thành và vai trò */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Ngày hoàn thành <span className="text-red-500">*</span></Label>
              <Input type="date" value={form.CompletionAt} onChange={setField('CompletionAt')} disabled={submitting} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Vai trò trong đề tài <span className="text-red-500">*</span></Label>
              <SearchSelectProps
                value={form.Role}
                onChange={(val) => setForm(f => ({ ...f, Role: val }))}
                options={PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS}
                placeholder="Chọn vai trò..."
              />
            </div>
          </div>

          {/* File minh chứng */}
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

          {/* URL chi tiết (tuỳ chọn) */}
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