import { Pagination } from "@/_Common/_types/pagination-typeConfig";

export interface BookPublicItem {
    id: string;
    title: string;
    describe: string;
    publishYear: string;
    publisher?: string | null;
    isbn?: string | null;
}

export interface BookPublicList {
    items: BookPublicItem[];
    pagination: Pagination;
}

export interface BookInternalContributorPublic {
    id: string;
    lecturerId: string;
    fullName: string;
    code: string;
    bookRole: string;
}

export interface BookExternalContributorPublic {
    id: string;
    fullName: string;
    email?: string | null;
    bookRole: string;
}

export interface BookDisciplinePublic {
    id: string;
    code: string;
    name: string;
}

export interface BookPublicDetail {
    id: string;
    title: string;
    describe: string;
    publishYear: string;
    publisher?: string | null;
    isbn?: string | null;
    detailUrl?: string | null;
    internalContributors: BookInternalContributorPublic[];
    externalContributors: BookExternalContributorPublic[];
    disciplines: BookDisciplinePublic[];
}
