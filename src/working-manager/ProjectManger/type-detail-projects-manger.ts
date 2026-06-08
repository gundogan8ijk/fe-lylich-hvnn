import { ConfirmedStatus } from "@/_constants/base-constant";
import { EvaluationResultName, LevelProjectName, ProjectStatusName } from "@/_constants/project-constant";

export type ProjectManagerDetailRecord = {
    id: string;
    baseInfo: ProjectBasicInfoRecord;
    code: string;
    confirmed: ConfirmedStatus;
    status: ProjectStatusName;
    creator: string;
    level: LevelProjectName;
    lastModify: string;
    evaluation: EvaluationResultName;
    permissions: ProjectManagerPermissionsRecord;
    funding: ProjectFundingItemRecord[];
    contributors: ProjectContributorRecord[];
    participants: ProjectParticipantRecord[];
    certificateUrl?: string | null;
    detailUrl?: string | null;
    isPublic: boolean;
};

export type ProjectBasicInfoRecord = {
    title: string;
    describe: string;
    timeRange?: ProjectTimeRangeRecord | null;
    disciplines: ProjectDisciplineRecord[];
};

export type ProjectTimeRangeRecord = {
    start: string;
    end: string;
};

export type ProjectDisciplineRecord = {
    id: string;
    code: string;
    name: string;
};

export type ProjectFundingItemRecord = {
    source: string;
    description: string;
    amount: number;
};

export type ProjectContributorRecord = {
    status: string;
    joinedAt: string;
    id: string;
    code: string;
    name: string;
};

export type ProjectParticipantRecord = {
    id: string;
    name: string;
    joinedAt: string;
    role: string;
    email?: string | null;
};

export type ProjectManagerPermissionsRecord = {
    canUpdateBase: boolean;
    canTogglePublic: boolean;
    canUpdateTimeAndLevel: boolean;
    canUpdateConfirmed: boolean;
    canUpdateStatus: boolean;
    canUpdateTimeEnd: boolean;
    canUpdateEvaluation: boolean;
    canUpdateCertificateUrl: boolean;
    canUpdateDetailUrl: boolean;
    canUpdateFunding: boolean;
    canUpdateContributors: boolean;
    canDeleteProject: boolean;
    maxFunding: number;
    maxContributors: number;
    maxParticipants: number;
    maxDisciplines: number;
};