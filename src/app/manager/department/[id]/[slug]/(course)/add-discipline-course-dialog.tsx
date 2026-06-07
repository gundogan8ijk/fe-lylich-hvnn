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
    DialogFooter
} from '@/_components/ui/dialog'
import { Label } from '@/_components/ui/label'
import { Input } from '@/_components/ui/input'
import { addCourseDisciplineAction } from '@/discipline-Manager/discipline-manger-hook'
import { Textarea } from '@/_components/ui/textarea'

interface Props {
    disciplineId: string
    onAdded: () => void
}

export default function AddDisciplineCourseDialog({ disciplineId, onAdded }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [describe, setDescribe] = useState('')
    const [theory, setTheory] = useState<number>(1)
    const [practice, setPractice] = useState<number>(0)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !describe) return

        setLoading(true)
        const success = await addCourseDisciplineAction(disciplineId, {
            name,
            describe,
            theory,
            practice
        })
        
        if (success) {
            setOpen(false)
            setName('')
            setDescribe('')
            setTheory(1)
            setPractice(0)
            onAdded()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                    <Plus size={16} /> Thêm môn học
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Thêm môn học mới</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên môn học</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên môn học"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="describe">Mô tả</Label>
                        <Textarea
                            id="describe"
                            value={describe}
                            onChange={(e) => setDescribe(e.target.value)}
                            placeholder="Nhập mô tả môn học"
                            required
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="theory">Số tín chỉ lý thuyết</Label>
                            <Input
                                id="theory"
                                type="number"
                                min={0}
                                value={theory}
                                onChange={(e) => setTheory(parseInt(e.target.value) || 0)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="practice">Số tín chỉ thực hành</Label>
                            <Input
                                id="practice"
                                type="number"
                                min={0}
                                value={practice}
                                onChange={(e) => setPractice(parseInt(e.target.value) || 0)}
                                required
                            />
                        </div>
                    </div>
                    {(theory + practice) < 1 || (theory + practice) > 20 ? (
                         <p className="text-sm text-red-500">Tổng số tín chỉ phải từ 1 đến 20</p>
                    ) : null}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading || !name || !describe || (theory + practice) < 1 || (theory + practice) > 20}>
                            {loading ? "Đang thêm..." : "Thêm môn học"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
