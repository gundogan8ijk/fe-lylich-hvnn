import { ListQuery, NoFilter } from "@/_Common/_types/query-types";
import { Pagination } from "@/_Common/_types/pagination-typeConfig";

export interface AccountItemDto {
    accountId: string;
    email: string;
    roles: string[];
    isLocked: boolean;
    lockoutEnd: string | null;
    lockReason: string | null;
    lecturerId: string | null;
    fullName: string | null;
    lecturerCode: string | null;
}

export type AccountListQuery = ListQuery<NoFilter, "email">;

export interface AccountListResponse {
    items: AccountItemDto[];
    pagination: Pagination;
}
