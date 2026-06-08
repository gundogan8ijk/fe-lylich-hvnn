'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Label } from '@/_components/ui/label'
import { Loader2, Search, X, BookOpen } from 'lucide-react'
import { getListDisciplinesNameApi } from '@/working-public/Discipline-Public/disciplines-Public-ser'
import { DisciplinesNameItems } from '@/working-public/Discipline-Public/disciplines-type'
import { addDisciplinesAction } from '@/working-Lecturer/Project-Detail/Project-Detail-hook'

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    projectId: string
    currentDisciplinesCount: number
    maxDisciplines: number
}

export default function AddDisciplineDialog({ open, onOpenChange, projectId, currentDisciplinesCount, maxDisciplines }: Props) {
    const [selectedDisc, setSelectedDisc] = useState<DisciplinesNameItems | null>(null)
    const [discQuery, setDiscQuery] = useState('')
    const [discResults, setDiscResults] = useState<DisciplinesNameItems[]>([])
    const [discLoading, setDiscLoading] = useState(false)
    const [ddOpen, setDdOpen] = useState(false)
    const [saving, setSaving] = useState(false)

    const wrapRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const searchIdRef = useRef(0)

    useEffect(() => {
        if (open) {
            setSelectedDisc(null)
            setDiscQuery('')
            setDiscResults([])
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

    const searchDisciplines = async (q: string) => {
        setDiscLoading(true)
        const id = ++searchIdRef.current
        try {
            const res = await getListDisciplinesNameApi(q)
            if (id === searchIdRef.current && res.code === 1 && res.data) {
                setDiscResults(res.data)
            }
        } finally {
            if (id === searchIdRef.current) setDiscLoading(false)
        }
    }

    const handleInput = (q: string) => {
        setDiscQuery(q)
        setDdOpen(true)
        if (selectedDisc) setSelectedDisc(null)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => searchDisciplines(q), 400)
    }

    const handleSave = async () => {
        if (!selectedDisc) return
        if (currentDisciplinesCount >= maxDisciplines) {
            onOpenChange(false)
            return
        }

        setSaving(true)
        try {
            const ok = await addDisciplinesAction(projectId, {
                DisciplineIds: [selectedDisc.id]
            })
            if (ok) {
                onOpenChange(false)
            }
        } finally {
            setSaving(false)
        }
    }

    const clearSelection = () => {
        setSelectedDisc(null)
        setDiscQuery('')
        setDiscResults([])
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white text-slate-900 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                        Thêm lĩnh vực nghiên cứu
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Chọn một lĩnh vực khoa học/nghiên cứu phù hợp với đề tài. (Hiện tại: {currentDisciplinesCount}/{maxDisciplines})
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    <div className="space-y-1.5 relative" ref={wrapRef}>
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Tìm kiếm Lĩnh vực <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            {!selectedDisc ? (
                                <>
                                    <div className="flex min-h-10 items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500 transition-colors bg-slate-50 dark:bg-slate-950 dark:border-slate-800">
                                        <Search className="h-4 w-4 shrink-0 text-slate-400" />
                                        <input
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                                            placeholder="Nhập mã hoặc tên lĩnh vực..."
                                            value={discQuery}
                                            onChange={(e) => handleInput(e.target.value)}
                                            onFocus={() => { setDdOpen(true); searchDisciplines(discQuery); }}
                                        />
                                    </div>
                                    {ddOpen && (
                                        <div className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-slate-200 bg-white text-slate-900 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                                            {discLoading ? (
                                                <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-slate-500">
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang tìm kiếm...
                                                </div>
                                            ) : discResults.length === 0 ? (
                                                <p className="px-3 py-2.5 text-xs text-slate-500">Không tìm thấy kết quả</p>
                                            ) : (
                                                discResults.map((d) => (
                                                    <button
                                                        key={d.id}
                                                        type="button"
                                                        onClick={() => { setSelectedDisc(d); setDiscQuery(d.name); setDdOpen(false); }}
                                                        className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                                                    >
                                                        <span className="font-mono text-xs text-slate-400 shrink-0">{d.code}</span>
                                                        <span className="text-slate-300 dark:text-slate-700">·</span>
                                                        <span className="truncate">{d.name}</span>
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
                                        <span className="font-mono text-xs text-slate-400 shrink-0">{selectedDisc.code}</span>
                                        <span className="text-slate-300 dark:text-slate-700 shrink-0">·</span>
                                        <span className="font-medium truncate text-slate-800 dark:text-slate-200">{selectedDisc.name}</span>
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
                        disabled={saving || !selectedDisc || currentDisciplinesCount >= maxDisciplines}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    >
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Thêm lĩnh vực
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

