'use client'

import { useState, useMemo } from 'react'
import { GraduationCap, Plus, Search, Pencil, Trash2, CalendarDays } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { ApplicationStatus, Education } from '@/types/lecurer-type'
import {
    addEducationAction,
    updateEducationAction,
    deleteEducationAction,
    AddEducationRequest,
} from '@/hooks/education-hook'

// ---------- Constants ----------

const DEGREE_OPTIONS = ['Cử nhân', 'Kỹ sư', 'Thạc sĩ', 'Tiến sĩ', 'Cao đẳng', 'Trung cấp']

const STATUS_LABELS: Record<ApplicationStatus, string> = {
    Pending: 'Chờ duyệt',
    Verified: 'Đã xác nhận',
    Cancelled: 'Đã hủy',
}

const STATUS_VARIANTS: Record<ApplicationStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    Pending: 'secondary',
    Verified: 'default',
    Cancelled: 'destructive',
}

// ---------- Helpers ----------

function formatDate(dateStr: string): string {
    if (!dateStr) return '—'
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
}

// ---------- Form state ----------

type EducationForm = {
    trainingName: string
    degreeName: string
    graduatedAt: string
    status: ApplicationStatus
}

const EMPTY_FORM: EducationForm = {
    trainingName: '',
    degreeName: 'Cử nhân',
    graduatedAt: '',
    status: 'Pending',
}

// ---------- Props ----------

interface EducationSectionProps {
    educations: Education[]
}

// ---------- Component ----------

export function EducationSection({ educations }: EducationSectionProps) {
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all')

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<EducationForm>(EMPTY_FORM)
    const [saving, setSaving] = useState(false)

    // Delete confirm state
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    // ---------- Filtered list ----------

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return educations.filter((e) => {
            const matchSearch =
                !q ||
                e.trainingName.toLowerCase().includes(q) ||
                e.degreeName.toLowerCase().includes(q)
            const matchStatus = filterStatus === 'all' || e.status === filterStatus
            return matchSearch && matchStatus
        })
    }, [educations, search, filterStatus])

    // ---------- Dialog handlers ----------

    function openAdd() {
        setEditingId(null)
        setForm(EMPTY_FORM)
        setDialogOpen(true)
    }

    function openEdit(edu: Education) {
        setEditingId(edu.educationId)
        setForm({
            trainingName: edu.trainingName,
            degreeName: edu.degreeName,
            graduatedAt: edu.graduatedAt,
            status: edu.status,
        })
        setDialogOpen(true)
    }

    function closeDialog() {
        setDialogOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof EducationForm>(key: K, value: EducationForm[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    async function handleSave() {
        if (!form.trainingName.trim()) return
        setSaving(true)
        try {
            const payload: AddEducationRequest = {
                trainingName: form.trainingName.trim(),
                degreeName: form.degreeName,
                graduatedAt: form.graduatedAt,
                status: form.status,
            }
            if (editingId) {
                await updateEducationAction({ ...payload, educationId: editingId })
            } else {
                await addEducationAction(payload)
            }
            closeDialog()
        } finally {
            setSaving(false)
        }
    }

    // ---------- Delete handlers ----------

    async function handleDelete() {
        if (!deleteId) return
        setDeleting(true)
        try {
            await deleteEducationAction(deleteId)
        } finally {
            setDeleting(false)
            setDeleteId(null)
        }
    }

    // ---------- Render ----------

    return (
        <>
            <Card className="shadow-sm border-muted-foreground/15 rounded-xl overflow-hidden">
                <CardHeader className="space-y-4 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <CardTitle className="text-xl font-bold tracking-tight">Học vấn</CardTitle>
                            <p className="text-xs text-muted-foreground mt-0.5">Quản lý và cập nhật thông tin bằng cấp chuyên môn.</p>
                        </div>
                        <Button size="sm" onClick={openAdd} className="w-full sm:w-auto shadow-sm transition-all">
                            <Plus size={16} className="mr-1.5 stroke-[2.5]" />
                            Thêm học vấn
                        </Button>
                    </div>

                    {/* Search + Filter bar */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <Search
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-70"
                            />
                            <Input
                                placeholder="Tìm kiếm trường học, bằng cấp..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 bg-background/50 focus-visible:bg-background h-9"
                            />
                        </div>
                        <Select
                            value={filterStatus}
                            onValueChange={(v) => setFilterStatus(v as ApplicationStatus | 'all')}
                        >
                            <SelectTrigger className="w-full sm:w-48 h-9 bg-background/50">
                                <SelectValue placeholder="Trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="Pending">Chờ duyệt</SelectItem>
                                <SelectItem value="Verified">Đã xác nhận</SelectItem>
                                <SelectItem value="Cancelled">Đã hủy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3 p-5 sm:p-6 pt-0">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2.5 py-12 border border-dashed rounded-xl bg-muted/20 text-muted-foreground">
                            <GraduationCap size={36} strokeWidth={1.25} className="text-muted-foreground/70" />
                            <p className="text-sm font-medium">Không tìm thấy dữ liệu học vấn phù hợp</p>
                        </div>
                    ) : (
                        filtered.map((edu) => (
                            <div
                                key={edu.educationId}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-muted/70 p-4 hover:bg-muted/30 hover:border-muted-foreground/20 transition-all duration-200 shadow-2xs"
                            >
                                {/* Left Content: Icon + Text Info */}
                                <div className="flex items-start gap-3.5 min-w-0">
                                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 border border-sky-100/50 dark:border-sky-900/30">
                                        <GraduationCap size={20} className="stroke-[2]" />
                                    </div>

                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span className="font-semibold text-sm sm:text-base text-foreground leading-snug tracking-tight">
                                                {edu.trainingName}
                                            </span>
                                            <Badge variant={STATUS_VARIANTS[edu.status]} className="text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0">
                                                {STATUS_LABELS[edu.status]}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                                            <span className="text-foreground/80 bg-muted px-1.5 py-0.5 rounded-md text-[11px]">{edu.degreeName}</span>
                                            {edu.graduatedAt && (
                                                <span className="flex items-center gap-1 opacity-80">
                                                    <CalendarDays size={13} className="text-muted-foreground/80" />
                                                    Tốt nghiệp: {formatDate(edu.graduatedAt)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content: Action Buttons */}
                                <div className="flex justify-end items-center gap-1 border-t pt-2 sm:border-t-0 sm:pt-0 shrink-0">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                                        onClick={() => openEdit(edu)}
                                    >
                                        <Pencil size={14} />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => setDeleteId(edu.educationId)}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Add / Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
                <DialogContent className="sm:max-w-md rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">
                            {editingId ? 'Chỉnh sửa học vấn' : 'Thêm học vấn mới'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-3">
                        {/* Training name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="trainingName" className="font-semibold text-xs text-foreground/90">Tên trường / Học viện</Label>
                            <Input
                                id="trainingName"
                                placeholder="Vd: Đại học Bách Khoa Hà Nội"
                                value={form.trainingName}
                                onChange={(e) => setField('trainingName', e.target.value)}
                                className="h-9.5"
                            />
                        </div>

                        {/* Degree + Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="font-semibold text-xs text-foreground/90">Bằng cấp</Label>
                                <Select
                                    value={form.degreeName}
                                    onValueChange={(v) => setField('degreeName', v)}
                                >
                                    <SelectTrigger className="h-9.5">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DEGREE_OPTIONS.map((d) => (
                                            <SelectItem key={d} value={d}>
                                                {d}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="graduatedAt" className="font-semibold text-xs text-foreground/90">Ngày tốt nghiệp</Label>
                                <Input
                                    id="graduatedAt"
                                    type="date"
                                    value={form.graduatedAt}
                                    onChange={(e) => setField('graduatedAt', e.target.value)}
                                    className="h-9.5 block"
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <Label className="font-semibold text-xs text-foreground/90">Trạng thái xác thực</Label>
                            <Select
                                value={form.status}
                                onValueChange={(v) => setField('status', v as ApplicationStatus)}
                            >
                                <SelectTrigger className="h-9.5">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Chờ duyệt</SelectItem>
                                    <SelectItem value="Verified">Đã xác nhận</SelectItem>
                                    <SelectItem value="Cancelled">Đã hủy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={closeDialog} disabled={saving} className="h-9">
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving || !form.trainingName.trim()}
                            className="h-9 shadow-xs"
                        >
                            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete confirm */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent className="rounded-xl max-w-[90vw] sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-bold">Xác nhận xóa bản ghi?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-muted-foreground">
                            Hành động này sẽ gỡ bỏ hoàn toàn lịch sử học vấn này khỏi hệ thống dữ liệu và không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 sm:gap-0">
                        <AlertDialogCancel disabled={deleting} className="h-9 mt-0">Hủy</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete} 
                            disabled={deleting}
                            className="h-9 bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs"
                        >
                            {deleting ? 'Đang xóa...' : 'Xác nhận xóa'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}