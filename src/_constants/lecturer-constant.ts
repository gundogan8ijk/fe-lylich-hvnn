import { SelectionOption } from "@/_Common/_types/query-types";

export const LecturerSearchOptions = [
    { value: "name", label: "Tên" },
    { value: "code", label: "Mã" },
] as const satisfies readonly SelectionOption<"name" | "code">[];

export type LecturerSearchField =
    typeof LecturerSearchOptions[number]['value'];

export const LecturerSortOptions = [
    {
        label: 'Tên',
        value: 'name',
    },
    {
        label: 'Mã',
        value: 'code',
    },
] as const;

export type LecturerSortField =
    typeof LecturerSortOptions[number]['value'];
