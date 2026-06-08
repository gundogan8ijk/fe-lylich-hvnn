import { ConfirmedStatus } from "@/_constants/base-constant";
import { EvaluationResultName, ProjectStatusName } from "@/_constants/project-constant";

// Sub-types
export type ProjectContributor = {
    id: string;
    lecturerId: string;
    fullName: string;
    code: string;
    status: string; // "Leader" | "CoreTeam"
    joinedAt: string;
};

export type ProjectParticipant = {
    id: string;
    fullName: string;
    email: string | null;
    role: string; // "Support" | "Collaborator" | "Consultant"
    joinedAt: string;
};

export type ProjectDiscipline = {
    id: string;
    code: string;
    name: string;
};

export type ProjectFunding = {
    source: string;
    amount: number;
    description: string;
};

// Main detail type
export type ProjectDetail = {
    id: string;
    code: string;
    title: string;
    describe: string;
    confirmedStatus: ConfirmedStatus;
    projectStatus: ProjectStatusName;
    level: string;
    evaluation: EvaluationResultName;
    timeStart: string | null;
    timeEnd: string | null;
    certificateUrl: string | null;
    detailUrl: string | null;
    lastModify: string;
    lecturerCreateId: string | null;
    lecturerCreateName: string;
    contributors: ProjectContributor[];
    participants: ProjectParticipant[];
    disciplines: ProjectDiscipline[];
    fundings: ProjectFunding[];
    isMyCreate: boolean;
    isPublic: boolean;
    maxContributors: number;
    maxParticipants: number;
    maxDisciplines: number;
    maxFundings: number;
};

// Form types
export type UpdateProjectForm = {
    Title?: string;
    Describe?: string;
};

export type AddContributorForm = {
    LecturerId: string;
    JoinedAt: string;
};

export type AddParticipantForm = {
    FullName: string;
    Role: string;
    Email?: string | null;
};

export type UpdateParticipantForm = {
    FullName?: string;
    Role?: string;
    Email?: string | null;
};

export type AddDisciplinesForm = {
    DisciplineIds: string[];
};

export type UpdateDetailLinkForm = {
    DetailLink: string;
};
