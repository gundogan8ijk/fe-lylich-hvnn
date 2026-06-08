export type BookMangerItemResponse = {
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

export type BookManagerDetailResponse = {
    id: string;
    createdById: string;
    createdByName: string;
    title: string;
    describe: string;
    publishYear: string;
    confirmedStatus: string;
    createdAt: string;
    lastModify: string;
    proofDocumentUrl: string;
    isPublic: boolean;
    publisher: string | null;
    isbn: string | null;
    detailUrl: string | null;
    lecturerCreateId: string | null;
    internalContributors: InternalContributorDto[];
    externalContributors: ExternalContributorDto[];
    disciplines: DisciplineItem[];
    maxContributor: number;
    maxDisciplines: number;
};
