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
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { renameCodeDepartmentAction } from '@/working-manager/department/infor/department-manger-hook'

interface Props {
    departmentId: string
    initialCode: string
    onUpdated: () => void
}

export default function EditDepartmentCodeDialog({ departmentId, initialCode, onUpdated }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState(initialCode)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!code.trim() || code === initialCode) return

        setLoading(true)
        const success = await renameCodeDepartmentAction(departmentId, { newCode: code.trim() })
        if (success) {
            setOpen(false)
            onUpdated()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) setCode(initialCode)
        }}>
            <DialogTrigger asChild>
                <button className="text-gray-400 hover:text-blue-600 transition-colors p-1" title="Đổi mã khoa">
                    <Pencil className="w-3.5 h-3.5" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Đổi mã khoa</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="code">Mã khoa mới</Label>
                        <Input
                            id="code"
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading || !code.trim() || code === initialCode}>
                            {loading ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
