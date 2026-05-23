'use client'

import { useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Camera, Trash2 } from 'lucide-react'
import { notify } from '@/components/utils/Notify'

interface AvatarEditProps {
    avatarUrl?: string | null
    fallback?: string
    onSave: (url: string) => void
    onDelete?: () => void
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET!)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    })

    if (!res.ok) {
        notify.error('Upload thất bại')
        throw new Error('Upload thất bại')
    }

    const data = await res.json()
    return data.secure_url
}

export function AvatarEdit({ avatarUrl, fallback, onSave, onDelete }: AvatarEditProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Preview tạm thời
        setPreview(URL.createObjectURL(file))
        setUploading(true)

        try {
            const url = await uploadToCloudinary(file)
            onSave(url)
        } catch {
            setPreview(null) // rollback preview nếu lỗi
        } finally {
            setUploading(false)
            // Reset input để chọn lại cùng file được
            if (inputRef.current) inputRef.current.value = ''
        }
    }

    const handleDelete = () => {
        setPreview(null)
        onDelete?.()
    }

    const displayUrl = preview ?? avatarUrl

    return (
        <div className="relative inline-block">
            {/* Avatar */}
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                {displayUrl ? (
                    <AvatarImage 
                        src={displayUrl}
                        alt={fallback ?? ''}
                        width={96}
                        height={96} 
                        className="rounded-full object-cover"
                    />
                ) : (
                    <>
                        <AvatarImage src={undefined} />
                        <AvatarFallback>{fallback?.[0] ?? '?'}</AvatarFallback>
                    </>
                )}
            </Avatar>

            {/* Loading overlay */}
            {uploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                    <span className="text-xs text-white">Đang tải...</span>
                </div>
            )}

            {/* Dropdown button */}
            {!uploading && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="absolute bottom-0 right-0 h-7 w-7 rounded-full shadow"
                        >
                            <Camera size={14} />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => inputRef.current?.click()}>
                            <Camera size={14} className="mr-2" />
                            {avatarUrl ? 'Đổi ảnh' : 'Tải ảnh lên'}
                        </DropdownMenuItem>

                        {onDelete && avatarUrl && (
                            <DropdownMenuItem
                                className="text-red-500 focus:text-red-600"
                                onClick={handleDelete}
                            >
                                <Trash2 size={14} className="mr-2" />
                                Xóa ảnh
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {/* Input file ẩn */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    )
}