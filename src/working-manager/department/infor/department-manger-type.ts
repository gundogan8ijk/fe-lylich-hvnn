import { Pagination } from "@/_Common/_types/pagination-typeConfig"

export interface AddDepartmentRequest {
    code: string;
    name: string;
    describe: string;
    foundedAt: string;
    officeLocation?: string;
    avatarUrl?: string;
}

export interface AddDisciplineRequest {
    code: string;
    name: string;
    describe: string;
    foundedAt: string;
    totalCredits: number;
}

export interface RenameDepartmentRequest {
    newName: string;
}

export interface RenameCodeDepartmentRequest {
    newCode: string;
}

export interface UpdateDescribeDepartmentRequest {
    newDescribe: string;
}

export interface ChangeOfficeLocationRequest {
    officeLocation: string;
}

export interface UpdateAvatarDepartmentRequest {
    avatarUrl: string;
}

export interface AddMemberRequest {
    lecturerId: string;
    disciplineId: string;
    position: string;
    joinedAt: string;
}

export interface UpdateMemberPositionRequest {
    newPosition: string;
    disciplineId?: string;
    joinedAt?: string;
}


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
    isPublic: boolean
}

export type DepartmentPublicItems = {
    id: string;
    code: string;
    name: string;
    members: number;
    disciplines: number;
    isPublic: boolean;
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