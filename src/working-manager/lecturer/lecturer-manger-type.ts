import { Pagination } from "@/_Common/_types/pagination-typeConfig";

export type LecturerItemByMangerDto = {
    lecturerId: string;
    lecturerCode: string;
    fullName: string;
    cccd: string;
    isPublic: boolean;
    avatarUrl?: string;
    departmentId?: string;
    departmentName?: string;
    disciplineId?: string;
    disciplineName?: string;
};

export type CreateLecturerRequest = {
    lastName: string;
    firstName: string;
    gender: number;
    birthday: string;
    citizenIdentificationCard: string;
};

export type LecturerListPublic = {
    items: LecturerItemByMangerDto[];
    pagination: Pagination;
};

export interface BackgroundByManagerResponse {
    lecturerId: string;
    isPublic: boolean;
    code: string;
    fullName: string;
    gender: string;
    birthDate: string;
    cccd: string;
    phoneNumber: string | null;
    address: string | null;
    email: string | null;
    avatarUrl: string | null;
    department: DepartmentRecord | null;
    discipline: DisciplineRecord | null;
    educations: EducationRecord[];
    awards: AwardRecord[];
    teachingSubjects: TeachingSubjectRecord[];
    teachingExternalSubjects: TeachingExternalSubjectRecord[];
    books: BookRecord[];
    articles: ArticleRecord[];
    projectExternals: ProjectExternalRecord[];
    projects: ProjectRecord[];
}

export interface DepartmentRecord {
    departmentId: string;
    departmentName: string;
    departmentCode: string;
}

export interface DisciplineRecord {
    disciplineId: string;
    disciplineCode: string;
    disciplineName: string;
}

export interface EducationRecord {
    educationId: string;
    graduatedAt: string;
    trainingName: string;
    majorName: string;
    confirmedStatus: string;
}

export interface AwardRecord {
    awardId: string;
    awardsName: string;
    awardDate: string;
    level: string;
    confirmedStatus: string;
}

export interface TeachingSubjectRecord {
    courseId: string;
    name: string;
}

export interface TeachingExternalSubjectRecord {
    courseId: string;
    name: string;
}

export interface BookRecord {
    bookId: string;
    title: string;
    publishYear: string;
    confirmedStatus: string;
}

export interface ArticleRecord {
    articleId: string;
    title: string;
    publishedAt: string;
    confirmedStatus: string;
}

export interface ProjectExternalRecord {
    projectId: string;
    title: string;
    code: string;
    level: string;
    completionAt: string;
    evaluation: string;
    confirmedStatus: string;
}

export interface ProjectRecord {
    projectId: string;
    title: string;
    code: string;
    level: string;
    completionAt: string;
    evaluation: string;
    confirmedStatus: string;
    status: string;
}
