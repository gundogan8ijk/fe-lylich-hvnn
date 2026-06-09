export type Gender = "Male" | "Female" ;

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
    { value: 'Male', label: 'Nam' },
    { value: 'Female', label: 'Nữ' },
];

export const GENDER_LABELS: Record<Gender, string> = {
    Male: 'Nam',
    Female: 'Nữ',
};

export type ConfirmedStatus = "Pending" | "Verified" | "Cancelled" | "Draft";

export const STATUS_LABELS: Record<ConfirmedStatus, string> = {
    Draft: 'Bản Nháp',
    Pending: 'Chờ duyệt',
    Verified: 'Đã phê duyệt',
    Cancelled: 'Đã hủy',
};

export const STATUS_OPTIONS: { value: ConfirmedStatus; label: string }[] = [
    { value: 'Draft', label: 'Bản Nháp' },
    { value: 'Pending', label: 'Chờ duyệt' },
    { value: 'Verified', label: 'Đã phê duyệt' }, // Sửa từ Cancelled -> Verified
    { value: 'Cancelled', label: 'Đã hủy' },      // Chuẩn hóa chữ viết hoa
];

export const confirmedStyle: Record<ConfirmedStatus, { bg: string; text: string }> = {
    Draft: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
    Pending: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-300' },
    Verified: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
    Cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-300' },
};

export const confirmedGradient: Record<ConfirmedStatus, string> = {
    Draft: 'from-slate-400 to-slate-500',
    Pending: 'from-amber-400 to-orange-500',
    Verified: 'from-emerald-400 to-teal-500',
    Cancelled: 'from-rose-400 to-red-500',
};