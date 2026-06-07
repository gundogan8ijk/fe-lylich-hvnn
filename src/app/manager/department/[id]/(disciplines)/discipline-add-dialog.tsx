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
import { Textarea } from '@/_components/ui/textarea'
import { addDisciplineAction } from '@/disciplines-manager/disciplines-manager-hook'

export default function DisciplineAddDialog({ departmentId, onSuccess }: { departmentId: string, onSuccess?: () => void }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        describe: '',
        foundedAt: '',
        totalCredits: 0
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        const res = await addDisciplineAction(departmentId, formData)
        
        if (res.code === 1) {
            setOpen(false)
            setFormData({
                code: '',
                name: '',
                describe: '',
                foundedAt: '',
                totalCredits: 0
            })
            if (onSuccess) onSuccess()
        }
        setLoading(false)
    }

    const isSaveDisabled = 
        loading || 
        formData.code.trim().length < 2 || formData.code.trim().length > 8 ||
        formData.name.trim().length < 2 || formData.name.trim().length > 400 ||
        formData.describe.trim().length < 2 || formData.describe.trim().length > 500 ||
        !formData.foundedAt.trim() || 
        formData.totalCredits < 100 || formData.totalCredits > 150

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5 h-8 px-3 text-xs">
                    <Plus className="w-3.5 h-3.5" />
                    Thêm chuyên ngành
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Thêm chuyên ngành mới</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4 max-h-[65vh] overflow-y-auto px-1">
                    <div className="grid gap-2">
                        <Label htmlFor="code">Mã chuyên ngành (*)</Label>
                        <Input
                            id="code"
                            required
                            minLength={2}
                            maxLength={8}
                            placeholder="Độ dài 2-8 ký tự"
                            value={formData.code}
                            onChange={(e) => setFormData(p => ({ ...p, code: e.target.value }))}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Tên chuyên ngành (*)</Label>
                        <Input
                            id="name"
                            required
                            minLength={2}
                            maxLength={400}
                            placeholder="Độ dài 2-400 ký tự"
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="foundedAt">Ngày thành lập (*)</Label>
                        <Input
                            id="foundedAt"
                            type="date"
                            required
                            value={formData.foundedAt}
                            onChange={(e) => setFormData(p => ({ ...p, foundedAt: e.target.value }))}
                            className="custom-calendar-icon"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="totalCredits">Tổng số tín chỉ (*)</Label>
                        <Input
                            id="totalCredits"
                            type="number"
                            min="100"
                            max="150"
                            required
                            placeholder="Từ 100 đến 150"
                            value={formData.totalCredits || ''}
                            onChange={(e) => setFormData(p => ({ ...p, totalCredits: Number(e.target.value) }))}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="describe">Mô tả (*)</Label>
                        <Textarea
                            id="describe"
                            required
                            minLength={2}
                            maxLength={500}
                            placeholder="Độ dài 2-500 ký tự"
                            value={formData.describe}
                            onChange={(e) => setFormData(p => ({ ...p, describe: e.target.value }))}
                        />
                    </div>
                    <Button type="submit" disabled={isSaveDisabled} className="mt-4">
                        {loading ? "Đang xử lý..." : "Lưu thông tin"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
