'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from '@/components/ui/dialog'
import { Edit2 } from 'lucide-react'

interface InlineEditTProps<T> {
    label: string
    value: T | null | undefined
    onSave: (value: T) => void
    onDelete?: () => void
    icon?: React.ReactNode

    displayValue: (value: T | null | undefined) => string
    parseValue: (input: string) => T
    inputType?: string
}

export function InlineEditT<T>({
    label,
    value,
    onSave,
    onDelete,
    icon,
    displayValue,
    parseValue,
    inputType = 'text'
}: InlineEditTProps<T>) {

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [editValue, setEditValue] = useState('')

    const openEdit = () => {
        setEditValue(value ? displayValue(value) : '')
        setIsEditOpen(true)
    }

    const handleSave = () => {
        const newValueStr = editValue.trim()
        const oldValueStr = value ? displayValue(value).trim() : ''

        if (!newValueStr) return

        if (newValueStr === oldValueStr) {
            setIsEditOpen(false)
            return
        }

        const parsed = parseValue(newValueStr)
        onSave(parsed)
        setIsEditOpen(false)
    }

    const handleCancel = () => {
        setEditValue(value ? displayValue(value) : '')
        setIsEditOpen(false)
    }

    const handleDelete = () => {
        onDelete?.()
        setIsDeleteOpen(false)
    }

    return (
        <>
            {/* FIELD */}
            <div className="flex items-center justify-between py-2 mx-3">
                <div className="flex items-center gap-2">
                    {icon && (
                        <span className="text-muted-foreground">
                            {icon}
                        </span>
                    )}

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                            {label}
                        </span>
                        <span className="text-foreground">
                            {value ? displayValue(value) : '-'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-2">
                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => setIsDeleteOpen(true)}
                            hidden={value == null}
                        >
                            Xóa
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={openEdit}
                    >
                        <Edit2 size={16} />
                    </Button>
                </div>
            </div>

            {/* EDIT MODAL */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa {label}</DialogTitle>
                        <DialogDescription>
                            Nhập giá trị mới
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-2 py-4">
                        <Input
                            type={inputType}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancel}>
                            Hủy
                        </Button>

                        <Button onClick={handleSave}>
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* DELETE MODAL */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Xác nhận xóa</DialogTitle>
                        <DialogDescription>
                            Hành động này không thể hoàn tác
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-3 text-sm text-muted-foreground">
                        {label}: <b>{value ? displayValue(value) : '-'}</b>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                            Hủy
                        </Button>

                        <Button variant="destructive" onClick={handleDelete}>
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}