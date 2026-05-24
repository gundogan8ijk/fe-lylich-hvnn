export type Gender = "Male" | "Female";

export type ApplicationStatus = "Pending" | "Verified" | "Cancelled";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
    Pending: 'Chờ duyệt',
    Verified: 'Đã xác nhận',
    Cancelled: 'Đã hủy',
}