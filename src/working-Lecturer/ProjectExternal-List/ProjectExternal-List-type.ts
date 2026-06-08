import { ConfirmedStatus } from "@/_constants/base-constant";
import { LevelProjectName } from "@/_constants/project-constant";

export type ProjectExternalItem = {
    id: string;
    title: string;
    describe: string;
    code: string;
    level: LevelProjectName;
    evaluation: string;
    confirmedStatus: ConfirmedStatus;
    lastModify: string;
    certificateUrl: string;
    isMyCreate: boolean;
    isPublic: boolean;
};