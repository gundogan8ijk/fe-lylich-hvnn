'use client'

import { useState, useMemo, useRef } from 'react'
import { Trophy, Plus, ImageIcon, X, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/_components/ui/card'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Textarea } from '@/_components/ui/textarea'
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

import { AWARD_LEVEL_OPTIONS } from '@/_constants/award-constant'
import { SearchInput } from '@/_components/custom/search-Input'
import { ConfirmedStatusFilterSelect } from '@/_components/custom/StatusFilter-Select'
import { EmptyState } from '@/_components/custom/Empty-state'
import { AwardCard } from './AwardCard'
import {
    deleteAwardByLecturerAction,
    registerAwardByLecturerAction,
    updateAwardAction,
} from '@/Award-Lecturer/Award-Lecturer-hook'
import { SearchSelectProps } from '@/_components/custom/selection-Props'
import { ConfirmedStatus } from '@/_constants/base-constant'
import { RegisterAwardByLecturerForm } from '@/Award-Lecturer/Award-Lecturer-ser'
import { AwardLecturer } from '@/Award-Lecturer/Award-Lecturer-type'
import { uploadToCloudinary } from '@/_Common/_services/Image-config'
import Image from 'next/image'

const EMPTY_FORM: RegisterAwardByLecturerForm = {
    name: '',
    awardDate: '',
    level: 'School',
    description: '',
    proofUrl: '',
}

interface AwardSectionProps {
    awards: AwardLecturer[]
}

export function AwardSection({ awards = [] }: AwardSectionProps) {
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<ConfirmedStatus | 'all'>('all')

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<RegisterAwardByLecturerForm>(EMPTY_FORM)
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
        return awards.filter((a) => {
            const matchSearch =
                !q ||
                a.name.toLowerCase().includes(q) ||
                a.level.toLowerCase().includes(q) ||
                a.description?.toLowerCase().includes(q)
            const matchStatus = filterStatus === 'all' || a.confirmedStatus === filterStatus
            return matchSearch && matchStatus
        })
    }, [awards, search, filterStatus])

    function openAdd() {
        setEditingId(null)
        setForm(EMPTY_FORM)
        setDialogOpen(true)
    }

    function openEdit(award: AwardLecturer) {
        setEditingId(award.id)
        setForm({
            name: award.name,
            awardDate: award.awardDate,
            level: award.level,
            description: award.description ?? '',
            proofUrl: award.proofUrl ?? '',
        })
        setDialogOpen(true)
    }

    function closeDialog() {
        setDialogOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof RegisterAwardByLecturerForm>(
        key: K,
        value: RegisterAwardByLecturerForm[K],
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
        const isInvalid = !form.name.trim() || !form.awardDate.trim() || !form.level
        if (isInvalid) return

        // Bắt buộc có ảnh minh chứng khi tạo mới
        if (!editingId && !form.proofUrl?.trim()) return

        setSaving(true)
        try {
            const payload = {
                name: form.name.trim(),
                awardDate: form.awardDate,
                level: form.level,
                description: form.description?.trim() ?? '',
                proofUrl: form.proofUrl?.trim() ?? '',
            }

            if (editingId) {
                await updateAwardAction({ ...payload, awardId: editingId })
            } else {
                await registerAwardByLecturerAction(payload)
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
            await deleteAwardByLecturerAction(deleteId)
        } finally {
            setDeleting(false)
            setDeleteId(null)
        }
    }

    // Nút Lưu bị disable khi: đang lưu, đang upload, thiếu tên, thiếu ngày,
    // hoặc tạo mới mà chưa có ảnh minh chứng (guard thêm .trim())
    const isSaveDisabled =
        saving ||
        uploading ||
        !form.name.trim() ||
        !form.awardDate.trim() ||
        (!editingId && !form.proofUrl?.trim())

    return (
        <>
            <Card className="shadow-sm border-muted-foreground/15">
                <CardHeader className="space-y-4 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                            <CardTitle className="text-xl font-semibold tracking-tight">
                                Giải Thưởng & Khen Thưởng
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm">
                                Quản lý danh sách các giải thưởng và danh hiệu bạn đạt được
                            </CardDescription>
                        </div>
                        <Button
                            size="sm"
                            onClick={openAdd}
                            className="bg-green-500/90 w-full sm:w-auto gap-1.5 native-behavior"
                        >
                            <Plus size={16} />
                            Thêm giải thưởng
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <SearchInput
                            value={search}
                            onChange={setSearch}
                            placeholder="Tìm tên giải thưởng, mô tả..."
                        />
                        <ConfirmedStatusFilterSelect value={filterStatus} onChange={setFilterStatus} />
                    </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                    {filtered.length === 0 ? (
                        <EmptyState
                            icon={Trophy}
                            title="Không có dữ liệu giải thưởng"
                            description="Thử thay đổi bộ lọc hoặc thêm giải thưởng mới."
                        />
                    ) : (
                        filtered.map((award) => (
                            <AwardCard
                                key={award.id}
                                award={award}
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
                            {editingId ? 'Chỉnh sửa giải thưởng' : 'Thêm giải thưởng mới'}
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Nhập thông tin chi tiết về giải thưởng hoặc danh hiệu khen thưởng của bạn bên dưới.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-3">
                        {/* Tên */}
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="font-medium text-xs sm:text-sm">
                                Tên giải thưởng / khen thưởng <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="Vd: Chiến sĩ thi đua cấp cơ sở"
                                value={form.name}
                                onChange={(e) => setField('name', e.target.value)}
                                className="bg-muted/20"
                            />
                        </div>

                        {/* Cấp + Ngày */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="font-medium text-xs sm:text-sm">
                                    Cấp giải thưởng <span className="text-destructive">*</span>
                                </Label>
                                <SearchSelectProps
                                    placeholder="Cấp giải thưởng"
                                    value={form.level}
                                    onChange={(v) => setField('level', v)}
                                    options={AWARD_LEVEL_OPTIONS}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="awardDate" className="font-medium text-xs sm:text-sm">
                                    Ngày nhận giải <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="awardDate"
                                    type="date"
                                    value={form.awardDate}
                                    onChange={(e) => setField('awardDate', e.target.value)}
                                    className="bg-muted/20 custom-calendar-icon"
                                />
                            </div>
                        </div>

                        {/* Mô tả */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="description" className="font-medium text-xs sm:text-sm">
                                    Mô tả chi tiết
                                </Label>
                                <span className="text-[11px] text-muted-foreground/60 italic">(Không bắt buộc)</span>
                            </div>
                            <Textarea
                                id="description"
                                placeholder="Nhập tóm tắt nội dung giải thưởng hoặc lý do được khen thưởng..."
                                value={form.description}
                                onChange={(e) => setField('description', e.target.value)}
                                className="bg-muted/20 resize-none min-h-[80px]"
                            />
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
                                /* Preview ảnh đã upload hoặc ảnh cũ có sẵn */
                                <div className="relative w-full rounded-lg overflow-hidden border border-muted group">
                                    <img
                                        src={form.proofUrl}
                                        alt="Minh chứng"
                                        className="w-full max-h-40 object-contain bg-muted/20 cursor-zoom-in"
                                        onClick={() => setLightboxUrl(form.proofUrl!)}
                                    />
                                    {/* Overlay tác vụ khi hover */}
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
                                    {/* Nút xóa góc trên phải để thay thế ảnh */}
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
                                /* Vùng upload mới khi không có ảnh hoặc sau khi bấm xóa */
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
                        <AlertDialogTitle>Xác nhận xóa giải thưởng?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa thông tin giải thưởng này không? Hành động này sẽ loại bỏ
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

            {/* ── Lightbox (hoạt động cả ngoài danh sách lẫn trong Dialog) ── */}
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

                    <div className="relative w-[90vw] h-[85vh]">
                        <Image
                            src={lightboxUrl}
                            alt="Minh chứng"
                            fill
                            className="object-contain rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </>
    )
}