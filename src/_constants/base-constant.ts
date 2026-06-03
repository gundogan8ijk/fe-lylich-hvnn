export type Gender = "Male" | "Female";

export type ConfirmedStatus = "Pending" | "Verified" | "Cancelled"|"Draft";

export const STATUS_LABELS: Record<ConfirmedStatus, string> = {
    Draft:'Bản Nháp',
    Pending: 'Chờ duyệt',
    Verified: 'Đã phê duyệt',
    Cancelled: 'Đã hủy',
}

export const  STATUS_OPTIONS: { value: ConfirmedStatus; label: string }[] = [
    { value: 'Pending', label: 'Chờ duyệt' },
    { value: 'Cancelled', label: 'Đã phê duyệt' },
    { value: 'Cancelled', label: 'đã hủy' },

]