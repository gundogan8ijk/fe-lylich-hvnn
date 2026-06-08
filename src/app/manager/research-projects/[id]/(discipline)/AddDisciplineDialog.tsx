'use client'

import { useState, useEffect, useRef } from 'react'
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogFooter, DialogDescription
} from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Label } from '@/_components/ui/label'
import { Badge } from '@/_components/ui/badge'
import { Search, X, Loader2, BookOpen } from 'lucide-react'
import { DisciplinesNameItems } from '@/working-public/Discipline-Public/disciplines-type'
import { getListDisciplinesNameApi } from '@/working-public/Discipline-Public/disciplines-Public-ser'
import { MODAL_Manger_detail_PROJECT_KEYS } from '@/_constants/project-constant'
import { storeProjectManagerDetail } from '@/working-manager/project-detail/project-detail-store'
import { ProjectManagerDetailRecord } from '@/working-manager/project-detail/project-detail-type'
import { addDisciplinesByMangerAction } from '@/working-manager/project-detail/project-detail-hook'

export default function AddDisciplineDialog() {
    const data = storeProjectManagerDetail(s => s.data)
    const { isModalOpen, closeModal } = storeProjectManagerDetail()

    const open = isModalOpen(MODAL_Manger_detail_PROJECT_KEYS.ADD_DISCIPLINE)
    const handleClose = () => closeModal(MODAL_Manger_detail_PROJECT_KEYS.ADD_DISCIPLINE)

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md" onOpenAutoFocus={e => e.preventDefault()}>
                <AddDisciplineForm
                    key={open ? 'open' : 'closed'}
                    data={data}
                    onClose={handleClose}
                />
            </DialogContent>
        </Dialog>
    )
}

function AddDisciplineForm({ data, onClose }: {
    data: ProjectManagerDetailRecord | null
    onClose: () => void
}) {
    const [selected, setSelected] = useState<DisciplinesNameItems[]>([])
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<DisciplinesNameItems[]>([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [ddOpen, setDdOpen] = useState(false)
    const wrapRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const existingIds = new Set<string>
    (data?.baseInfo?.disciplines?.map((d: DisciplinesNameItems) => d.id) ?? [])
    const maxCount = data?.permissions.maxDisciplines ?? 5
    const currentCount = data?.baseInfo?.disciplines?.length ?? 0
    const remaining = maxCount - currentCount - selected.length
    const isMax = remaining <= 0


    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setDdOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const search = async (q: string) => {
        setLoading(true)
        try {
            const res = await getListDisciplinesNameApi(q)
            if (res.code === 1 && res.data) {
                const excludeIds = new Set([...existingIds, ...selected.map(s => s.id)])
                setResults(res.data.filter(d => !excludeIds.has(d.id)))
            }
        } finally {
            setLoading(false)
        }
    }

    const handleInput = (q: string) => {
        setQuery(q)
        setDdOpen(true)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => search(q), 400)
    }

    const add = (d: DisciplinesNameItems) => {
        if (isMax) return
        setSelected(prev => [...prev, d])
        setResults(prev => prev.filter(r => r.id !== d.id))
        setQuery('')
        setDdOpen(false)
    }

    const remove = (id: string) => setSelected(prev => prev.filter(d => d.id !== id))

    const handleSubmit = async () => {
        if (!selected.length) return
        setSubmitting(true)
        try {
            await addDisciplinesByMangerAction(selected.map(s => s.id))
            onClose()
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base">
                    <BookOpen className="h-4 w-4" />
                    Thêm lĩnh vực nghiên cứu
                </DialogTitle>
                <DialogDescription />
            </DialogHeader>

            <div className="space-y-3 py-1">
                <div className="space-y-1.5" ref={wrapRef}>
                    <div className="flex items-center justify-between">
                        <Label className="text-xs">Tìm lĩnh vực</Label>
                        <span className={`text-xs ${isMax ? 'text-red-500' : 'text-muted-foreground'}`}>
                            Còn thêm được {remaining}
                        </span>
                    </div>

                    <div className="relative">
                        <div className="flex min-h-9 items-center gap-1.5 rounded-md border border-input px-3 py-1.5 focus-within:ring-1 focus-within:ring-ring">
                            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <input
                                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder={isMax ? `Đã đạt giới hạn ${maxCount}` : 'Tìm theo mã hoặc tên lĩnh vực...'}
                                value={query}
                                disabled={isMax}
                                onChange={e => handleInput(e.target.value)}
                                onFocus={() => { setDdOpen(true); search(query) }}
                                onKeyDown={e => {
                                    if (e.key === 'Backspace' && !query && selected.length)
                                        remove(selected.at(-1)!.id)
                                    if (e.key === 'Escape') setDdOpen(false)
                                }}
                            />
                        </div>

                        {ddOpen && !isMax && (
                            <div className="absolute z-50 mt-1 max-h-52 w-full overflow-y-auto rounded-md border bg-popover shadow-sm">
                                {loading ? (
                                    <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang tìm kiếm...
                                    </div>
                                ) : results.length === 0 ? (
                                    <p className="px-3 py-2.5 text-xs text-muted-foreground">Không tìm thấy kết quả</p>
                                ) : (
                                    results.map(d => (
                                        <button
                                            key={d.id}
                                            type="button"
                                            onClick={() => add(d)}
                                            className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                                        >
                                            <span className="font-mono text-xs text-muted-foreground shrink-0">{d.code}</span>
                                            <span className="text-muted-foreground/40 shrink-0">·</span>
                                            <span>{d.name}</span>
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {selected.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {selected.map(d => (
                                <Badge key={d.id} variant="secondary" className="gap-1 text-xs font-normal">
                                    {d.name}
                                    <button type="button" onClick={() => remove(d.id)} className="ml-0.5 rounded hover:text-red-500">
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" size="sm" onClick={onClose} disabled={submitting}>Hủy</Button>
                <Button size="sm" disabled={!selected.length || submitting} onClick={handleSubmit}>
                    {submitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                    Thêm {selected.length > 0 && `(${selected.length})`}
                </Button>
            </DialogFooter>
        </>
    )
}