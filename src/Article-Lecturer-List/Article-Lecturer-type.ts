import { ConfirmedStatus } from "@/_constants/base-constant"


// ── Item Type ──────────────────────────────────────────────────────────────
export type ArticleLecturerItem = {
    id: string
    title: string
    describe: string            
    confirmedStatus: ConfirmedStatus 
    lastModify: string
    proofDocumentUrl: string
    isMyCreate: boolean
    isPublic: boolean
}
