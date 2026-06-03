import { AwardLevelName } from "@/_constants/award-constant";
import { ConfirmedStatus } from "@/_constants/base-constant";

export type AwardLecturer = {
    id: string;
    name: string;
    awardDate: string; 
    level: AwardLevelName;
    description: string;
    confirmedStatus: ConfirmedStatus;
    lastModify: string; 
    proofUrl:string;
};