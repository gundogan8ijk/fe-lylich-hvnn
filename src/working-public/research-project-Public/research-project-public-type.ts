import { Pagination } from "@/_Common/_types/pagination-typeConfig";

export interface ResearchProjectPublicItem {
    id: string;
    code: string;
    title: string;
    describe: string;
    level: string;
    evaluation: string;
    endDate?: string | null;
}

export interface ResearchProjectPublicList {
    items: ResearchProjectPublicItem[];
    pagination: Pagination;
}

export interface ResearchProjectContributorPublic {
    id: string;
    lecturerId: string;
    fullName: string;
    code: string;
    status: string;
    joinedAt: string;
}

export interface ResearchProjectParticipantPublic {
    id: string;
    fullName: string;
    email?: string | null;
    role: string;
    joinedAt: string;
}

export interface ResearchProjectDisciplinePublic {
    id: string;
    code: string;
    name: string;
}

export interface ResearchProjectFundingPublic {
    source: string;
    amount: number;
    description?: string | null;
}

export interface ResearchProjectPublicDetail {
    id: string;
    code: string;
    title: string;
    describe: string;
    projectStatus: string;
    level: string;
    evaluation: string;
    timeStart?: string | null;
    timeEnd?: string | null;
    detailUrl?: string | null;
    contributors: ResearchProjectContributorPublic[];
    participants: ResearchProjectParticipantPublic[];
    disciplines: ResearchProjectDisciplinePublic[];
    fundings: ResearchProjectFundingPublic[];
}
