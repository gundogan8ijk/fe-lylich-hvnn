import { ConfirmedStatus } from "@/constants/base-constant";
import { DegreeName } from "@/constants/education-constant";

export type EducationLecturer = {
    id:string;
    graduatedAt: string;
    status: ConfirmedStatus;
    trainingName: string;
    majorName: string;
    degreeValue: number;
    degreeName: DegreeName;
    lastModify:Date
};