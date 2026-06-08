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
import { updateTotalCreditsDisciplineAction } from '@/working-manager/department/discipline/discipline-manger-hook'

interface Props {
    departmentId: string
    id: string
    initialCredits: number
    onUpdated: () => void
}

export default function EditDisciplineCreditsDialog({ departmentId, id, initialCredits, onUpdated }: Props) {
    const [open, setOpen] = useState(false)
    const [credits, setCredits] = useState(initialCredits.toString())
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const val = parseInt(credits);
        if (isNaN(val) || val < 0) return

        setLoading(true)
        const success = await updateTotalCreditsDisciplineAction(departmentId, id, { newTotalCredits: val })
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật số tín chỉ</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="credits">Số tín chỉ</Label>
                        <Input
                            id="credits"
                            type="number"
                            min="0"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                            placeholder="Nhập số tín chỉ"
                            required
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
