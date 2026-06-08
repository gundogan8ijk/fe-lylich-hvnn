'use client'

import { useState, useRef } from 'react'
import { Pencil, ImageIcon, X, Trash2 } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/_components/ui/dialog'
import { updateAvatarDepartmentAction, removeAvatarDepartmentAction } from '@/working-manager/department/infor/department-manger-hook'
import { uploadToCloudinary } from '@/_Common/_services/Image-config'
import Image from 'next/image'

interface Props {
    departmentId: string
    initialAvatarUrl?: string | null
    onUpdated: () => void
}

export default function EditDepartmentAvatarDialog({ departmentId, initialAvatarUrl, onUpdated }: Props) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '')
    const avatarInputRef = useRef<HTMLInputElement>(null)

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        try {
            const url = await uploadToCloudinary(file)
            setAvatarUrl(url)
        } finally {
            setUploading(false)
            if (avatarInputRef.current) avatarInputRef.current.value = ''
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!avatarUrl.trim() || avatarUrl === initialAvatarUrl) return

        setLoading(true)
        const success = await updateAvatarDepartmentAction(departmentId, { avatarUrl: avatarUrl })
        if (success) {
            setOpen(false)
            onUpdated()
        }
        setLoading(false)
    }

    const handleRemove = async () => {
        if (!initialAvatarUrl) {
            setAvatarUrl('') // just clear local state if not saved
            return
        }
        setLoading(true)
        const success = await removeAvatarDepartmentAction(departmentId)
        if (success) {
            setAvatarUrl('')
            setOpen(false)
            onUpdated()
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) setAvatarUrl(initialAvatarUrl || '')
        }}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full opacity-80 hover:opacity-100 shadow-sm" title="Thay đổi ảnh đại diện">
                    <Pencil className="w-3.5 h-3.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        {avatarUrl ? (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-muted group mt-1 flex items-center justify-center bg-gray-100">
                                <Image
                                    src={avatarUrl}
                                    alt="Avatar Preview"
                                    fill
                                    className="object-contain"
                                />
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="absolute top-2 right-2 h-8 w-8 rounded-full z-10 opacity-80 hover:opacity-100"
                                    onClick={() => setAvatarUrl('')}
                                    type="button"
                                    title="Gỡ ảnh"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => avatarInputRef.current?.click()}
                                disabled={uploading}
                                className="w-full mt-1 h-32 rounded-lg border-2 border-dashed border-muted-foreground/30
                                            flex flex-col items-center justify-center gap-2
                                            hover:border-muted-foreground/60 hover:bg-muted/20
                                            transition-colors disabled:opacity-50 cursor-pointer bg-gray-50"
                            >
                                <ImageIcon size={28} className="text-muted-foreground/50" />
                                <span className="text-sm text-muted-foreground/60 font-medium">
                                    {uploading ? 'Đang tải lên...' : 'Nhấn để chọn ảnh mới'}
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
                    <DialogFooter className="flex sm:justify-between flex-row-reverse sm:flex-row mt-6">
                        <div className="flex gap-2 justify-end w-full">
                            {initialAvatarUrl && (
                                <Button type="button" variant="destructive" onClick={handleRemove} disabled={loading} className="mr-auto">
                                    <Trash2 size={16} className="mr-2" /> Xóa ảnh gốc
                                </Button>
                            )}
                            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                                Hủy
                            </Button>
                            <Button type="submit" disabled={loading || uploading || !avatarUrl.trim() || avatarUrl === initialAvatarUrl}>
                                {loading ? "Đang lưu..." : "Lưu thay đổi"}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
