export type ArticleMangerItemResponse = {
    id: string;
    title: string;
    describe: string;
    confirmedStatus: string;
    lastModify: string;
    proofDocumentUrl: string;
    lecturerCreateId: string;
    lecturerCode: string;
    fullName: string;
    isPublic: boolean;
};

export type InternalContributorDto = {
    id: string;
    lecturerId: string;
    role: string;
    fullName: string;
    code: string;
};

export type ExternalContributorDto = {
    id: string;
    fullName: string;
    email: string | null;
    role: string;
};

export type DisciplineItem = {
    id: string;
    code: string;
    name: string;
};

export type ArticleManagerDetailResponse = {
    id: string;
    createdById: string;
    createdByName: string;
    title: string;
    describe: string;
    publishedAt: string;
    confirmedStatus: string;
    createdAt: string;
    lastModify: string;
    proofDocumentUrl: string;
    isPublic: boolean;
    doi: string | null;
    journalName: string | null;
    detailUrl: string | null;
    lectureCreateId: string | null;
    internalContributors: InternalContributorDto[];
    externalContributors: ExternalContributorDto[];
    disciplines: DisciplineItem[];
    maxContributor: number;
    maxDisciplines: number;
};
