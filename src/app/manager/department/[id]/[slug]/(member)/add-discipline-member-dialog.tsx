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
import { addMemberDepartmentAction } from '@/department-Manager/department-manger-hook'
import { getListNoDepartmentLecturersNameApi } from '@/_Common/_services/getListNameSer'
import { LecturersNameItems } from '@/profile-Lecturer/Profile-lecurer-type'
import { AcademicPositions } from '../../(member)/edit-member-position-dialog'

interface Props {
    departmentId: string
    disciplineId: string
    onAdded: () => void
}

export default function AddDisciplineMemberDialog({ departmentId, disciplineId, onAdded }: Props) {
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

    const [position, setPosition] = useState<string>('Lecturer')
    const [joinedAt, setJoinedAt] = useState<string>('')

    useEffect(() => {
        if (!open) return;
        const fetchLecturers = async () => {
            const res = await getListNoDepartmentLecturersNameApi(debouncedSearch);
            if (res.code === 1 && res.data) {
                setLecturers(res.data);
            } else {
                setLecturers([]);
            }
        }
        fetchLecturers();
    }, [debouncedSearch, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedLecturerId || !position || !joinedAt) return

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
                    <DialogTitle>Thêm thành viên vào chuyên ngành</DialogTitle>
                    <DialogDescription className="hidden">Tìm kiếm và chọn giảng viên để thêm vào chuyên ngành</DialogDescription>
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
                        <Button type="submit" disabled={loading || !selectedLecturerId || !joinedAt}>
                            {loading ? "Đang thêm..." : "Thêm thành viên"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
