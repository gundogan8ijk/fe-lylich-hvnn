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
import { updateDescribeDisciplineAction } from '@/working-manager/department/discipline/discipline-manger-hook'

interface Props {
    departmentId: string
    id: string
    initialDescribe: string
    onUpdated: () => void
}

export default function EditDisciplineDescribeDialog({ departmentId, id, initialDescribe, onUpdated }: Props) {
    const [open, setOpen] = useState(false)
    const [describe, setDescribe] = useState(initialDescribe)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        const success = await updateDescribeDisciplineAction(departmentId, id, { newDescribe: describe.trim() })
        if (success) {
            setOpen(false)
            onUpdated()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-primary">
                    <Pencil className="h-2.5 w-2.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật mô tả chuyên ngành</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="describe">Mô tả</Label>
                        <Textarea
                            id="describe"
                            value={describe}
                            onChange={(e) => setDescribe(e.target.value)}
                            placeholder="Nhập mô tả chuyên ngành"
                            rows={5}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
