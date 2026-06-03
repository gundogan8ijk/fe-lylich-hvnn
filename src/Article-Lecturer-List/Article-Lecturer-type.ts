import { ConfirmedStatus } from "@/_constants/base-constant"


// ── Item Type ──────────────────────────────────────────────────────────────
export type ArticleLecturerItem = {
    id: string
    title: string
    confirmedStatus: ConfirmedStatus
    lastModify: string
    proofDocumentUrl: string
    isMyCreate: boolean
}

