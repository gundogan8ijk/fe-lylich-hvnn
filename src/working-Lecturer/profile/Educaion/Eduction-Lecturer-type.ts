import { ConfirmedStatus } from "@/_constants/base-constant";
import { DegreeName } from "@/_constants/education-constant";

export type EducationLecturer = {
    id: string;
    trainingName: string;
    degreeName: DegreeName;
    majorName: string;
    confirmedStatus: ConfirmedStatus;
    graduatedAt: string;
    lastModify: string;
    proofUrl: string;
};