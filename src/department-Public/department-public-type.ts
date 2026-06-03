import { Pagination } from "@/_Common/_types/pagination-typeConfig"

export interface DepartmentPublicDetail {
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

export type DepartmentPublicItems = {
    id: string;
    code: string;
    name: string;
    members: number;
    disciplines: number;
    avatarUrl: string;
};

export type DepartmentPublicList = {
    items: DepartmentPublicItems[];
    pagination: Pagination;
};


export type DepartmentMembersPublic = {
    id: string;
    fullName: string;
    lecturerCode: string;
    position: string;
    disciplineName: string;
    joinedAt: Date;
    avatarUrl: string;
}


export type DepartmentMembersListPublic = {
    items: DepartmentMembersPublic[];
    pagination: Pagination;
};

export type DisciplineOfDepartmentPublicItems = {
    id: string;
    name: string;
}


export type DisciplineOfDepartmentPublicList = {
    items: DisciplineOfDepartmentPublicItems[];
    pagination: Pagination;
};