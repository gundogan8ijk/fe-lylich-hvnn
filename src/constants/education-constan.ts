import { ConfirmedStatus } from "./base-constant"

export type DegreeName = | 'Cử nhân' | 'Thạc sĩ' | 'Tiến sĩ' | 'Phó giáo sư' | 'Giáo sư'


export const STATUS_VARIANTS: Record<ConfirmedStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    Pending: 'secondary',
    Verified: 'default',
    Cancelled: 'destructive',
}


export const DEGREE_OPTIONS: { value: number; label: DegreeName }[] = [
    { value: 1, label: 'Cử nhân' },
    { value: 2, label: 'Thạc sĩ' },
    { value: 3, label: 'Tiến sĩ' },
    { value: 4, label: 'Phó giáo sư' },
    { value: 5, label: 'Giáo sư' },
]