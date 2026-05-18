import { Pagination } from "./pagination-typeConfig";
import { SelectionOption } from "./query-types";

export interface DepartmentDetail {
    id: string
    code: string
    name: string
    describe: string
    officeLocation: string
    createdAt: string
    membersAmount: number
    disciplineAmount: number
    deanId?: string | null
    deanName?: string | null
    viceDeanId?: string | null
    viceDeanName?: string | null
    avatarUrl?: string | null
}

export type Departments = {
    id: string;
    code: string;
    name: string;
    members: number;
    disciplines: number;
    avatarUrl: string;
};

export type DepartmentList = {
    items: Departments[];
    pagination: Pagination;
};

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


export type Disciplines = {
    id: string;
    Name: string;
}


export type DisciplineList = {
    items: Disciplines[];
    pagination: Pagination;
};

// React.useEffect(() => {
//         const fetchDepartments = async () => {
//             await getDepartmentsListAction();
//         };

//         fetchDepartments();
//     }, []);