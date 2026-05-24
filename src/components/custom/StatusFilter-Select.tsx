import { ApplicationStatus, STATUS_LABELS } from '@/constants/base-constant'
import { SelectionOption } from '@/types/base-type/query-types'
import { SearchSelectProps } from './selection-Props'

const STATUS_OPTIONS: readonly SelectionOption<ApplicationStatus | 'all'>[] = [
    { value: 'all',       label: 'Tất cả trạng thái' },
    { value: 'Pending',   label: STATUS_LABELS['Pending'] },
    { value: 'Verified',  label: STATUS_LABELS['Verified'] },
    { value: 'Cancelled', label: STATUS_LABELS['Cancelled'] },
]

interface StatusFilterSelectProps {
    value: ApplicationStatus | 'all'
    onChange: (value: ApplicationStatus | 'all') => void
}

export function StatusFilterSelect({ value, onChange }: StatusFilterSelectProps) {
    return (
        <SearchSelectProps
            value={value}
            onChange={onChange}
            options={STATUS_OPTIONS}
        />
    )
}