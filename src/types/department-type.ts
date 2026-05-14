import { Pagination } from "./pagination-typeConfig";
import { SearchOption } from "./query-types";

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

export type SearchType = 'name' | 'code';

export const DepartmentSearchFieldOptions: SearchOption<SearchType>[] = [
    { value: "name", label: "Tên" },
    { value: "code", label: "Mã" },
];

export const DepartmentSortOptions = [
    {
        label: 'Thành viên',
        value: 'members',
    },

    {
        label: 'Bộ môn',
        value: 'disciplines',
    },
] as const;

export type DepartmentSortField =
    typeof DepartmentSortOptions[number]['value'];

export type NoFilter = Record<string, never>;






// React.useEffect(() => {
//         const fetchDepartments = async () => {
//             await getDepartmentsListAction();
//         };

//         fetchDepartments();
//     }, []);