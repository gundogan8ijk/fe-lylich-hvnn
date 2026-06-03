'use client'

import { useMemo, useState } from 'react'
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogFooter, DialogDescription
} from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Textarea } from '@/_components/ui/textarea'
import { Label } from '@/_components/ui/label'
import { Input } from '@/_components/ui/input'
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from '@/_components/ui/select'
import { FlaskConical, Loader2 } from 'lucide-react'
import { level_PROJECT_OPTIONS, MODAL_Manger_detail_PROJECT_KEYS } from '@/_constants/project-constant'
import { storeProjectManagerDetail } from '@/ProjectManger/store-detail-project-manger'
import { ProjectManagerDetailRecord } from '@/ProjectManger/type-detail-projects-manger'
import { UpdateBaseInfoProjectMangerForm } from '@/ProjectManger/ser-projects-manger'
import { updateBaseInfoProjectMangerAction } from '@/ProjectManger/hook-projects-manger'


// ── wrapper ───────────────────────────────────────────────────────────────────

export default function UpdateBaseProjectDialog() {
    const data = storeProjectManagerDetail((s) => s.data)
    const isUpdating = storeProjectManagerDetail((s) => s.isUpdating)
    const { isModalOpen, closeModal } = storeProjectManagerDetail()

    const open = isModalOpen(MODAL_Manger_detail_PROJECT_KEYS.UPDATE_BASE)
    const handleClose = () => closeModal(MODAL_Manger_detail_PROJECT_KEYS.UPDATE_BASE)

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg max-h-[90vh] flex flex-col" 
            onOpenAutoFocus={(e) => e.preventDefault()}>
                <UpdateBaseProjectForm
                    key={open ? 'open' : 'closed'}
                    data={data}
                    isUpdating={isUpdating}
                    onClose={handleClose}
                />
            </DialogContent>
        </Dialog>
    )
}

// ── form ──────────────────────────────────────────────────────────────────────

function UpdateBaseProjectForm({ data, isUpdating, onClose }: {
    data: ProjectManagerDetailRecord | null
    isUpdating: boolean
    onClose: () => void
}) {
    const [form, setForm] = useState<UpdateBaseInfoProjectMangerForm>({
        Title: data?.baseInfo.title ?? '',
        Describe: data?.baseInfo.describe ?? '',
        Level: data?.level ?? '',
        StartDate: data?.baseInfo.timeRange?.start ?? '',
        EndDate: data?.baseInfo.timeRange?.end ?? '',
    })

    const initialForm = useMemo<UpdateBaseInfoProjectMangerForm>(

        () => ({

            Title: data?.baseInfo.title ?? '',

            Describe: data?.baseInfo.describe ?? '',

            Level: data?.level ?? '',

            StartDate: data?.baseInfo.timeRange?.start ?? '',

            EndDate: data?.baseInfo.timeRange?.end ?? '',

        }),

        [] // chỉ tính 1 lần khi form mount

    )


    const hasChanged = (
        form.Title !== initialForm.Title ||
        form.Describe !== initialForm.Describe ||
        form.Level !== initialForm.Level ||
        form.StartDate !== initialForm.StartDate ||
        form.EndDate !== initialForm.EndDate
    )

    const handleSubmit = async () => {
        await updateBaseInfoProjectMangerAction(form)
        onClose()
    }

    const setField = (key: keyof UpdateBaseInfoProjectMangerForm) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }))

    const canSubmit =
        form.Title.trim() &&
        form.Describe.trim() &&
        form.Level &&
        form.StartDate &&
        form.EndDate &&
        form.EndDate >= form.StartDate && hasChanged

    return (
        <>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base">
                    <FlaskConical className="h-4 w-4" />
                    Cập nhật đề tài
                </DialogTitle>
                <DialogDescription />
            </DialogHeader>

            <div className="space-y-4 py-1 overflow-y-auto">
                <div className="space-y-1.5">
                    <Label className="text-xs">Tên đề tài <span className="text-red-500">*</span></Label>
                    <Input placeholder="Nhập tên đề tài..." value={form.Title} onChange={setField('Title')} />
                </div>

                <div className="space-y-1.5">
                    <Label className="text-xs">Mô tả <span className="text-red-500">*</span></Label>
                    <Textarea rows={2} placeholder="Mô tả chi tiết..." value={form.Describe} onChange={setField('Describe')} />
                </div>

                <div className="space-y-1.5">
                    <Label className="text-xs">Cấp độ <span className="text-red-500">*</span></Label>
                    <Select value={form.Level} onValueChange={v => setForm(f => ({ ...f, Level: v }))}>
                        <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Chọn cấp độ..." />
                        </SelectTrigger>
                        <SelectContent>
                            {level_PROJECT_OPTIONS.map(l => (
                                <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <Label className="text-xs">Ngày bắt đầu <span className="text-red-500">*</span></Label>
                        <Input type="date" className="text-sm" value={form.StartDate} onChange={setField('StartDate')} />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs">Ngày kết thúc <span className="text-red-500">*</span></Label>
                        <Input type="date" className="text-sm" value={form.EndDate} min={form.StartDate || undefined} onChange={setField('EndDate')} />
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" size="sm" onClick={onClose} disabled={isUpdating}>Hủy</Button>
                <Button size="sm" disabled={!canSubmit || isUpdating} onClick={handleSubmit}>
                    {isUpdating && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                    Lưu thay đổi
                </Button>
            </DialogFooter>
        </>
    )
}