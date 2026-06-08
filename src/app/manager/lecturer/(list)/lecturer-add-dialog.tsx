'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/_components/ui/dialog'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { createLecturerAction } from '@/working-manager/lecturer/lecturer-manger-hook'
import { storeLecturerListManger } from '@/working-manager/lecturer/lecturer-manger-store'

export default function LecturerAddDialog() {
    const open = storeLecturerListManger((s) => s.isAddDialogOpen)
    const setOpen = storeLecturerListManger((s) => s.setAddDialogOpen)
    
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        gender: 1,
        birthday: '',
        citizenIdentificationCard: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        const success = await createLecturerAction(formData)
        
        if (success) {
            setOpen(false)
            setFormData({
                lastName: '',
                firstName: '',
                gender: 1,
                birthday: '',
                citizenIdentificationCard: ''
            })
        }
        setLoading(false)
    }

    const isSaveDisabled = loading || !formData.lastName.trim() || !formData.firstName.trim() || !formData.birthday.trim() || !formData.citizenIdentificationCard.trim()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Thêm giảng viên
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Thêm giảng viên mới</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4 max-h-[65vh] overflow-y-auto px-1">
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Họ (*)</Label>
                        <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">Tên (*)</Label>
                        <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Giới tính (*)</Label>
                        <select 
                            id="gender" 
                            value={formData.gender} 
                            onChange={(e) => setFormData(p => ({ ...p, gender: parseInt(e.target.value) }))}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value={1}>Nam</option>
                            <option value={2}>Nữ</option>
                            <option value={3}>Khác</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="birthday">Ngày sinh (*)</Label>
                        <Input
                            id="birthday"
                            type="date"
                            required
                            value={formData.birthday}
                            onChange={(e) => setFormData(p => ({ ...p, birthday: e.target.value }))}
                            className="custom-calendar-icon"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cccd">CCCD (*)</Label>
                        <Input
                            id="cccd"
                            required
                            value={formData.citizenIdentificationCard}
                            onChange={(e) => setFormData(p => ({ ...p, citizenIdentificationCard: e.target.value }))}
                            maxLength={12}
                        />
                    </div>
                    <Button type="submit" disabled={isSaveDisabled} className="mt-4">
                        {loading ? "Đang xử lý..." : "Thêm giảng viên"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
