// ── Types ──────────────────────────────────────────────────────────────────
export type ArticleContributorRoleName = 'MainAuthor' | 'CoAuthor'
export type ArticleContributorRoleDisplay = 'Tác giả chính' | 'Đồng tác giả' 

export const ArticleContributorRole_OPTIONS: { value: ArticleContributorRoleName; label: ArticleContributorRoleDisplay }[] = [
    { value: 'MainAuthor', label: 'Tác giả chính' },
    { value: 'CoAuthor', label: 'Đồng tác giả' },
]

    // ── Modal Keys ─────────────────────────────────────────────────────────────
export const MODAL_Article_KEYS = {
    REGISTER: "article.register",
    UPDATE: "article.update",
    DELETE: "article.delete",
} as const