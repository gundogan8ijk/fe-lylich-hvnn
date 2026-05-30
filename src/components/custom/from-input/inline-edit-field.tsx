// inline-edit-field.tsx
'use client'
import { Input } from '@/components/ui/input'
import { formatDateForInput } from '@/_lib/display-variable-helper.js'
import { InlineEditShell } from '../inline-edit-shell.tsx'

interface InlineEditFieldProps {
    label: string
    value: string | null | undefined
    onSave: (value: string) => void
    onDelete?: () => void
    icon?: React.ReactNode
    type?: string
    readOnly?: boolean
}

export function InlineEditField({ label, value, onSave, onDelete, icon, type = 'text', readOnly }: InlineEditFieldProps) {
    const displayValue = type === 'date' ? formatDateForInput(value ?? '') : value

    return (
        <InlineEditShell<string>
            label={label}
            value={displayValue}
            icon={icon}
            onDelete={onDelete}
            initialEditValue={value ?? ''}
            onSave={(val) => onSave(val.trim())}
            isEqual={(current) =>
                !current.trim() ||
                current.trim() === (value ?? '').trim()
            }
            readOnly={readOnly}
            renderInput={(editValue, setEditValue) => (
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Giá trị cũ</label>
                        <Input type={type} value={displayValue ?? ''} disabled className="bg-muted" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Giá trị mới</label>
                        <Input
                            type={type}
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>
            )}
        />
    )
}