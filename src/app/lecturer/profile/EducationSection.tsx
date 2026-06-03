'use client'

import { useState, useMemo, useRef } from 'react'
import { GraduationCap, Plus, ImageIcon, X, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/_components/ui/card'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/_components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/_components/ui/alert-dialog'
import { Label } from '@/_components/ui/label'

import { DEGREE_OPTIONS } from '@/_constants/education-constant'
import { SearchInput } from '@/_components/custom/search-Input'
import { ConfirmedStatusFilterSelect } from '@/_components/custom/StatusFilter-Select'
import { EmptyState } from '@/_components/custom/Empty-state'
import { EducationCard } from './EducationCard'
import {
    deleteEducationByLecturerAction,
    registerEducationByLecturerAction,
    updateEducationAction,
} from '@/Educaion-Lecturer/Education-Lecturer-hook'
import { SearchSelectProps } from '@/_components/custom/selection-Props'
import { ConfirmedStatus } from '@/_constants/base-constant'
import { RegisterEducationByLecturerForm } from '@/Educaion-Lecturer/Education-Lecturer-ser'
import { EducationLecturer } from '@/Educaion-Lecturer/Eduction-Lecturer-type'
import { uploadToCloudinary } from '@/_Common/_services/Image-config'

const EMPTY_FORM: RegisterEducationByLecturerForm = {
    trainingName: '',
    majorName: '',
    degree: '',
    graduatedAt: '',
    proofUrl: '',
}

interface EducationSectionProps {
    educations: EducationLecturer[]
}

export function EducationSection({ educations }: EducationSectionProps) {
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<ConfirmedStatus | 'all'>('all')

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<RegisterEducationByLecturerForm>(EMPTY_FORM)
    const [saving, setSaving] = useState(false)

    // Upload state
    const [uploading, setUploading] = useState(false)
    const proofInputRef = useRef<HTMLInputElement>(null)

    // Delete confirm state
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    // Lightbox state
    const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)

    // ---------- Filtered list ----------
    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return educations.filter((e) => {
            const matchSearch =
                !q ||
                e.trainingName.toLowerCase().includes(q) ||
                e.majorName?.toLowerCase().includes(q) ||
                e.degreeName?.toLowerCase().includes(q)
            const matchStatus = filterStatus === 'all' || e.confirmedStatus === filterStatus
            return matchSearch && matchStatus
        })
    }, [educations, search, filterStatus])

    function openAdd() {
        setEditingId(null)
        setForm(EMPTY_FORM)
        setDialogOpen(true)
    }

    function openEdit(edu: EducationLecturer) {
        setEditingId(edu.id)
        setForm({
            trainingName: edu.trainingName,
            majorName: edu.majorName ?? '',
            degree: edu.degreeName,
            graduatedAt: edu.graduatedAt,
            proofUrl: edu.proofUrl ?? '',
        })
        setDialogOpen(true)
    }

    function closeDialog() {
        setDialogOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof RegisterEducationByLecturerForm>(
        key: K,
        value: RegisterEducationByLecturerForm[K],
    ) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    async function handleProofUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        try {
            const url = await uploadToCloudinary(file)
            setField('proofUrl', url)
        } finally {
            setUploading(false)
            if (proofInputRef.current) proofInputRef.current.value = ''
        }
    }

    async function handleSave() {
        const isInvalid =
            !form.trainingName.trim() ||
            !form.majorName.trim() ||
            form.graduatedAt.trim() === '' ||
            form.degree === null

        if (isInvalid) return

        // Bắt buộc có ảnh minh chứng khi tạo mới
        if (!editingId && !form.proofUrl?.trim()) return

        setSaving(true)
        try {
            const payload = {
                trainingName: form.trainingName.trim(),
                degree: form.degree,
                majorName: form.majorName.trim(),
                graduatedAt: form.graduatedAt,
                proofUrl: form.proofUrl?.trim() ,
            }

            if (editingId) {
                await updateEducationAction({ ...payload, educationId: editingId })
            } else {
                await registerEducationByLecturerAction(payload)
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
            await deleteEducationByLecturerAction(deleteId)
        } finally {
            setDeleting(false)
            setDeleteId(null)
        }
    }

    const isSaveDisabled =
        saving ||
        uploading ||
        !form.trainingName.trim() ||
        !form.majorName.trim() ||
        form.graduatedAt.trim() === '' ||
        (!editingId && !form.proofUrl?.trim())

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

                    <div className="flex flex-col sm:flex-row gap-2">
                        <SearchInput
                            value={search}
                            onChange={setSearch}
                            placeholder="Tìm trường, ngành học..."
                        />
                        <ConfirmedStatusFilterSelect value={filterStatus} onChange={setFilterStatus} />
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
                                onViewProof={setLightboxUrl}
                            />
                        ))
                    )}
                </CardContent>
            </Card>

            {/* ── Add / Edit Dialog ── */}
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
                        {/* Tên trường */}
                        <div className="space-y-1.5">
                            <Label htmlFor="trainingName" className="font-medium text-xs sm:text-sm">
                                Tên trường / học viện <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="trainingName"
                                placeholder="Vd: Học viện Nông nghiệp Việt Nam"
                                value={form.trainingName}
                                onChange={(e) => setField('trainingName', e.target.value)}
                                className="bg-muted/20"
                            />
                        </div>

                        {/* Ngành học */}
                        <div className="space-y-1.5">
                            <Label htmlFor="majorName" className="font-medium text-xs sm:text-sm">
                                Ngành học <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="majorName"
                                placeholder="Vd: Công nghệ thông tin"
                                value={form.majorName}
                                onChange={(e) => setField('majorName', e.target.value)}
                                className="bg-muted/20"
                            />
                        </div>

                        {/* Trình độ + Ngày */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="font-medium text-xs sm:text-sm">
                                    Trình độ học vấn <span className="text-destructive">*</span>
                                </Label>
                                <SearchSelectProps
                                    placeholder="Trình độ học vấn"
                                    value={form.degree}
                                    onChange={(v) => setField('degree', v)}
                                    options={DEGREE_OPTIONS}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="graduatedAt" className="font-medium text-xs sm:text-sm">
                                    Ngày tốt nghiệp <span className="text-destructive">*</span>
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

                        {/* Minh chứng */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <Label className="font-medium text-xs sm:text-sm">
                                    Ảnh minh chứng{' '}
                                    {!editingId && <span className="text-destructive">*</span>}
                                </Label>
                                <span className="text-[11px] text-muted-foreground/60 italic">
                                    {editingId ? '(Không bắt buộc)' : '(Bắt buộc khi tạo mới)'}
                                </span>
                            </div>

                            {form.proofUrl?.trim() ? (
                                <div className="relative w-full rounded-lg overflow-hidden border border-muted group">
                                    <img
                                        src={form.proofUrl}
                                        alt="Minh chứng"
                                        className="w-full max-h-40 object-contain bg-muted/20 cursor-zoom-in"
                                        onClick={() => setLightboxUrl(form.proofUrl!)}
                                    />
                                    <div className="absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 gap-1.5 rounded-full text-xs"
                                            onClick={() => setLightboxUrl(form.proofUrl!)}
                                            type="button"
                                        >
                                            <Eye size={14} />
                                            Xem ảnh
                                        </Button>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full z-10"
                                        onClick={() => setField('proofUrl', '')}
                                        type="button"
                                        title="Gỡ ảnh hiện tại"
                                    >
                                        <X size={12} />
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => proofInputRef.current?.click()}
                                    disabled={uploading}
                                    className="w-full h-20 rounded-lg border-2 border-dashed border-muted-foreground/30
                                               flex flex-col items-center justify-center gap-1.5
                                               hover:border-muted-foreground/60 hover:bg-muted/20
                                               transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    <ImageIcon size={20} className="text-muted-foreground/50" />
                                    <span className="text-xs text-muted-foreground/60">
                                        {uploading ? 'Đang tải lên...' : 'Nhấn để tải ảnh minh chứng mới'}
                                    </span>
                                </button>
                            )}

                            <input
                                ref={proofInputRef}
                                type="file"
                                accept="image/*,application/pdf"
                                className="hidden"
                                onChange={handleProofUpload}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-4">
                        <Button
                            variant="outline"
                            onClick={closeDialog}
                            disabled={saving || uploading}
                            className="rounded-lg"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isSaveDisabled}
                            className="rounded-lg min-w-[70px]"
                        >
                            {saving ? 'Đang lưu...' : 'Lưu'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ── Delete confirm ── */}
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

            {/* ── Lightbox ── */}
            {lightboxUrl && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setLightboxUrl(null)}
                >
                    <button
                        className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20
                                    flex items-center justify-center text-white transition-colors"
                        onClick={() => setLightboxUrl(null)}
                    >
                        <X size={18} />
                    </button>
                    <img
                        src={lightboxUrl}
                        alt="Minh chứng"
                        className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    )
}