import { ConfirmedStatus } from "@/_constants/base-constant";

export type BookItem = {
    id: string;
    title: string;
    describe: string;
    confirmedStatus: ConfirmedStatus;
    lastModify: string;
    proofDocumentUrl: string;
    isMyCreate: boolean;
    isPublic: boolean;
};