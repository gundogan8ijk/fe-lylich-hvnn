import { ConfirmedStatus } from "@/_constants/base-constant"

// ── Contributor Role Type ─────────────────────────────────────────────────
export type ArticleContributorRoleName = 'MainAuthor' | 'CoAuthor'

// ── Item Type ──────────────────────────────────────────────────────────────
export type ArticleDetailItem = {
    id: string
    createdById: string
    createdByName:string
    title: string
    describe: string   
    publishedAt: string
    confirmedStatus: ConfirmedStatus
    createdAt: string
    lastModify: string
    proofDocumentUrl: string
    isMyCreate: boolean
    isPublic: boolean
    doi?: string
    journalName?: string
    detailUrl?: string
    lectureCreateId?: string
    internalContributors: InternalContributor[]
    externalContributors: ExternalContributor[]
    disciplines: Discipline[] 
    maxContributor: number 
    maxDisciplines: number
}

export type InternalContributor = {
    id: string
    lecturerId: string
    role: ArticleContributorRoleName
    fullName: string
    code: string
}

export type ExternalContributor = {
    id: string
    fullName: string
    email?: string
    role: ArticleContributorRoleName
}

export type Discipline = {
    id: string
    code: string
    name: string
}

export type AddInternalContributorForm = {
    lecturerId: string
    role: ArticleContributorRoleName
}

export type AddExternalContributorForm = {
    fullName: string
    role: ArticleContributorRoleName
    email?: string
}

export type UpdateExternalContributorForm = {
    fullName: string
    role: ArticleContributorRoleName
    email?: string
}

export type SubmitArticleForm = {
    id: string
}

export type DeleteArticleForm = {
    id: string
}


export type UpdateArticleByLecturerForm = {
    title: string
    describe: string     
    publishedAt: string
    proofUrl?: string
    journalName?: string
    doi?: string
    detailUrl?: string
}