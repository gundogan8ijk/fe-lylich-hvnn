import { PaginationResponse } from "@/_Common/_types/pagination-typeConfig";
import { SortDirection } from "@/_Common/_types/query-types";

export interface LecturerItemAccountRecord {
    lecturerId: string;
    fullName: string;
    lecturerCode: string;
    cccd: string;
    gender: string;
    email: string | null;
    roles: string[];
    birthDate: string;
    avatarUrl: string;
}

export interface LecturerListAccountResponse {
    items: LecturerItemAccountRecord[];
    pagination: PaginationResponse;
}

export type LecturerSearchField = "FullName" | "Code" | "All";

export interface LecturerAdminListQuery {
    page: number;
    perPage: number;
    search: string;
    searchField?: LecturerSearchField;
    sort?: {
        field: string;
        direction: SortDirection;
    } | null;
    role?: string;
}
