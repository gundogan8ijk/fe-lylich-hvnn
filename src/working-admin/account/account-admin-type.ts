import { ListQuery } from "@/_Common/_types/query-types";
import { PagedResultNested } from "@/_Common/_types/result-typeConfig";

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

export interface AccountListQuery extends ListQuery<undefined, "email"> {}

export interface AccountListResponse extends PagedResultNested<AccountItemDto> {}
