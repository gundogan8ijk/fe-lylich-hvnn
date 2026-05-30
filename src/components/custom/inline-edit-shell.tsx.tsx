'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog'
import { Edit2, Trash2 } from 'lucide-react'

interface InlineEditShellProps<T> {
    label: string
    value: string | null | undefined
    icon?: React.ReactNode
    onDelete?: () => void
    initialEditValue?: T
    onSave: (payload: T) => void
    onOpenEdit?: () => T
    isEqual?: (current: T) => boolean
    renderInput: (editValue: T, setEditValue: (val: T) => void) => React.ReactNode
    readOnly?: boolean
}

export function InlineEditShell<T>({
    label,
    value,
    icon,
    onDelete,
    initialEditValue,
    onSave,
    onOpenEdit,
    isEqual,
    renderInput,
    readOnly,
}: InlineEditShellProps<T>) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [editValue, setEditValue] = useState<T>((initialEditValue ?? {}) as T)

    const openEdit = () => {
        const resetValue = onOpenEdit ? onOpenEdit() : (initialEditValue ?? {}) as T
        setEditValue(resetValue)
        setIsEditOpen(true)
    }

    const handleSave = () => {
        onSave(editValue)
        setIsEditOpen(false)
    }

    const handleCancel = () => {
        setEditValue((initialEditValue ?? {}) as T)
        setIsEditOpen(false)
    }

    const handleDelete = () => {
        onDelete?.()
        setIsDeleteOpen(false)
    }

    const saveDisabled = isEqual ? isEqual(editValue) : false
    const isUrl = value ? /^https?:\/\//i.test(value) : false

    return (
        <>
            {/* DISPLAY */}
            <div className="flex items-center justify-between py-2 mx-3">
                <div className="flex items-center gap-2 min-w-0">
                    {icon && <span className="text-muted-foreground shrink-0">{icon}</span>}
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-muted-foreground">{label}</span>
                        {isUrl ? (
                            <a
                                href={value!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline break-all text-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {value}
                            </a>
                        ) : (
                            <span className="text-foreground">{value || '-'}</span>
                        )}
                    </div>
                </div>

                {!readOnly && (
                    <div className="flex items-center gap-2 ml-2 shrink-0">
                        {onDelete && value && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => setIsDeleteOpen(true)}
                                title="Xóa"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={openEdit}>
                            <Edit2 size={16} />
                        </Button>
                    </div>
                )}
            </div>

            {/* EDIT MODAL */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa {label}</DialogTitle>
                        <DialogDescription>Nhập giá trị mới</DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        {renderInput(editValue, setEditValue)}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancel}>Hủy</Button>
                        <Button onClick={handleSave} disabled={saveDisabled}>Lưu</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* DELETE MODAL */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Xác nhận xóa</DialogTitle>
                        <DialogDescription>Hành động này không thể hoàn tác</DialogDescription>
                    </DialogHeader>
                    <div className="py-3 text-sm text-muted-foreground">
                        {label}: <b>{value || '-'}</b>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Hủy</Button>
                        <Button variant="destructive" onClick={handleDelete}>Xóa</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}