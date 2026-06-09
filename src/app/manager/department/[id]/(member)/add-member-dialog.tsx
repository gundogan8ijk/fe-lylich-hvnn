'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Check, X } from 'lucide-react'
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
import { Label } from '@/_components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select'
import { Input } from '@/_components/ui/input'
import { addMemberDepartmentAction, getListDisciplineByDepartmentIdPublicAction } from '@/working-manager/department/infor/department-manger-hook'
import { DisciplineOfDepartmentPublicItems } from '@/working-manager/department/infor/department-manger-type'
import { getListNoDepartmentLecturersNameApi } from '@/_Common/_services/getListNameSer'
import { LecturersNameItems } from '@/working-Lecturer/profile/infor/Profile-lecurer-type'
import { toSearchParams } from '@/_lib/query-options-toUrl-helper'
import { AcademicPositions } from './edit-member-position-dialog'

interface Props {
    departmentId: string
    onAdded: () => void
}

export default function AddMemberDialog({ departmentId, onAdded }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const [lecturerSearch, setLecturerSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(lecturerSearch)
        }, 300)
        return () => clearTimeout(timer)
    }, [lecturerSearch])
    const [lecturers, setLecturers] = useState<LecturersNameItems[]>([])
    const [selectedLecturerId, setSelectedLecturerId] = useState<string>('')

    const [disciplines, setDisciplines] = useState<DisciplineOfDepartmentPublicItems[]>([])
    const [disciplineId, setDisciplineId] = useState<string>('')
    const [position, setPosition] = useState<string>('Lecturer')
    const [joinedAt, setJoinedAt] = useState<string>('')

    useEffect(() => {
        if (open && disciplines.length === 0) {
            const fetchDisciplines = async () => {
                const res = await getListDisciplineByDepartmentIdPublicAction(departmentId, toSearchParams({ search: '', sort: null, page: 1, perPage: 100 }));
                if (res) setDisciplines(res.items);
            }
            fetchDisciplines();
        }
    }, [open, departmentId, disciplines.length])

    useEffect(() => {
        if (!open) return;
        const fetchLecturers = async () => {
            const res = await getListNoDepartmentLecturersNameApi(debouncedSearch);
            if (res.code === 1) {
                setLecturers(res.data || []);
            } else {
                setLecturers([]);
            }
        }
        fetchLecturers();
    }, [debouncedSearch, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedLecturerId || !disciplineId || !position || !joinedAt) return

        setLoading(true)
        const success = await addMemberDepartmentAction(departmentId, {
            lecturerId: selectedLecturerId,
            disciplineId: disciplineId,
            position: position,
            joinedAt: joinedAt
        })
        if (success) {
            setOpen(false)
            setLecturerSearch('')
            setSelectedLecturerId('')
            setDisciplineId('')
            setJoinedAt('')
            onAdded()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                    <Plus size={16} /> Thêm thành viên
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Thêm thành viên mới</DialogTitle>
                    <DialogDescription className="hidden">Tìm kiếm và chọn giảng viên để thêm vào khoa</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label>Giảng viên</Label>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Tìm kiếm tên hoặc mã..."
                                value={lecturerSearch}
                                onChange={(e) => {
                                    setLecturerSearch(e.target.value)
                                    setSelectedLecturerId('') // reset selection when typing
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                className="pl-8 pr-8"
                            />
                            {selectedLecturerId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedLecturerId('')
                                        setLecturerSearch('')
                                    }}
                                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-red-500"
                                >
                                    <X size={16} />
                                </button>
                            )}
                            {isFocused && lecturers.length > 0 && !selectedLecturerId && (
                                <div className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {lecturers.map(lect => (
                                        <div
                                            key={lect.id}
                                            className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm flex justify-between"
                                            onClick={() => {
                                                setSelectedLecturerId(lect.id)
                                                setLecturerSearch(`${lect.name} (${lect.code})`)
                                                setLecturers([])
                                                setIsFocused(false)
                                            }}
                                        >
                                            <span>{lect.name}</span>
                                            <span className="text-muted-foreground">{lect.code}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {selectedLecturerId && (
                            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                                <Check size={14} /> Đã chọn giảng viên
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="discipline">Chuyên ngành</Label>
                        <Select value={disciplineId} onValueChange={setDisciplineId} required>
                            <SelectTrigger id="discipline">
                                <SelectValue placeholder="Chọn chuyên ngành" />
                            </SelectTrigger>
                            <SelectContent>
                                {disciplines.map((d) => (
                                    <SelectItem key={d.id} value={d.id}>
                                        {d.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

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
                        <Label htmlFor="joinedAt">Ngày tham gia</Label>
                        <Input
                            id="joinedAt"
                            type="date"
                            required
                            value={joinedAt}
                            onChange={(e) => setJoinedAt(e.target.value)}
                            max={new Date().toISOString().split('T')[0]} // Cannot be in future
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading || !selectedLecturerId || !disciplineId || !joinedAt}>
                            {loading ? "Đang thêm..." : "Thêm thành viên"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
