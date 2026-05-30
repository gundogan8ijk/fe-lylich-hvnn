import { Pagination } from "@/_types/pagination-typeConfig";
import { ConfirmedStatus } from "@/constants/base-constant";
import { LevelProjectName, ProjectStatusName } from "@/constants/project-constant";

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