import { Pagination } from "@/_Common/_types/pagination-typeConfig";

export interface ProjectExternalPublicItem {
    id: string;
    code: string;
    title: string;
    describe: string;
    level: string;
    evaluation: string;
    completionAt: string;
}

export interface ProjectExternalPublicList {
    items: ProjectExternalPublicItem[];
    pagination: Pagination;
}

export interface ProjectExternalContributorPublic {
    id: string;
    lecturerId: string;
    fullName: string;
    code: string;
    role: string;
    joinedAt: string;
}

export interface ProjectExternalParticipantPublic {
    id: string;
    fullName: string;
    email?: string | null;
    role: string;
    joinedAt: string;
}

export interface ProjectExternalDisciplinePublic {
    id: string;
    code: string;
    name: string;
}

export interface ProjectExternalPublicDetail {
    id: string;
    code: string;
    title: string;
    describe: string;
    level: string;
    evaluation: string;
    completionAt: string;
    organization: string;
    detailUrl?: string | null;
    contributors: ProjectExternalContributorPublic[];
    participants: ProjectExternalParticipantPublic[];
    disciplines: ProjectExternalDisciplinePublic[];
}
