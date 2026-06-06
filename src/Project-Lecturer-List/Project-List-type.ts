import { ConfirmedStatus } from "@/_constants/base-constant";
import { EvaluationResultName, ProjectStatusName } from "@/_constants/project-constant";

export type ProjectItem = {
    id: string;
    code: string;
    title: string;
    describe: string;
    confirmedStatus: ConfirmedStatus;
    projectStatus: ProjectStatusName;
    evaluation: EvaluationResultName;
    lastModify: string;
    isMyCreate: boolean;
};

export type RegisterProjectForm = {
    Title: string;
    Describe: string;
    DisciplineIds: string[];
};
