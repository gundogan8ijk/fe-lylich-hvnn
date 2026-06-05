import { ConfirmedStatus } from "@/_constants/base-constant";
import { BookContributorRoleName } from "@/_constants/Book-constant";


export type BookInternalContributor = {
    id: string;
    lecturerId: string;
    role: BookContributorRoleName;
    fullName: string;
    code: string;
};

export type BookExternalContributor = {
    id: string;
    fullName: string;
    email?: string;
    role: BookContributorRoleName;
};

export type BookDiscipline = {
    id: string;
    code: string;
    name: string;
};

export type BookDetail = {
    id: string;
    createdById: string;
    createdByName: string;
    title: string;
    describe: string;
    publishYear: string; // YYYY-MM-DD
    confirmedStatus: ConfirmedStatus;
    createdAt: string; // YYYY-MM-DD
    lastModify: string;
    proofDocumentUrl: string;
    isMyCreate: boolean;
    isPublic: boolean;
    publisher?: string;
    isbn?: string;
    detailUrl?: string;
    lecturerCreateId?: string;
    internalContributors: BookInternalContributor[];
    externalContributors: BookExternalContributor[];
    disciplines: BookDiscipline[];
    maxContributor: number;
    maxDisciplines: number;
};


export type UpdateBookForm = {
    title: string;
    describe: string;
    publisher?: string;
    publishYear: string;
    proofUrl?: string;
    isbn?: string;
    detailUrl?: string;
};

export type AddInternalContributorForm = {
    lecturerId: string;
    role: BookContributorRoleName;
};

export type AddExternalContributorForm = {
    fullName: string;
    role: BookContributorRoleName;
    email?: string;
};

export type UpdateExternalContributorForm = {
    fullName: string;
    role: BookContributorRoleName;
    email?: string;
};