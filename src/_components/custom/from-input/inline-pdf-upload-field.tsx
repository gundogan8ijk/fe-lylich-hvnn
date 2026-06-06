'use client'
import { useState } from 'react'
import { Input } from '@/_components/ui/input'
import { InlineEditShell } from '../inline-edit-shell.tsx'
import { uploadToPdfCloudinary } from '@/_Common/_services/pdf-config'

interface InlineUploadPdfFieldProps {
    label: string
    value: string | null | undefined
    onSave: (url: string) => void
    onDelete?: () => void
    icon?: React.ReactNode
    readOnly?: boolean
}

export function InlineUploadPdfField({ label, value, onSave, onDelete, icon, readOnly }: InlineUploadPdfFieldProps) {
    const [isUploading, setIsUploading] = useState(false)

    return (
        <InlineEditShell<File | null>
            label={label}
            value={value}
            icon={icon}
            onDelete={onDelete}
            initialEditValue={null}
            onSave={async (file) => {
                if (!file) return;
                setIsUploading(true);
                try {
                    const url = await uploadToPdfCloudinary(file);
                    onSave(url);
                } finally {
                    setIsUploading(false);
                }
            }}
            isEqual={(current) => !current || isUploading}
            readOnly={readOnly || isUploading}
            renderInput={(editValue, setEditValue) => (
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">File hiện tại</label>
                        {value ? (
                            <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline break-all">
                                Xem tài liệu đã tải lên
                            </a>
                        ) : (
                            <span className="text-sm text-muted-foreground">Chưa có tài liệu</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Chọn file PDF mới</label>
                        <Input
                            type="file"
                            accept="application/pdf"
                            onChange={e => setEditValue(e.target.files?.[0] || null)}
                            disabled={isUploading}
                        />
                        {isUploading && <span className="text-sm text-indigo-600 font-medium">Đang tải lên... Xin vui lòng đợi</span>}
                    </div>
                </div>
            )}
        />
    )
}
