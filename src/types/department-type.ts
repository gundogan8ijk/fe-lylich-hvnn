export type Departments = {
    id: string;
    code: string;
    name: string;
    avatarUrl: string;
};

export type DepartmentList = {
    items: Departments[];
    page: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
};



// React.useEffect(() => {
//         const fetchDepartments = async () => {
//             await getDepartmentsListAction();
//         };

//         fetchDepartments();
//     }, []);