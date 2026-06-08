'use client'

import { useState, useEffect, useRef } from 'react'
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogFooter, DialogDescription
} from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Textarea } from '@/_components/ui/textarea'
import { Label } from '@/_components/ui/label'
import { Input } from '@/_components/ui/input'
import { Badge } from '@/_components/ui/badge'
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from '@/_components/ui/select'
import { FlaskConical, X, Search, Loader2, UserSearch } from 'lucide-react'
import { getListDisciplinesNameApi } from '@/working-public/Discipline-Public/disciplines-Public-ser'
import { CreateProjectForm } from '@/working-manager/project-detail/project-detail-service'
import { getListLecturersNameApi } from '@/working-Lecturer/profile/infor/Lecturer-Profile-ser'
import { level_PROJECT_OPTIONS } from '@/_constants/project-constant'
import { DisciplinesNameItems, LecturersNameItems } from '@/_Common/_types/getListName-type'


type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    onSubmit: (data: CreateProjectForm) => Promise<boolean>
}

const MAX_DISCIPLINES = 4

const defaultForm: CreateProjectForm = {
    Title: '',
    Describe: '',
    Level: '',
    DisciplineIds: [],
    LeaderId: null,
    StartDate: '',
    EndDate: '',
}

// ── component ─────────────────────────────────────────────────────────────────

export default function CreateProjectDialog({ open, onOpenChange, onSubmit }: Props) {

    const [form, setForm] = useState<CreateProjectForm>(defaultForm)
    const [submitting, setSubmitting] = useState(false)

    // disciplines
    const [selectedDiscs, setSelectedDiscs] = useState<DisciplinesNameItems[]>([])
    const [discQuery, setDiscQuery] = useState('')
    const [discResults, setDiscResults] = useState<DisciplinesNameItems[]>([])
    const [discLoading, setDiscLoading] = useState(false)
    const [discDdOpen, setDiscDdOpen] = useState(false)
    const discWrapRef = useRef<HTMLDivElement>(null)
    const discDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // leader
    const [selectedLeader, setSelectedLeader] = useState<LecturersNameItems | null>(null)
    const [leaderQuery, setLeaderQuery] = useState('')
    const [leaderResults, setLeaderResults] = useState<LecturersNameItems[]>([])
    const [leaderLoading, setLeaderLoading] = useState(false)
    const [leaderDdOpen, setLeaderDdOpen] = useState(false)
    const leaderWrapRef = useRef<HTMLDivElement>(null)
    const leaderDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!discWrapRef.current?.contains(e.target as Node)) setDiscDdOpen(false)
            if (!leaderWrapRef.current?.contains(e.target as Node)) setLeaderDdOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const resetForm = () => {
        setForm(defaultForm)
        setSelectedDiscs([])
        setDiscQuery('')
        setDiscResults([])
        setSelectedLeader(null)
        setLeaderQuery('')
        setLeaderResults([])
    }

    // ── disciplines ────────────────────────────────────────────────────────────

    const searchDisciplines = async (q: string) => {
        setDiscLoading(true)
        try {
            const res = await getListDisciplinesNameApi(q)
            if (res.code === 1 && res.data) {
                setDiscResults(res.data.filter(d => !selectedDiscs.find(s => s.id === d.id)))
            }
        } finally {
            setDiscLoading(false)
        }
    }

    const handleDiscInput = (q: string) => {
        setDiscQuery(q)
        setDiscDdOpen(true)
        if (discDebounceRef.current) clearTimeout(discDebounceRef.current)
        discDebounceRef.current = setTimeout(() => searchDisciplines(q), 400)
    }

    const addDisc = (d: DisciplinesNameItems) => {
        if (selectedDiscs.length >= MAX_DISCIPLINES) return
        const next = [...selectedDiscs, d]
        setSelectedDiscs(next)
        setForm(f => ({ ...f, DisciplineIds: next.map(x => x.id) }))
        setDiscQuery('')
        setDiscDdOpen(false)
    }

    const removeDisc = (id: string) => {
        const next = selectedDiscs.filter(d => d.id !== id)
        setSelectedDiscs(next)
        setForm(f => ({ ...f, DisciplineIds: next.map(x => x.id) }))
    }

    // ── leader ─────────────────────────────────────────────────────────────────

    const searchLeaders = async (q: string) => {
        setLeaderLoading(true)
        try {
            const res = await getListLecturersNameApi(q)
            if (res.code === 1 && res.data) {
                setLeaderResults(res.data)
            }
        } finally {
            setLeaderLoading(false)
        }
    }

    const handleLeaderInput = (q: string) => {
        setLeaderQuery(q)
        setLeaderDdOpen(true)
        if (selectedLeader) {
            setSelectedLeader(null)
            setForm(f => ({ ...f, LeaderId: null }))
        }
        if (leaderDebounceRef.current) clearTimeout(leaderDebounceRef.current)
        leaderDebounceRef.current = setTimeout(() => searchLeaders(q), 400)
    }

    const selectLeader = (l: LecturersNameItems) => {
        setSelectedLeader(l)
        setForm(f => ({ ...f, LeaderId: l.id }))
        setLeaderQuery(l.name)
        setLeaderDdOpen(false)
    }

    const clearLeader = () => {
        setSelectedLeader(null)
        setForm(f => ({ ...f, LeaderId: null }))
        setLeaderQuery('')
    }

    // ── submit ─────────────────────────────────────────────────────────────────

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const ok = await onSubmit(form)
            if (ok) {
                resetForm()
                onOpenChange(false)
            }
        } finally {
            setSubmitting(false)
        }
    }

    const handleCancel = () => {
        resetForm()
        onOpenChange(false)
    }

    const set = (key: keyof CreateProjectForm) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }))

    const isMaxDisc = selectedDiscs.length >= MAX_DISCIPLINES
    const canSubmit =
        form.Title.trim() &&
        form.Describe.trim() &&
        form.Level &&
        form.DisciplineIds.length > 0 &&
        form.StartDate &&
        form.EndDate &&
        form.EndDate >= form.StartDate

    // ── render ─────────────────────────────────────────────────────────────────

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <FlaskConical className="h-4 w-4" />
                        Tạo đề tài nghiên cứu
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="space-y-4 py-1 overflow-y-auto">

                    {/* Title */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Tên đề tài <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            placeholder="Nhập tên đề tài..."
                            value={form.Title}
                            onChange={set('Title')}
                        />
                    </div>

                    {/* Describe */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Mô tả <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            rows={2}
                            placeholder="Mô tả chi tiết..."
                            value={form.Describe}
                            onChange={set('Describe')}
                        />
                    </div>

                    {/* Level */}
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Cấp độ <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={form.Level}
                            onValueChange={v => setForm(f => ({ ...f, Level: v }))}
                        >
                            <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="Chọn cấp độ..." />
                            </SelectTrigger>
                            <SelectContent>
                                {level_PROJECT_OPTIONS.map(l => (
                                    <SelectItem key={l.value} value={l.value}>
                                        {l.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Time range */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label className="text-xs">
                                Ngày bắt đầu <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="date"
                                className="text-sm"
                                value={form.StartDate}
                                onChange={set('StartDate')}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">
                                Ngày kết thúc <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="date"
                                className="text-sm"
                                value={form.EndDate}
                                min={form.StartDate || undefined}
                                onChange={set('EndDate')}
                            />
                        </div>
                    </div>

                    {/* Disciplines multi-select */}
                    <div className="space-y-1.5" ref={discWrapRef}>
                        <div className="flex items-center justify-between">
                            <Label className="text-xs">
                                Lĩnh vực nghiên cứu <span className="text-red-500">*</span>
                            </Label>
                            <span className={`text-xs ${isMaxDisc ? 'text-red-500' : 'text-muted-foreground'}`}>
                                {selectedDiscs.length}/{MAX_DISCIPLINES}
                            </span>
                        </div>

                        <div className="relative">
                            <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input px-3 py-1.5 focus-within:ring-1 focus-within:ring-ring">
                                <div className="flex flex-1 items-center gap-1.5">
                                    <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                    <input
                                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={isMaxDisc ? `Tối đa ${MAX_DISCIPLINES} lĩnh vực` : 'Tìm theo mã hoặc tên lĩnh vực...'}
                                        value={discQuery}
                                        disabled={isMaxDisc}
                                        onChange={e => handleDiscInput(e.target.value)}
                                        onFocus={() => { setDiscDdOpen(true); searchDisciplines(discQuery) }}
                                        onKeyDown={e => {
                                            if (e.key === 'Backspace' && !discQuery && selectedDiscs.length)
                                                removeDisc(selectedDiscs.at(-1)!.id)
                                            if (e.key === 'Escape') setDiscDdOpen(false)
                                        }}
                                    />
                                </div>
                            </div>

                            {discDdOpen && !isMaxDisc && (
                                <div className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border bg-popover shadow-sm">
                                    {discLoading ? (
                                        <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang tìm kiếm...
                                        </div>
                                    ) : discResults.length === 0 ? (
                                        <p className="px-3 py-2.5 text-xs text-muted-foreground">Không tìm thấy kết quả</p>
                                    ) : (
                                        discResults.map(d => (
                                            <button
                                                key={d.id}
                                                onClick={() => addDisc(d)}
                                                className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                                            >
                                                <span className="font-mono text-xs text-muted-foreground">{d.code}</span>
                                                <span className="text-muted-foreground/40">·</span>
                                                <span>{d.name}</span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {selectedDiscs.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {selectedDiscs.map(d => (
                                    <Badge key={d.id} variant="secondary" className="gap-1 text-xs font-normal">
                                        {d.name}
                                        <button onClick={() => removeDisc(d.id)} className="ml-0.5 rounded hover:text-red-500">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Leader search (optional) */}
                    <div className="space-y-1.5" ref={leaderWrapRef}>
                        <Label className="text-xs">Chủ nhiệm đề tài</Label>

                        <div className="relative">
                            {!selectedLeader ? (
                                // 1. KHI CHƯA CHỌN: Hiển thị ô tìm kiếm
                                <>
                                    <div className="flex min-h-9 items-center gap-1.5 rounded-md border border-input px-3 py-1.5 focus-within:ring-1 focus-within:ring-ring">
                                        <UserSearch className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                        <input
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                            placeholder="Tìm theo mã hoặc tên giảng viên..."
                                            value={leaderQuery ?? ""}
                                            onChange={e => handleLeaderInput(e.target.value)}
                                            onFocus={() => { setLeaderDdOpen(true); searchLeaders(leaderQuery) }}
                                            onKeyDown={e => { if (e.key === 'Escape') setLeaderDdOpen(false) }}
                                        />
                                    </div>

                                    {/* Dropdown kết quả tìm kiếm */}
                                    {leaderDdOpen && (
                                        <div className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border bg-popover shadow-sm">
                                            {leaderLoading ? (
                                                <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang tìm kiếm...
                                                </div>
                                            ) : leaderResults.length === 0 ? (
                                                <p className="px-3 py-2.5 text-xs text-muted-foreground">Không tìm thấy kết quả</p>
                                            ) : (
                                                leaderResults.map(l => (
                                                    <button
                                                        key={l.id}
                                                        type="button"
                                                        onClick={() => {
                                                            selectLeader(l);
                                                            setLeaderDdOpen(false);
                                                        }}
                                                        className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                                                    >
                                                        <span className="font-mono text-xs text-muted-foreground">{l.code}</span>
                                                        <span className="text-muted-foreground/40">·</span>
                                                        <span>{l.name}</span>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                // 2. KHI ĐÃ CHỌN: Ẩn input, hiển thị thông tin kèm nút xóa để chọn lại
                                <div className="flex min-h-9 items-center justify-between gap-2 rounded-md border border-input bg-muted/40 px-3 py-1.5">
                                    <div className="flex items-baseline gap-2 overflow-hidden text-sm">
                                        <UserSearch className="h-3.5 w-3.5 shrink-0 text-muted-foreground self-center" />
                                        <span className="font-mono text-xs text-muted-foreground shrink-0">{selectedLeader.code}</span>
                                        <span className="text-muted-foreground/40 shrink-0">·</span>
                                        <span className="font-medium truncate">{selectedLeader.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearLeader}
                                        className="ml-auto rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-red-500 transition-colors"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <DialogFooter>
                    <Button variant="outline" size="sm" onClick={handleCancel} disabled={submitting}>
                        Hủy
                    </Button>
                    <Button size="sm" disabled={!canSubmit || submitting} onClick={handleSubmit}>
                        {submitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                        Tạo đề tài
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}