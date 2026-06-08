'use client'

import { useState } from 'react'
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogFooter, DialogDescription
} from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { CalendarClock, Loader2 } from 'lucide-react'
import { MODAL_Manger_detail_PROJECT_KEYS } from '@/_constants/project-constant'
import { storeProjectManagerDetail } from '@/working-manager/ProjectManger/store-detail-project-manger'
import { updateTimeEndProjectMangerAction } from '@/working-manager/ProjectManger/hook-projects-manger'

export default function UpdateTimeEndDialog() {
    const data = storeProjectManagerDetail((s) => s.data)
    const isUpdating = storeProjectManagerDetail((s) => s.isUpdating)
    const { isModalOpen, closeModal } = storeProjectManagerDetail()

    const open = isModalOpen(MODAL_Manger_detail_PROJECT_KEYS.EDIT_END_DATE)
    const handleClose = () => closeModal(MODAL_Manger_detail_PROJECT_KEYS.EDIT_END_DATE)

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-sm" onOpenAutoFocus={(e) => e.preventDefault()}>
                <UpdateTimeEndForm
                    key={open ? 'open' : 'closed'}
                    currentEndDate={data?.baseInfo.timeRange?.end ?? ''}
                    minDate={data?.baseInfo.timeRange?.start ?? undefined}
                    isUpdating={isUpdating}
                    onClose={handleClose}
                />
            </DialogContent>
        </Dialog>
    )
}

function UpdateTimeEndForm({ currentEndDate, minDate, isUpdating, onClose }: {
    currentEndDate: string
    minDate?: string
    isUpdating: boolean
    onClose: () => void
}) {
    const [timeEnd, setTimeEnd] = useState(currentEndDate)

    const hasChanged = timeEnd !== currentEndDate
    const isValid = !!timeEnd && (!minDate || timeEnd > minDate)
    const canSubmit = hasChanged && isValid && !isUpdating

    const handleSubmit = async () => {
        await updateTimeEndProjectMangerAction(timeEnd)
        onClose()
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base">
                    <CalendarClock className="h-4 w-4" />
                    Cập nhật ngày kết thúc
                </DialogTitle>
                <DialogDescription />
            </DialogHeader>

            <div className="py-2 space-y-1.5">
                <Label className="text-xs">
                    Ngày kết thúc <span className="text-red-500">*</span>
                </Label>
                <Input
                    type="date"
                    className="text-sm"
                    value={timeEnd}
                    min={minDate || undefined}
                    onChange={(e) => setTimeEnd(e.target.value)}
                />
                {minDate && timeEnd && timeEnd <= minDate && (
                    <p className="text-xs text-red-500">
                        Ngày kết thúc phải sau ngày bắt đầu ({minDate}).
                    </p>
                )}
            </div>

            <DialogFooter>
                <Button variant="outline" size="sm" onClick={onClose} disabled={isUpdating}>
                    Hủy
                </Button>
                <Button size="sm" disabled={!canSubmit} onClick={handleSubmit}>
                    {isUpdating && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                    Lưu thay đổi
                </Button>
            </DialogFooter>
        </>
    )
}