'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Textarea } from '@/_components/ui/textarea'
import { Label } from '@/_components/ui/label'
import { FlaskConical, X, Search, Loader2 } from 'lucide-react'
import { Badge } from '@/_components/ui/badge'
import { Input } from '@/_components/ui/input'
import { DisciplinesNameItems } from '@/working-public/Discipline-Public/disciplines-type'
import { getListDisciplinesNameApi } from '@/working-public/Discipline-Public/disciplines-Public-ser'
import { RegisterProjectForm } from '@/working-Lecturer/Project-List/Project-List-ser'

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    onSubmit: (data: RegisterProjectForm) => Promise<boolean>
}

const MAX_DISCIPLINES = 4
const defaultForm: RegisterProjectForm = { Title: '', Describe: '', DisciplineIds: [] }

export default function RegisterProjectDialog({ open, onOpenChange, onSubmit }: Props) {

    const [form, setForm] = useState<RegisterProjectForm>(defaultForm)
    const [selectedDiscs, setSelectedDiscs] = useState<DisciplinesNameItems[]>([])
    const [discQuery, setDiscQuery] = useState('')
    const [discResults, setDiscResults] = useState<DisciplinesNameItems[]>([])
    const [discLoading, setDiscLoading] = useState(false)
    const [ddOpen, setDdOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const wrapRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setDdOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const resetForm = () => {
        setForm(defaultForm)
        setSelectedDiscs([])
        setDiscQuery('')
        setDiscResults([])
    }

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
        setDdOpen(true)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => searchDisciplines(q), 400)
    }

    const addDisc = (d: DisciplinesNameItems) => {
        if (selectedDiscs.length >= MAX_DISCIPLINES) return
        const next = [...selectedDiscs, d]
        setSelectedDiscs(next)
        setForm(f => ({ ...f, DisciplineIds: next.map(x => x.id) }))
        setDiscQuery('')
        setDdOpen(false)
    }

    const removeDisc = (id: string) => {
        const next = selectedDiscs.filter(d => d.id !== id)
        setSelectedDiscs(next)
        setForm(f => ({ ...f, DisciplineIds: next.map(x => x.id) }))
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const res = await onSubmit(form)
            if (res) {
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

    const set = (key: keyof RegisterProjectForm) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }))

    const isMaxReached = selectedDiscs.length >= MAX_DISCIPLINES
    const canSubmit = form.Title && form.DisciplineIds.length > 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <FlaskConical className="h-4 w-4" /> Đăng ký đề tài nghiên cứu
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <div className="space-y-4 py-1">
                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Tên đề tài <span className="text-red-500">*</span>
                        </Label>
                        <Input placeholder="Nhập tên đề tài..." value={form.Title} onChange={set('Title')} />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">Mô tả</Label>
                        <Textarea rows={2} placeholder="Mô tả chi tiết..." value={form.Describe} onChange={set('Describe')} />
                    </div>

                    {/* Discipline multi-select */}
                    <div className="space-y-1.5" ref={wrapRef}>
                        <div className="flex items-center justify-between">
                            <Label className="text-xs">
                                Lĩnh vực nghiên cứu <span className="text-red-500">*</span>
                            </Label>
                            <span className={`text-xs ${isMaxReached ? 'text-red-500' : 'text-muted-foreground'}`}>
                                {selectedDiscs.length}/{MAX_DISCIPLINES}
                            </span>
                        </div>

                        <div className="relative">
                            <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input px-3 py-1.5 focus-within:ring-1 focus-within:ring-ring">
                                <div className="flex flex-1 items-center gap-1.5">
                                    <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                    <input
                                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={isMaxReached ? `Tối đa ${MAX_DISCIPLINES} lĩnh vực` : 'Tìm theo mã hoặc tên lĩnh vực...'}
                                        value={discQuery}
                                        disabled={isMaxReached}
                                        onChange={e => handleDiscInput(e.target.value)}
                                        onFocus={() => { setDdOpen(true); searchDisciplines(discQuery) }}
                                        onKeyDown={e => {
                                            if (e.key === 'Backspace' && !discQuery && selectedDiscs.length)
                                                removeDisc(selectedDiscs.at(-1)!.id)
                                            if (e.key === 'Escape') setDdOpen(false)
                                        }}
                                    />
                                </div>
                            </div>

                            {ddOpen && !isMaxReached && (
                                <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded-md border bg-popover shadow-sm">
                                    {discLoading ? (
                                        <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            Đang tìm kiếm...
                                        </div>
                                    ) : discResults.length === 0 ? (
                                        <p className="px-3 py-2.5 text-xs text-muted-foreground">
                                            Không tìm thấy kết quả
                                        </p>
                                    ) : (
                                        discResults.map(d => (
                                            <button
                                                key={d.id}
                                                onClick={() => addDisc(d)}
                                                className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                                            >
                                                <span className="font-mono text-xs text-muted-foreground">
                                                    {d.code}
                                                </span>
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
                                        <button
                                            onClick={() => removeDisc(d.id)}
                                            className="ml-0.5 rounded hover:text-red-500"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" size="sm" onClick={handleCancel} disabled={submitting}>
                        Hủy
                    </Button>
                    <Button size="sm" disabled={!canSubmit || submitting} onClick={handleSubmit}>
                        {submitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                        Đăng ký
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
