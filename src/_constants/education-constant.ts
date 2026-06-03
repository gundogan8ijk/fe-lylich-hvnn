import { ConfirmedStatus } from "./base-constant"



export type DegreeDisplayName = | 'Cử nhân' | 'Thạc sĩ' | 'Tiến sĩ' | 'Phó giáo sư' | 'Giáo sư'
export type DegreeName = | 'Bachelor' | 'Master' | 'PhD' | 'AssociateProfessor' | 'Professor'


export const STATUS_VARIANTS: Record<ConfirmedStatus,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    Draft: 'outline',
    Pending: 'secondary',
    Verified: 'default',
    Cancelled: 'destructive',
};


export const DEGREE_OPTIONS: { value: DegreeName; label: DegreeDisplayName }[] = [
    { value: 'Bachelor', label: 'Cử nhân' },
    { value: 'Master', label: 'Thạc sĩ' },
    { value: 'PhD', label: 'Tiến sĩ' },
    { value: 'AssociateProfessor', label: 'Phó giáo sư' },
    { value: 'Professor', label: 'Giáo sư' },
]