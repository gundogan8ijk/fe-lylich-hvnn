// ==============================
// Book Contributor Role
// ==============================
export const BOOK_CONTRIBUTOR_ROLE_OPTIONS = [
    { value: 'MainAuthor', label: 'Tác giả chính' },
    { value: 'CoAuthor', label: 'Đồng tác giả' },
    { value: 'EditorInChief', label: 'Chủ biên' },
] as const;

// ==============================
// Modal Keys
// ==============================
export const MODAL_BOOK_KEYS = {
    REGISTER: 'book.register',
    UPDATE: 'book.update',
    DELETE: 'book.delete',
    ADD_CONTRIBUTOR: 'book.addContributor',
    ADD_EXTERNAL_CONTRIBUTOR: 'book.addExternalContributor',
    UPDATE_EXTERNAL_CONTRIBUTOR: 'book.updateExternalContributor',
    ADD_DISCIPLINE: 'book.addDiscipline',
} as const;

export type BookContributorRoleName = 'MainAuthor' | 'CoAuthor' | 'EditorInChief';
