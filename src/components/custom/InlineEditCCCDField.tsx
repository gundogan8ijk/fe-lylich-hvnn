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

interface InlineEditCitizenIdFieldProps {
    label: string
    value: string
    onSave: (value: string) => void
    icon?: React.ReactNode
}

export function InlineEditCitizenIdField({
    label,
    value,
    onSave,
    icon
}: InlineEditCitizenIdFieldProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [editValue, setEditValue] = useState(value)

    const handleSave = () => {
        const newValue = editValue.trim()
        const oldValue = value.trim()

        if (newValue === oldValue) {
            setIsOpen(false)
            return
        }

        if (!/^\d{12}$/.test(newValue)) {
            return
        }

        onSave(newValue)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setEditValue(value)
        setIsOpen(false)
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const allowKeys = [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'Tab'
        ]

        if (allowKeys.includes(e.key)) {
            return
        }

        if (!/^\d$/.test(e.key)) {
            e.preventDefault()
            return
        }

        if (editValue.length >= 12) {
            e.preventDefault()
        }
    }

    return (
        <>
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
                            {value || '-'}
                        </span>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(true)}
                    className="ml-2"
                >
                    <Edit2 size={16} />
                </Button>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Chỉnh sửa {label}
                        </DialogTitle>

                        <DialogDescription>
                            Hãy nhập CCCD mới
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">
                                Giá trị cũ
                            </label>

                            <Input
                                type="text"
                                value={value}
                                disabled
                                className="bg-muted"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">
                                Giá trị mới
                            </label>

                            <Input
                                type="text"
                                value={editValue}
                                onChange={(e) =>
                                    setEditValue(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                maxLength={12}
                                placeholder="Nhập CCCD mới"
                                autoFocus
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Hủy
                        </Button>

                        <Button
                            onClick={handleSave}
                            disabled={
                                (editValue ?? '').trim() ===
                                (value ?? '').trim()
                            }
                        >
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}