import { type ConfirmedStatus } from "./base-constant"

// ==============================
// Degree — BE: Degree
// ==============================
export type DegreeName = 'Bachelor' | 'Master' | 'PhD' | 'AssociateProfessor' | 'Professor'
export type DegreeDisplayName = 'Cử nhân' | 'Thạc sĩ' | 'Tiến sĩ' | 'Phó giáo sư' | 'Giáo sư'

export const DEGREE_OPTIONS: { value: DegreeName; label: DegreeDisplayName }[] = [
    { value: 'Bachelor', label: 'Cử nhân' },
    { value: 'Master', label: 'Thạc sĩ' },
    { value: 'PhD', label: 'Tiến sĩ' },
    { value: 'AssociateProfessor', label: 'Phó giáo sư' },
    { value: 'Professor', label: 'Giáo sư' },
];

export const DEGREE_LABELS: Record<DegreeName, DegreeDisplayName> = {
    Bachelor: 'Cử nhân',
    Master: 'Thạc sĩ',
    PhD: 'Tiến sĩ',
    AssociateProfessor: 'Phó giáo sư',
    Professor: 'Giáo sư',
};

/** Trả về nhãn tiếng Việt của cấp bậc. Nếu không khớp value thì thử khớp label trực tiếp (backward compat). */
export function getDegreeLabel(degree: string): string {
    const byValue = DEGREE_OPTIONS.find(d => d.value === degree);
    if (byValue) return byValue.label;
    const byLabel = DEGREE_OPTIONS.find(d => d.label === degree);
    if (byLabel) return byLabel.label;
    return degree;
}

// ==============================
// ConfirmedStatus style variants — dành riêng cho Education
// ==============================
export const STATUS_VARIANTS: Record<ConfirmedStatus,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    Draft: 'outline',
    Pending: 'secondary',
    Verified: 'default',
    Cancelled: 'destructive',
};