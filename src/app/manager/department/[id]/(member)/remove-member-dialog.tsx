'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from '@/_components/ui/dialog'
import { removeMemberDepartmentAction } from '@/working-manager/department/infor/department-manger-hook'

interface Props {
    departmentId: string
    lecturerId: string
    lecturerName: string
    onRemoved: () => void
}

export default function RemoveMemberDialog({ departmentId, lecturerId, lecturerName, onRemoved }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRemove = async () => {
        setLoading(true)
        const success = await removeMemberDepartmentAction(departmentId, lecturerId)
        if (success) {
            setOpen(false)
            onRemoved()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" 
                    title="Gỡ thành viên"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Xác nhận gỡ thành viên</DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn gỡ giảng viên <strong>{lecturerName}</strong> khỏi khoa? Hành động này không thể hoàn tác.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Hủy
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleRemove} disabled={loading}>
                        {loading ? "Đang gỡ..." : "Xóa"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
