'use client'

import { useState, useEffect } from 'react'
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
import { Label } from '@/_components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select'
import { Input } from '@/_components/ui/input'
import { updateMemberPositionDepartmentAction, getListDisciplineByDepartmentIdPublicAction } from '@/working-manager/department/infor/department-manger-hook'
import { DisciplineOfDepartmentPublicItems } from '@/working-manager/department/infor/department-manger-type'
import { toSearchParams } from '@/_lib/query-options-toUrl-helper'

export const AcademicPositions = [
    { name: 'Dean', displayName: 'Trưởng khoa' },
    { name: 'ViceDean', displayName: 'Phó khoa' },
    { name: 'HeadOfDepartment', displayName: 'Trưởng bộ môn' },
    { name: 'DeputyHeadOfDepartment', displayName: 'Phó trưởng bộ môn' },
    { name: 'Lecturer', displayName: 'Giảng viên' },
]

interface Props {
    departmentId: string
    lecturerId: string
    initialPosition: string
    onUpdated: () => void
}

export default function EditMemberPositionDialog({ departmentId, lecturerId, initialPosition, onUpdated }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [position, setPosition] = useState(initialPosition)
    const [disciplineId, setDisciplineId] = useState<string>('')
    const [joinedAt, setJoinedAt] = useState<string>('')
    const [disciplines, setDisciplines] = useState<DisciplineOfDepartmentPublicItems[]>([])

    useEffect(() => {
        if (open && disciplines.length === 0) {
            const fetchDisciplines = async () => {
                const res = await getListDisciplineByDepartmentIdPublicAction(departmentId, toSearchParams({ search: '', sort: null, page: 1, perPage: 100 }));
                if (res) {
                    setDisciplines(res.items);
                }
            }
            fetchDisciplines();
        }
    }, [open, departmentId, disciplines.length])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!position.trim()) return

        setLoading(true)
        const success = await updateMemberPositionDepartmentAction(departmentId, lecturerId, {
            newPosition: position,
            disciplineId: disciplineId || undefined,
            joinedAt: joinedAt || undefined
        })
        if (success) {
            setOpen(false)
            onUpdated()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Cập nhật chức vụ">
                    <Pencil className="h-3.5 w-3.5 text-blue-600" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật chức vụ thành viên</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="position">Chức vụ</Label>
                        <Select value={position} onValueChange={setPosition} required>
                            <SelectTrigger id="position">
                                <SelectValue placeholder="Chọn chức vụ" />
                            </SelectTrigger>
                            <SelectContent>
                                {AcademicPositions.map((pos) => (
                                    <SelectItem key={pos.name} value={pos.name}>
                                        {pos.displayName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="discipline">Chuyển chuyên ngành (Tùy chọn)</Label>
                        <Select value={disciplineId} onValueChange={setDisciplineId}>
                            <SelectTrigger id="discipline">
                                <SelectValue placeholder="Giữ nguyên chuyên ngành hiện tại" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Giữ nguyên chuyên ngành hiện tại</SelectItem>
                                {disciplines.map((d) => (
                                    <SelectItem key={d.id} value={d.id}>
                                        {d.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="joinedAt">Ngày tham gia mới (Tùy chọn)</Label>
                        <Input
                            id="joinedAt"
                            type="date"
                            value={joinedAt}
                            onChange={(e) => setJoinedAt(e.target.value)}
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
