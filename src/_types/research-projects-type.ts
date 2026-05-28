import { ConfirmedStatus } from "@/constants/base-constant"
import { EvaluationResultName, LevelProjectName, ProjectStatusName } from "@/constants/project-contant"
import { Pagination } from "./base-type/pagination-typeConfig"

export type ResearchProjectItems = {
    id: string
    code: string
    title: string,
    projectStatus: ProjectStatusName,
    confirmedStatus: ConfirmedStatus,
    evaluation: EvaluationResultName,
    lastModify: string,
    startDate: string | null,
    endDate: string | null
}

export type MangerProjectItems = {
    id: string,
    code: string,
    title: string,
    confirmed: ConfirmedStatus,
    status: ProjectStatusName,
    level: LevelProjectName,
    lastModify: string,
    isMyCreate: boolean,
    canDelete: boolean,
}

export type MangerProjectItemsList = {
    items: MangerProjectItems[];
    pagination: Pagination;
};