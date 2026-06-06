import { SelectionOption } from "@/_Common/_types/query-types";

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

export type AcademicPositionName = 'Dean' | 'ViceDean' | 'HeadOfDepartment' | 'DeputyHeadOfDepartment' | 'Lecturer';
export type AcademicPositionDisplay = 'Trưởng khoa' | 'Phó khoa' | 'Trưởng bộ môn' | 'Phó trưởng bộ môn' | 'Giảng viên';

export const ACADEMIC_POSITION_OPTIONS: { value: AcademicPositionName; label: AcademicPositionDisplay }[] = [
    { value: 'Dean', label: 'Trưởng khoa' },
    { value: 'ViceDean', label: 'Phó khoa' },
    { value: 'HeadOfDepartment', label: 'Trưởng bộ môn' },
    { value: 'DeputyHeadOfDepartment', label: 'Phó trưởng bộ môn' },
    { value: 'Lecturer', label: 'Giảng viên' },
];

export const ACADEMIC_POSITION_LABELS: Record<AcademicPositionName, string> = {
    Dean: 'Trưởng khoa',
    ViceDean: 'Phó khoa',
    HeadOfDepartment: 'Trưởng bộ môn',
    DeputyHeadOfDepartment: 'Phó trưởng bộ môn',
    Lecturer: 'Giảng viên',
};