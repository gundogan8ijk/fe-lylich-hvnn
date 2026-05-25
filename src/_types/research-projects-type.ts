import { ConfirmedStatus } from "@/constants/base-constant"
import { EvaluationResultName, ProjectStatusName } from "@/constants/project-contant"

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