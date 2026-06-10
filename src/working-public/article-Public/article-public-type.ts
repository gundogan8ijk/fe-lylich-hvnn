import { Pagination } from "@/_Common/_types/pagination-typeConfig";

export interface ArticlePublicItem {
    id: string;
    title: string;
    describe: string;
    publishedAt: string;
    journalName?: string | null;
    doi?: string | null;
}

export interface ArticlePublicList {
    items: ArticlePublicItem[];
    pagination: Pagination;
}

export interface ArticleInternalContributorPublic {
    id: string;
    lecturerId: string;
    fullName: string;
    code: string;
    articleRole: string;
}

export interface ArticleExternalContributorPublic {
    id: string;
    fullName: string;
    email?: string | null;
    articleRole: string;
}

export interface ArticleDisciplinePublic {
    id: string;
    code: string;
    name: string;
}

export interface ArticlePublicDetail {
    id: string;
    title: string;
    describe: string;
    publishedAt: string;
    journalName?: string | null;
    doi?: string | null;
    detailUrl?: string | null;
    internalContributors: ArticleInternalContributorPublic[];
    externalContributors: ArticleExternalContributorPublic[];
    disciplines: ArticleDisciplinePublic[];
}
