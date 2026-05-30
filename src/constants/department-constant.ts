import { SelectionOption } from "@/_types/base-type/query-types";

export const DepartmentSearchOptions = [
    { value: "name", label: "Tên" },
    { value: "code", label: "Mã" },
] as const satisfies readonly SelectionOption<"name" | "code">[];

export type DepartmentSearchField =
    typeof DepartmentSearchOptions[number]['value'];

export const DepartmentSortOptions = [
    {
        label: 'Thành viên',
        value: 'members',
    },

    {
        label: 'bộ môn',
        value: 'disciplines',
    },
] as const;

export type DepartmentSortField =
    typeof DepartmentSortOptions[number]['value'];