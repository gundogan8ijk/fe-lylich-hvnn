// inline-edit-gender.tsx
'use client'
import { Button } from '@/_components/ui/button'
import { InlineEditShell } from '../inline-edit-shell.tsx'

export type Gender = 'Male' | 'Female'

interface Props {
    label: string
    value: Gender
    onSave: (value: Gender) => void
    icon?: React.ReactNode
}

export function InlineEditGenderField({ label, value, onSave, icon }: Props) {
    return (
        <InlineEditShell<Gender>
            label={label}
            value={value === 'Male' ? 'Nam' : 'Nữ'}
            icon={icon}
            initialEditValue={value}
            onSave={(val) => onSave(val)}
            isEqual={(current) => current === value}
            renderInput={(editValue, setEditValue) => (
                <div className="flex gap-3">
                    <Button
                        type="button" className="flex-1"
                        variant={editValue === 'Male' ? 'default' : 'outline'}
                        onClick={() => setEditValue('Male')}
                    >
                        Nam
                    </Button>
                    <Button
                        type="button" className="flex-1"
                        variant={editValue === 'Female' ? 'default' : 'outline'}
                        onClick={() => setEditValue('Female')}
                    >
                        Nữ
                    </Button>
                </div>
            )}
        />
    )
}