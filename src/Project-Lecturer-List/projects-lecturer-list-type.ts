import { ConfirmedStatus } from "@/constants/base-constant"
import { EvaluationResultName, ProjectStatusName } from "@/constants/project-constant"

export type ProjectLecturerItems = {
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

