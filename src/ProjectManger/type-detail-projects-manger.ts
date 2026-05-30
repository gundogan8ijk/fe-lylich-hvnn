import { ConfirmedStatus } from "@/constants/base-constant";
import { EvaluationResultName, ProjectStatusName } from "@/constants/project-constant";

export type ProjectManagerDetailRecord = {
    id: string;
    baseInfo: ProjectBasicInfoRecord;
    code: string;
    confirmed: ConfirmedStatus;
    status: ProjectStatusName;
    creator: string;
    level: string;
    lastModify: string;
    evaluation: EvaluationResultName;
    permissions: ProjectManagerPermissionsRecord;
    fundings: ProjectFundingItemRecord[];
    contributors: ProjectContributorRecord[];
    participants: ProjectParticipantRecord[];
    certificateUrl?: string | null;
    detailUrl?: string | null;
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
    canUpdateConfirmed: boolean;
    canUpdateStatus: boolean;
    canUpdateTimeEnd: boolean;
    canUpdateEvaluation: boolean;
    canUpdateCertificateUrl: boolean;
    canUpdateDetailUrl: boolean;
    canUpdateFundings: boolean;
    canUpdateContributors: boolean;
    canDeleteProject: boolean;
    maxFundings: number;
    maxContributors: number;
    maxParticipants: number;
    maxDisciplines: number;
};