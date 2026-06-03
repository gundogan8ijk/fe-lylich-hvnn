'use client'
import { Input } from '@/_components/ui/input'
import { InlineEditShell } from '../inline-edit-shell.tsx'

interface Props {
    label: string
    value: string
    onSave: (value: string) => void
    icon?: React.ReactNode
}

export function InlineEditCitizenIdField({ label, value, onSave, icon }: Props) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
        if (allowKeys.includes(e.key)) return
        if (!/^\d$/.test(e.key)) e.preventDefault()
    }

    return (
        <InlineEditShell<string>
            label={label}
            value={value}
            icon={icon}
            initialEditValue={value}
            onSave={(val) => onSave(val.trim())}
            isEqual={(current) =>
                !/^\d{12}$/.test(current.trim()) ||
                current.trim() === value.trim()
            }
            renderInput={(editValue, setEditValue) => (
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Giá trị cũ</label>
                        <Input value={value} disabled className="bg-muted" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Giá trị mới</label>
                        <Input
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            maxLength={12}
                            placeholder="Nhập CCCD mới"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        />
    )
}