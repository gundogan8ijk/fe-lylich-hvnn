import { Pagination } from "@/_Common/_types/pagination-typeConfig";

export interface LecturerPublicItem {
    lecturerId: string;
    code: string;
    fullName: string;
    avatarUrl?: string | null;
    departmentName?: string | null;
    disciplineName?: string | null;
}

export interface LecturerPublicList {
    items: LecturerPublicItem[];
    pagination: Pagination;
}

export interface EducationPublic {
    educationId: string;
    graduatedAt: string;
    trainingName: string;
    majorName: string;
    degree: string;
}

export interface AwardPublic {
    awardId: string;
    awardName: string;
    awardDate: string;
    level: string;
}

export interface TeachingSubjectPublic {
    courseId: string;
    name: string;
}

export interface TeachingExternalSubjectPublic {
    courseId: string;
    name: string;
}

export interface BookPublicItem {
    id: string;
    title: string;
    describe: string;
    publishYear: string;
    publisher?: string | null;
    isbn?: string | null;
}

export interface ArticlePublicItem {
    id: string;
    title: string;
    describe: string;
    publishedAt: string;
    journalName?: string | null;
    doi?: string | null;
}

export interface ProjectExternalPublicItem {
    id: string;
    code: string;
    title: string;
    describe: string;
    level: string;
    evaluation: string;
    completionAt: string;
}

export interface ResearchProjectPublicItem {
    id: string;
    code: string;
    title: string;
    describe: string;
    level: string;
    evaluation: string;
    endDate?: string | null;
}

export interface LecturerPublicDetail {
    lecturerId: string;
    code: string;
    fullName: string;
    gender: string;
    birthDate: string;
    phoneNumber?: string | null;
    address?: string | null;
    email?: string | null;
    avatarUrl?: string | null;
    departmentName?: string | null;
    disciplineName?: string | null;
    educations: EducationPublic[];
    awards: AwardPublic[];
    teachingSubjects: TeachingSubjectPublic[];
    teachingExternalSubjects: TeachingExternalSubjectPublic[];
    books: BookPublicItem[];
    articles: ArticlePublicItem[];
    projectExternals: ProjectExternalPublicItem[];
    projects: ResearchProjectPublicItem[];
}
