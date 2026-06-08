'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/_components/ui/dialog'
import { Textarea } from '@/_components/ui/textarea'
import { Label } from '@/_components/ui/label'
import { updateDescribeDepartmentAction } from '@/working-manager/department/infor/department-manger-hook'

interface Props {
    departmentId: string
    initialDescribe: string
    onUpdated: () => void
}

export default function EditDepartmentDescribeDialog({ departmentId, initialDescribe, onUpdated }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [describe, setDescribe] = useState(initialDescribe)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!describe.trim() || describe === initialDescribe) return

        setLoading(true)
        const success = await updateDescribeDepartmentAction(departmentId, { newDescribe: describe.trim() })
        if (success) {
            setOpen(false)
            onUpdated()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) setDescribe(initialDescribe)
        }}>
            <DialogTrigger asChild>
                <button className="text-gray-400 hover:text-blue-600 transition-colors p-1 ml-2 inline-flex items-center" title="Sửa mô tả">
                    <Pencil className="w-3.5 h-3.5" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật mô tả</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="describe">Mô tả khoa</Label>
                        <Textarea
                            id="describe"
                            required
                            value={describe}
                            onChange={(e) => setDescribe(e.target.value)}
                            rows={5}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading || !describe.trim() || describe === initialDescribe}>
                            {loading ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
