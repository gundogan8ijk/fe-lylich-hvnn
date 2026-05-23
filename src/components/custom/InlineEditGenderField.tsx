'use client'

import { useState } from 'react'
import { Edit2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

export type Gender = 'Male' | 'Female'

interface InlineEditGenderFieldProps {
    label: string
    value: Gender
    onSave: (value: Gender) => void
    icon?: React.ReactNode
}

export function InlineEditGenderField({
    label,
    value,
    onSave,
    icon
}: InlineEditGenderFieldProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [editValue, setEditValue] = useState<Gender>(value)

    const genderText =
        value === 'Male' ? 'Nam' : 'Nữ'

    const handleSave = () => {
        if (editValue === value) {
            setIsOpen(false)
            return
        }

        onSave(editValue)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setEditValue(value)
        setIsOpen(false)
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
                            {genderText}
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
                            Hãy chọn giới tính
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-3 py-4">
                        <Button
                            type="button"
                            variant={
                                editValue === 'Male'
                                    ? 'default'
                                    : 'outline'
                            }
                            className="flex-1"
                            onClick={() =>
                                setEditValue('Male')
                            }
                        >
                            Nam
                        </Button>

                        <Button
                            type="button"
                            variant={
                                editValue === 'Female'
                                    ? 'default'
                                    : 'outline'
                            }
                            className="flex-1"
                            onClick={() =>
                                setEditValue('Female')
                            }
                        >
                            Nữ
                        </Button>
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
                            disabled={editValue === value}
                        >
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}