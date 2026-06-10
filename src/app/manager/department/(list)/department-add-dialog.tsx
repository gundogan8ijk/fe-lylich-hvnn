'use client'

import { useState, useRef } from 'react'
import { Plus, ImageIcon, X, Eye } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/_components/ui/dialog'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { Textarea } from '@/_components/ui/textarea'
import { addDepartmentMangerAction } from '@/working-manager/department/infor/department-manger-hook'
import { uploadToCloudinary } from '@/_Common/_services/Image-config'
import Image from 'next/image'

export default function DepartmentAddDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)
    const avatarInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        describe: '',
        foundedAt: '',
        officeLocation: '',
        avatarUrl: ''
    })

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        try {
            const url = await uploadToCloudinary(file)
            setFormData(p => ({ ...p, avatarUrl: url }))
        } finally {
            setUploading(false)
            if (avatarInputRef.current) avatarInputRef.current.value = ''
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        const success = await addDepartmentMangerAction(formData)
        
        if (success) {
            setOpen(false)
            setFormData({
                code: '',
                name: '',
                describe: '',
                foundedAt: '',
                officeLocation: '',
                avatarUrl: ''
            })
        }
        setLoading(false)
    }

    const isSaveDisabled = loading || uploading || !formData.code.trim() || !formData.name.trim() || !formData.describe.trim() || !formData.foundedAt.trim()

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Thêm khoa
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Thêm khoa mới</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4 max-h-[65vh] overflow-y-auto px-1">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Mã khoa (*)</Label>
                            <Input
                                id="code"
                                required
                                value={formData.code}
                                onChange={(e) => setFormData(p => ({ ...p, code: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Tên khoa (*)</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="foundedAt">Năm thành lập (*)</Label>
                            <Input
                                id="foundedAt"
                                type="date"
                                required
                                value={formData.foundedAt}
                                onChange={(e) => setFormData(p => ({ ...p, foundedAt: e.target.value }))}
                                className="custom-calendar-icon"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="officeLocation">Địa chỉ văn phòng</Label>
                            <Input
                                id="officeLocation"
                                value={formData.officeLocation}
                                onChange={(e) => setFormData(p => ({ ...p, officeLocation: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Ảnh đại diện (Logo)</Label>
                            {formData.avatarUrl?.trim() ? (
                                <div className="relative w-full rounded-lg overflow-hidden border border-muted group mt-1" style={{ minHeight: '160px' }}>
                                    <Image
                                        src={formData.avatarUrl}
                                        alt="Avatar"
                                        fill
                                        className="object-contain bg-muted/20 cursor-zoom-in"
                                        onClick={() => setLightboxUrl(formData.avatarUrl)}
                                        sizes="(max-width: 768px) 100vw, 425px"
                                    />
                                    <div className="absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 gap-1.5 rounded-full text-xs"
                                            onClick={() => setLightboxUrl(formData.avatarUrl)}
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
                                        onClick={() => setFormData(p => ({ ...p, avatarUrl: '' }))}
                                        type="button"
                                        title="Gỡ ảnh hiện tại"
                                    >
                                        <X size={12} />
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => avatarInputRef.current?.click()}
                                    disabled={uploading}
                                    className="w-full mt-1 h-20 rounded-lg border-2 border-dashed border-muted-foreground/30
                                               flex flex-col items-center justify-center gap-1.5
                                               hover:border-muted-foreground/60 hover:bg-muted/20
                                               transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    <ImageIcon size={20} className="text-muted-foreground/50" />
                                    <span className="text-xs text-muted-foreground/60">
                                        {uploading ? 'Đang tải lên...' : 'Nhấn để tải ảnh đại diện lên'}
                                    </span>
                                </button>
                            )}

                            <input
                                ref={avatarInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="describe">Mô tả (*)</Label>
                            <Textarea
                                id="describe"
                                required
                                value={formData.describe}
                                onChange={(e) => setFormData(p => ({ ...p, describe: e.target.value }))}
                            />
                        </div>
                        <Button type="submit" disabled={isSaveDisabled} className="mt-4">
                            {loading ? "Đang xử lý..." : "Lưu thông tin"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Lightbox */}
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
                            alt="Preview"
                            fill
                            className="object-contain rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                            sizes="90vw"
                        />
                    </div>
                </div>
            )}
        </>
    )
}
