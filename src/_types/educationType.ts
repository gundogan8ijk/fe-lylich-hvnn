import { ConfirmedStatus } from "@/constants/base-constant";
import { DegreeName } from "@/constants/education-constan";

export type Education = {
    id:string;
    graduatedAt: string;
    status: ConfirmedStatus;
    trainingName: string;
    majorName: string;
    degreeValue: number;
    degreeName: DegreeName;
    lastModify:Date
};