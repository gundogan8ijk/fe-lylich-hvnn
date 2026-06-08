import { SelectionOption } from '@/_Common/_types/query-types'
import { SearchSelectProps } from './selection-Props'
import { ConfirmedStatus, STATUS_LABELS } from '@/_constants/base-constant'

const STATUS_OPTIONS: readonly SelectionOption<ConfirmedStatus | 'all'>[] = [
    { value: 'all', label: 'Tất cả' },
    ...(Object.entries(STATUS_LABELS) as [ConfirmedStatus, string][]).map(
        ([value, label]) => ({ value, label })
    ),
]

interface ConfirmedStatusFilterSelectProps {
    value: ConfirmedStatus | 'all'
    onChange: (value: ConfirmedStatus | 'all') => void
    excludeDraft?: boolean
}

export function ConfirmedStatusFilterSelect({ value, onChange, excludeDraft = false }: ConfirmedStatusFilterSelectProps) {
    const options = excludeDraft ? STATUS_OPTIONS.filter(o => o.value !== 'Draft') : STATUS_OPTIONS;

    return (
        <SearchSelectProps
            value={value}
            onChange={onChange}
            options={options}
        />
    )
}