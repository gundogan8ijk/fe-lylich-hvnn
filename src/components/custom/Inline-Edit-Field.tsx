'use client'

import { useState } from 'react'
import { Pencil, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConfirmationDialog } from './confirmation-dialog'

interface InlineEditFieldProps {
    label: string
    value: string
    onSave: (newValue: string) => Promise<void> | void
    type?: 'text' | 'email' | 'tel' | 'date' | 'url'
    disabled?: boolean
    icon?: React.ReactNode
}

export function InlineEditField({
    label,
    value,
    onSave,
    type = 'text',
    disabled = false,
    icon,
}: InlineEditFieldProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(value)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)

    const handleClickSave = () => {
        if (editValue.trim() === '') {
            setError('Trường không thể trống')
            return
        }

        if (editValue === value) {
            setIsEditing(false)
            return
        }

        setShowConfirm(true)
    }

    const handleConfirmSave = async () => {
        try {
            setIsSaving(true)
            setError('')
            await onSave(editValue)
            setIsEditing(false)
            setShowConfirm(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Lỗi khi lưu')
            setEditValue(value)
        } finally {
            setIsSaving(false)
        }
    }

    const handleCancel = () => {
        setEditValue(value)
        setIsEditing(false)
        setError('')
        setShowConfirm(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleClickSave()
        } else if (e.key === 'Escape') {
            handleCancel()
        }
    }

    return (
        <>
            {isEditing ? (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <Input
                                type={type}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={label}
                                disabled={isSaving}
                                className="text-sm"
                                autoFocus
                            />
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleClickSave}
                            disabled={isSaving}
                            className="h-9 px-2"
                        >
                            <Check size={16} className="text-green-600" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancel}
                            disabled={isSaving}
                            className="h-9 px-2"
                        >
                            <X size={16} className="text-red-600" />
                        </Button>
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
            ) : (
                <div className="group flex items-center justify-between gap-2 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {icon && <div className="text-muted-foreground flex-shrink-0">{icon}</div>}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
                            <p className="text-sm sm:text-base font-medium text-foreground truncate">{value}</p>
                        </div>
                    </div>
                    {!disabled && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                            aria-label={`Chỉnh sửa ${label}`}
                        >
                            <Pencil size={16} className="text-muted-foreground" />
                        </button>
                    )}
                </div>
            )}

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                open={showConfirm}
                onOpenChange={setShowConfirm}
                title="Xác nhận thay đổi"
                description={`Bạn có chắc chắn muốn thay đổi ${label.toLowerCase()} từ "${value}" sang "${editValue}" không?`}
                message=""
                onConfirm={handleConfirmSave}
                onCancel={handleCancel}
                isLoading={isSaving}
            />
        </>
    )
}
