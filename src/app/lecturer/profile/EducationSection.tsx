'use client'

import { useState, useMemo } from 'react'
import { GraduationCap, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
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

import { ApplicationStatus } from '@/constants/base-constant'
import { Education } from '@/types/educationType'
import { DEGREE_OPTIONS } from '@/constants/education-constan'
import { SearchInput } from '@/components/custom/search-Input'
import { StatusFilterSelect } from '@/components/custom/StatusFilter-Select'
import { EmptyState } from '@/components/custom/Empty-state'
import { EducationCard } from './EducationCard'
import { RegisterEducationForm } from '@/services/education-ser'
import { deleteEducationAction, registerEducationAction, updateEducationAction } from '@/hooks/education-hook'
import { SearchSelectProps } from '@/components/custom/selection-Props'

const EMPTY_FORM: RegisterEducationForm = {
    trainingName: '',
    majorName: '',
    degree: 2,
    graduatedAt: '',
}

interface EducationSectionProps {
    educations: Education[]
}

export function EducationSection({ educations }: EducationSectionProps) {
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all')

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<RegisterEducationForm>(EMPTY_FORM)
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
                e.majorName?.toLowerCase().includes(q) ||
                e.degreeName?.toLowerCase().includes(q)
            const matchStatus = filterStatus === 'all' || e.status === filterStatus
            return matchSearch && matchStatus
        })
    }, [educations, search, filterStatus])

    function openAdd() {
        setEditingId(null)
        setForm(EMPTY_FORM)
        setDialogOpen(true)
    }

    function openEdit(edu: Education) {
        setEditingId(edu.id)
        setForm({
            trainingName: edu.trainingName,
            majorName: edu.majorName ?? '',
            degree: edu.degreeValue,
            graduatedAt: edu.graduatedAt,
        })
        setDialogOpen(true)
    }

    function closeDialog() {
        setDialogOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof RegisterEducationForm>(key: K, value: RegisterEducationForm[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    async function handleSave() {
        const isInvalid = !form.trainingName.trim() || !form.majorName.trim()
            || form.graduatedAt.trim() === '' || form.degree === null
        if (isInvalid) return

        setSaving(true)
        try {
            const payload = {
                trainingName: form.trainingName.trim(),
                degree: form.degree,
                majorName: form.majorName.trim(),
                graduatedAt: form.graduatedAt,
            }

            if (editingId) {
                await updateEducationAction({ ...payload, educationId: editingId })
            } else {
                await registerEducationAction(payload)
            }
            closeDialog()
        } finally {
            setSaving(false)
        }
    }

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

    return (
        <>
            <Card className="shadow-sm border-muted-foreground/15">
                <CardHeader className="space-y-4 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                            <CardTitle className="text-xl font-semibold tracking-tight">
                                Bằng Cấp & Học Vấn
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm">
                                Quản lý lịch sử học vấn và chứng nhận của bạn
                            </CardDescription>
                        </div>
                        <Button
                            size="sm"
                            onClick={openAdd}
                            className="bg-green-500/90 w-full sm:w-auto gap-1.5 native-behavior"
                        >
                            <Plus size={16} />
                            Thêm học vấn
                        </Button>
                    </div>

                    {/* ↓ Shared components */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <SearchInput
                            value={search}
                            onChange={setSearch}
                            placeholder="Tìm trường, ngành học..."
                        />
                        <StatusFilterSelect value={filterStatus} onChange={setFilterStatus} />
                    </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                    {filtered.length === 0 ? (
                        <EmptyState
                            icon={GraduationCap}
                            title="Không có dữ liệu học vấn"
                            description="Thử thay đổi bộ lọc hoặc thêm học vấn mới."
                        />
                    ) : (
                        filtered.map((edu) => (
                            <EducationCard
                                key={edu.id}
                                education={edu}
                                onEdit={openEdit}
                                onDelete={setDeleteId}
                            />
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Add / Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
                <DialogContent className="sm:max-w-md rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                            {editingId ? 'Chỉnh sửa học vấn' : 'Thêm học vấn mới'}
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Nhập thông tin chi tiết về quá trình đào tạo của bạn bên dưới.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="trainingName" className="font-medium text-xs sm:text-sm">
                                Tên trường / học viện
                            </Label>
                            <Input
                                id="trainingName"
                                placeholder="Vd: Học viện Nông nghiệp Việt Nam"
                                value={form.trainingName}
                                onChange={(e) => setField('trainingName', e.target.value)}
                                className="bg-muted/20"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="majorName" className="font-medium text-xs sm:text-sm">
                                Ngành học
                            </Label>
                            <Input
                                id="majorName"
                                placeholder="Vd: Công nghệ thông tin"
                                value={form.majorName}
                                onChange={(e) => setField('majorName', e.target.value)}
                                className="bg-muted/20"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SearchSelectProps
                                value={form.degree}
                                onChange={(v) => setField("degree", v)}
                                options={DEGREE_OPTIONS}
                            />

                            <div className="space-y-1.5">
                                <Label htmlFor="graduatedAt" className="font-medium text-xs sm:text-sm">
                                    Ngày tốt nghiệp
                                </Label>
                                <Input
                                    id="graduatedAt"
                                    type="date"
                                    value={form.graduatedAt}
                                    onChange={(e) => setField('graduatedAt', e.target.value)}
                                    className="bg-muted/20 custom-calendar-icon"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-4">
                        <Button
                            variant="outline"
                            onClick={closeDialog}
                            disabled={saving}
                            className="rounded-lg"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving || !form.trainingName.trim() || !form.majorName.trim() || form.graduatedAt.trim() === ''}
                            className="rounded-lg min-w-[70px]"
                        >
                            {saving ? 'Đang lưu...' : 'Lưu'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete confirm */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent className="rounded-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa bản ghi?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa thông tin này không? Hành động này sẽ loại bỏ
                            dữ liệu vĩnh viễn và không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting} className="rounded-lg">
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg"
                        >
                            {deleting ? 'Đang xóa...' : 'Xóa dữ liệu'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}