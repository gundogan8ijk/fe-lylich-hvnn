'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
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
import { changeOfficeLocationAction, clearOfficeLocationAction } from '@/working-manager/department/infor/department-manger-hook'

interface Props {
    departmentId: string
    initialLocation?: string
    onUpdated: () => void
}

export default function EditDepartmentLocationDialog({ departmentId, initialLocation, onUpdated }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState(initialLocation || '')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!location.trim()) return

        setLoading(true)
        const success = await changeOfficeLocationAction(departmentId, { officeLocation: location.trim() })
        if (success) {
            setOpen(false)
            onUpdated()
        }
        setLoading(false)
    }

    const handleClear = async () => {
        if (!initialLocation) return
        setLoading(true)
        const success = await clearOfficeLocationAction(departmentId)
        if (success) {
            setOpen(false)
            onUpdated()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) setLocation(initialLocation || '')
        }}>
            <DialogTrigger asChild>
                <button className="text-gray-400 hover:text-blue-600 transition-colors p-1 ml-2 inline-flex items-center" title="Đổi địa chỉ">
                    <Pencil size={18} />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật văn phòng</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Địa chỉ văn phòng</Label>
                        <Input
                            id="location"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <DialogFooter className="flex sm:justify-between flex-row-reverse sm:flex-row">
                        <div className="flex gap-2 justify-end w-full">
                            {initialLocation && (
                                <Button type="button" variant="destructive" onClick={handleClear} disabled={loading} className="mr-auto">
                                    <Trash2 size={16} className="mr-2" /> Xóa
                                </Button>
                            )}
                            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                                Hủy
                            </Button>
                            <Button type="submit" disabled={loading || !location.trim() || location === initialLocation}>
                                {loading ? "Đang lưu..." : "Lưu"}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
