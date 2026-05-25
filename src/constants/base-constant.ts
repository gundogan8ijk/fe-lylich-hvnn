export type Gender = "Male" | "Female";

export type ConfirmedStatus = "Pending" | "Verified" | "Cancelled";

export const STATUS_LABELS: Record<ConfirmedStatus, string> = {
    Pending: 'Chờ duyệt',
    Verified: 'Đã xác nhận',
    Cancelled: 'Đã hủy',
}