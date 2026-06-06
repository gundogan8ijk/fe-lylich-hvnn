'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Label } from '@/_components/ui/label'
import { Input } from '@/_components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select'
import { Loader2, Search, X, UserCheck } from 'lucide-react'
import { getListLecturersNameApi } from '@/profile-Lecturer/Lecturer-Profile-ser'
import { LecturersNameItems } from '@/profile-Lecturer/Profile-lecurer-type'
import { addContributorByManagerAction } from '@/ProjectManger/hook-projects-manger'

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    projectId: string
}

export default function AddContributorDialog({ open, onOpenChange, projectId }: Props) {
    const [selectedLecturer, setSelectedLecturer] = useState<LecturersNameItems | null>(null)
    const [lecturerQuery, setLecturerQuery] = useState('')
    const [lecturerResults, setLecturerResults] = useState<LecturersNameItems[]>([])
    const [lecturerLoading, setLecturerLoading] = useState(false)
    const [ddOpen, setDdOpen] = useState(false)
    const [status, setStatus] = useState<'Leader' | 'CoreTeam'>('CoreTeam')
    const [joinedAt, setJoinedAt] = useState('')
    const [saving, setSaving] = useState(false)

    const wrapRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const searchIdRef = useRef(0)

    useEffect(() => {
        if (open) {
            setSelectedLecturer(null)
            setLecturerQuery('')
            setLecturerResults([])
            setStatus('CoreTeam')
            setJoinedAt(new Date().toISOString().split('T')[0]) // Default today
        }
    }, [open])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setDdOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [])

    const searchLecturers = async (q: string) => {
        setLecturerLoading(true)
        const id = ++searchIdRef.current
        try {
            const res = await getListLecturersNameApi(q)
            if (id === searchIdRef.current && res.code === 1 && res.data) {
                setLecturerResults(res.data)
            }
        } finally {
            if (id === searchIdRef.current) setLecturerLoading(false)
        }
    }

    const handleInput = (q: string) => {
        setLecturerQuery(q)
        setDdOpen(true)
        if (selectedLecturer) setSelectedLecturer(null)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => searchLecturers(q), 400)
    }

    const handleSave = async () => {
        if (!selectedLecturer || !joinedAt) return
        setSaving(true)
        try {
            const ok = await addContributorByManagerAction({
                LecturerId: selectedLecturer.id,
                Status: status,
                JoinedAt: joinedAt
            })
            if (ok) {
                onOpenChange(false)
            }
        } finally {
            setSaving(false)
        }
    }

    const clearSelection = () => {
        setSelectedLecturer(null)
        setLecturerQuery('')
        setLecturerResults([])
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white text-slate-900 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                        <UserCheck className="w-5 h-5 text-indigo-600" />
                        Thêm thành viên giảng viên
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Tìm giảng viên trong hệ thống và phân vai trò trong ban nghiên cứu đề tài.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    {/* Search Lecturer */}
                    <div className="space-y-1.5 relative" ref={wrapRef}>
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Tìm kiếm Giảng viên <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            {!selectedLecturer ? (
                                <>
                                    <div className="flex min-h-10 items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-colors bg-slate-50 dark:bg-slate-950 dark:border-slate-800">
                                        <Search className="h-4 w-4 shrink-0 text-slate-400" />
                                        <input
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                                            placeholder="Nhập mã hoặc tên giảng viên..."
                                            value={lecturerQuery}
                                            onChange={(e) => handleInput(e.target.value)}
                                            onFocus={() => { setDdOpen(true); searchLecturers(lecturerQuery); }}
                                        />
                                    </div>
                                    {ddOpen && (
                                        <div className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-slate-200 bg-white text-slate-900 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                                            {lecturerLoading ? (
                                                <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-slate-500">
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang tìm kiếm...
                                                </div>
                                            ) : lecturerResults.length === 0 ? (
                                                <p className="px-3 py-2.5 text-xs text-slate-500">Không tìm thấy kết quả</p>
                                            ) : (
                                                lecturerResults.map((l) => (
                                                    <button
                                                        key={l.id}
                                                        type="button"
                                                        onClick={() => { setSelectedLecturer(l); setLecturerQuery(l.name); setDdOpen(false); }}
                                                        className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                                                    >
                                                        <span className="font-mono text-xs text-slate-400 shrink-0">{l.code}</span>
                                                        <span className="text-slate-300 dark:text-slate-700">·</span>
                                                        <span className="truncate">{l.name}</span>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex min-h-10 items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 dark:bg-slate-900/50 dark:border-slate-800">
                                    <div className="flex items-baseline gap-2 overflow-hidden text-sm">
                                        <Search className="h-4 w-4 shrink-0 text-slate-400 self-center" />
                                        <span className="font-mono text-xs text-slate-400 shrink-0">{selectedLecturer.code}</span>
                                        <span className="text-slate-300 dark:text-slate-700 shrink-0">·</span>
                                        <span className="font-medium truncate text-slate-800 dark:text-slate-200">{selectedLecturer.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearSelection}
                                        className="rounded p-0.5 text-slate-400 hover:bg-slate-200 hover:text-red-500 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Select Status/Role */}
                    <div className="space-y-1">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Vai trò trong ban nghiên cứu <span className="text-red-500">*</span>
                        </Label>
                        <Select value={status} onValueChange={(val: any) => setStatus(val)}>
                            <SelectTrigger className="bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-sm">
                                <SelectValue placeholder="Chọn vai trò" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                                <SelectItem value="CoreTeam" className="cursor-pointer">Thành viên tham gia (Core Team)</SelectItem>
                                <SelectItem value="Leader" className="cursor-pointer">Chủ nhiệm đề tài (Leader)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Joined At */}
                    <div className="space-y-1">
                        <Label htmlFor="joinedAt" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Ngày bắt đầu tham gia <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="joinedAt"
                            type="date"
                            value={joinedAt}
                            onChange={(e) => setJoinedAt(e.target.value)}
                            className="bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-sm"
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={saving}
                        className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700 dark:hover:bg-slate-700 cursor-pointer"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving || !selectedLecturer || !joinedAt}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                    >
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Thêm thành viên
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
