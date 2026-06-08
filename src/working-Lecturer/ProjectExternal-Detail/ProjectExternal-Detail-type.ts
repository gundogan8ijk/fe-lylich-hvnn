import { ConfirmedStatus } from "@/_constants/base-constant";
import { LevelProjectName } from "@/_constants/project-constant";
import { ProjectExternalMemberRoleName } from "@/_constants/ProjectExternal-constant";


export type ProjectExternalDetail = {
    id: string;
    createdById: string;
    createdByName: string;
    title: string;
    describe: string;
    code: string;
    certificateUrl: string;
    organization: string;
    level: LevelProjectName;
    completionAt: string;
    confirmedStatus: ConfirmedStatus;
    createdAt: string;
    lastModify: string;
    isMyCreate: boolean;
    isPublic: boolean;
    detailUrl?: string;
    lecturerCreateId?: string;
    evaluation: string;
    internalContributors: InternalContributor[];
    externalParticipants: ExternalParticipant[];
    disciplines: Discipline[];
    maxContributor: number;
    maxParticipant: number;
    maxDisciplines: number;
};

export type InternalContributor = {
    id: string;
    lecturerId: string;
    role: ProjectExternalMemberRoleName;
    fullName: string;
    code: string;
};

export type ExternalParticipant = {
    id: string;
    fullName: string;
    email?: string;
    role: ProjectExternalMemberRoleName;
};

export type Discipline = {
    id: string;
    code: string;
    name: string;
};

export type AddInternalContributorForm = {
    lecturerId: string;
    role: ProjectExternalMemberRoleName;
};

export type AddExternalParticipantForm = {
    fullName: string;
    role: ProjectExternalMemberRoleName;
    email?: string;
};

export type UpdateExternalParticipantForm = {
    fullName: string;
    role: ProjectExternalMemberRoleName;
    email?: string;
};

export type UpdateProjectExternalForm = {
    title: string;
    describe: string;
    certificateUrl?: string;
    organization: string;
    completionAt: string;
    level: string;
    evaluation?: string;
    detailUrl?: string;
};