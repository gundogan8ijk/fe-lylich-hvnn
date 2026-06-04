'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Label } from '@/_components/ui/label'
import { FileText, Loader2, UploadCloud } from 'lucide-react'
import { Input } from '@/_components/ui/input'
import { SearchSelectProps } from '@/_components/custom/selection-Props'
import { notify } from '@/_components/utils/Notify'
import { uploadToPdfCloudinary } from '@/_Common/_services/pdf-config'
import { ArticleContributorRole_OPTIONS } from '@/_constants/article-constant'
import { RegisterArticleForm } from '@/Article-Lecturer-List/Article-Lecturer-ser'



type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    onSubmit: (data: RegisterArticleForm) => Promise<boolean>
}

const defaultForm: RegisterArticleForm = {
    Title: '',
    Describe: '', 
    PublishedAt: '',
    ProofUrl: '',
    ArticleRole: '',
    JournalName: '',
    DOI: '',
    DetailUrl: ''
}

export default function RegisterArticleDialog({ open, onOpenChange, onSubmit }: Props) {
    const [form, setForm] = useState<RegisterArticleForm>(defaultForm)
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const resetForm = () => {
        setForm(defaultForm)
        setPdfFile(null)
    }

    const handleSubmit = async () => {
        if (!pdfFile) {
            notify.error('Vui lòng chọn file minh chứng PDF')
            return
        }

        setSubmitting(true)
        try {
            const secureUrl = await uploadToPdfCloudinary(pdfFile)

            const finalFormData: RegisterArticleForm = {
                ...form,
                ProofUrl: secureUrl
            }

            const res = await onSubmit(finalFormData)
            if (res) {
                resetForm()
                onOpenChange(false)
            }
        } catch (error) {
            console.error('Lỗi trong quá trình đăng ký bài báo:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleCancel = () => {
        resetForm()
        onOpenChange(false)
    }

    const set = (key: keyof RegisterArticleForm) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }))

    // Nếu "Describe" bắt buộc, bạn có thể thêm form.Describe vào đây
    const canSubmit = form.Title && form.PublishedAt && form.ArticleRole && pdfFile

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <FileText className="h-4 w-4" /> Đăng ký bài báo khoa học
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="space-y-4 py-1">
                    {/* Tiêu đề */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Tiêu đề bài báo <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="Nhập tiêu đề bài báo..." value={form.Title} onChange={set('Title')} disabled={submitting} />
                    </div>

                    {/* 🔥 BỔ SUNG: Ô nhập Mô tả bài báo */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Mô tả bài báo</Label>
                        <Input placeholder="Nhập mô tả tóm tắt về bài báo..." value={form.Describe} onChange={set('Describe')} disabled={submitting} />
                    </div>

                    {/* Ngày xuất bản & Vai trò */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs">
                                Ngày xuất bản <span className="text-red-500">*</span>
                            </Label>
                            <Input type="date" value={form.PublishedAt} onChange={set('PublishedAt')} disabled={submitting} />
                        </div>
                        
                        <div className="space-y-1.5 flex flex-col justify-end">
                            <Label className="text-xs mb-1">
                                Vai trò <span className="text-red-500">*</span>
                            </Label>
                            <SearchSelectProps
                                value={form.ArticleRole}
                                onChange={(val) => setForm(f => ({ ...f, ArticleRole: val }))}
                                options={ArticleContributorRole_OPTIONS}
                                placeholder="Chọn vai trò..."
                            />
                        </div>
                    </div>

                    {/* Tên tạp chí */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Tên tạp chí / Hội nghị</Label>
                        <Input placeholder="Nhập tên tạp chí danh tiếng, hội nghị..." value={form.JournalName} onChange={set('JournalName')} disabled={submitting} />
                    </div>

                    {/* DOI */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Mã định danh (DOI)</Label>
                        <Input placeholder="Ví dụ: 10.1145/3613904..." value={form.DOI} onChange={set('DOI')} disabled={submitting} />
                    </div>

                    {/* File đính kèm */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            File tài liệu minh chứng (PDF) <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative flex items-center">
                            <Input 
                                type="file" 
                                accept="application/pdf" 
                                disabled={submitting}
                                className="cursor-pointer pr-10 text-sm"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) setPdfFile(file)
                                }} 
                            />
                            <UploadCloud className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>

                    {/* URL chi tiết */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">Link chi tiết bài báo (URL nếu có)</Label>
                        <Input placeholder="https://sciencedirect.com/article-path..." value={form.DetailUrl} onChange={set('DetailUrl')} disabled={submitting} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" size="sm" onClick={handleCancel} disabled={submitting}>
                        Hủy
                    </Button>
                    <Button size="sm" disabled={!canSubmit || submitting} onClick={handleSubmit}>
                        {submitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                        {submitting ? 'Đang xử lý...' : 'Đăng ký'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}