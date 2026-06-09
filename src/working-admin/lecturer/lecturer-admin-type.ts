import { Pagination } from "@/_Common/_types/pagination-typeConfig";

export interface LecturerItemAccountRecord {
    lecturerId: string;
    fullName: string;
    lecturerCode: string;
    cccd: string;
    gender: string;
    email?: string;
    accountId?: string;
    isLocked?: boolean;
    lockoutEnd?: string | null;
    lockReason?: string | null;
    roles?: string[];
    birthDate: string;
    avatarUrl?: string;
}

export interface LecturerListAccountResponse {
    items: LecturerItemAccountRecord[];
    pagination: Pagination;
}