import { Pagination } from "@/_Common/_types/pagination-typeConfig";
import { ConfirmedStatus } from "@/_constants/base-constant";
import { LevelProjectName, ProjectStatusName } from "@/_constants/project-constant";

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