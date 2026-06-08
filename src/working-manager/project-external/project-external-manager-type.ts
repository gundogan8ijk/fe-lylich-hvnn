export type ProjectExternalMangerItemResponse = {
    id: string;
    title: string;
    code: string;
    level: string;
    evaluation: string;
    describe: string;
    confirmedStatus: string;
    lastModify: string;
    certificateUrl: string;
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

export type ExternalParticipantDto = {
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

export type ProjectExternalManagerDetailResponse = {
    id: string;
    lecturerCreateId: string;
    createdByName: string;
    title: string;
    describe: string;
    code: string;
    certificateUrl: string;
    organization: string;
    level: string;
    completionAt: string;
    confirmedStatus: string;
    createdAt: string;
    lastModify: string;
    isPublic: boolean;
    detailUrl: string | null;
    evaluation: string;
    internalContributors: InternalContributorDto[];
    externalParticipants: ExternalParticipantDto[];
    disciplines: DisciplineItem[];
    maxContributor: number;
    maxParticipant: number;
    maxDisciplines: number;
};
