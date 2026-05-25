import { SelectionOption } from '@/_types/base-type/query-types'
import { SearchSelectProps } from './selection-Props'
import { ConfirmedStatus, STATUS_LABELS } from '@/constants/base-constant'

const STATUS_OPTIONS: readonly SelectionOption<ConfirmedStatus | 'all'>[] = [
    { value: 'all', label: 'Tất cả' },
    ...(Object.entries(STATUS_LABELS) as [ConfirmedStatus, string][]).map(
        ([value, label]) => ({ value, label })
    ),
]

interface ConfirmedStatusFilterSelectProps {
    value: ConfirmedStatus | 'all'
    onChange: (value: ConfirmedStatus | 'all') => void
}

export function ConfirmedStatusFilterSelect({ value, onChange }: ConfirmedStatusFilterSelectProps) {
    return (
        <SearchSelectProps
            value={value}
            onChange={onChange}
            options={STATUS_OPTIONS}
        />
    )
}