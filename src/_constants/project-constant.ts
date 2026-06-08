import { FieldFilters } from "@/_Common/_types/query-types";

// ==============================
// ProjectStatus — BE: ProjectStatus
// ==============================
export type ProjectStatusName = 'Pending' | 'InProgress' | 'UnderReview' | 'Completed' | 'Cancelled'

export const PROJECT_STATUS_OPTIONS: { value: ProjectStatusName; label: string }[] = [
    { value: 'Pending', label: 'Chờ duyệt' },
    { value: 'InProgress', label: 'Đang thực hiện' },
    { value: 'UnderReview', label: 'Đang xem xét' },
    { value: 'Completed', label: 'Đã hoàn thành' },
    { value: 'Cancelled', label: 'Đã hủy' },
];

export const PROJECT_STATUS_LABELS: Record<ProjectStatusName, string> = {
    Pending: 'Chờ duyệt',
    InProgress: 'Đang thực hiện',
    UnderReview: 'Đang xem xét',
    Completed: 'Đã hoàn thành',
    Cancelled: 'Đã hủy',
};

// @deprecated — dùng PROJECT_STATUS_OPTIONS thay thế
export const ProjectStatus_OPTIONS = PROJECT_STATUS_OPTIONS;

// ==============================
// EvaluationResult — BE: EvaluationResult
// ==============================
export type EvaluationResultName = 'NotSet' | 'Excellent' | 'Good' | 'Pass' | 'Fail'

export const EVALUATION_RESULT_OPTIONS: { value: EvaluationResultName; label: string }[] = [
    { value: 'NotSet', label: 'Chưa đánh giá' },
    { value: 'Excellent', label: 'Xuất sắc' },
    { value: 'Good', label: 'Tốt' },
    { value: 'Pass', label: 'Đạt' },
    { value: 'Fail', label: 'Không đạt' },
];

export const EVALUATION_RESULT_LABELS: Record<EvaluationResultName, string> = {
    NotSet: 'Chưa đánh giá',
    Excellent: 'Xuất sắc',
    Good: 'Tốt',
    Pass: 'Đạt',
    Fail: 'Không đạt',
};

// @deprecated — dùng EVALUATION_RESULT_OPTIONS thay thế
export const EvaluationResult_OPTIONS = EVALUATION_RESULT_OPTIONS;

// ==============================
// ProjectLevel — BE: ProjectLevel
// ==============================
export type ProjectLevelName = 'Institutional' | 'Ministerial' | 'Provincial' | 'National'

export const PROJECT_LEVEL_OPTIONS: { value: ProjectLevelName; label: string }[] = [
    { value: 'Institutional', label: 'Cấp Trường' },
    { value: 'Ministerial', label: 'Cấp Bộ' },
    { value: 'Provincial', label: 'Cấp Tỉnh' },
    { value: 'National', label: 'Cấp Quốc gia' },
];

export const PROJECT_LEVEL_LABELS: Record<ProjectLevelName, string> = {
    Institutional: 'Cấp Trường',
    Ministerial: 'Cấp Bộ',
    Provincial: 'Cấp Tỉnh',
    National: 'Cấp Quốc gia',
};

// @deprecated — dùng PROJECT_LEVEL_OPTIONS thay thế
export const level_PROJECT_OPTIONS = PROJECT_LEVEL_OPTIONS;
/** @deprecated dùng ProjectLevelName */
export type LevelProjectName = ProjectLevelName;

// ==============================
// ContributorStatus — BE: ContributorStatus
// ==============================
export type ContributorStatusName = 'CoreTeam' | 'Leader'

export const CONTRIBUTOR_STATUS_OPTIONS: { value: ContributorStatusName; label: string }[] = [
    { value: 'CoreTeam', label: 'Thành viên chính' },
    { value: 'Leader', label: 'Chủ nhiệm' },
];

export const CONTRIBUTOR_STATUS_LABELS: Record<ContributorStatusName, string> = {
    CoreTeam: 'Thành viên chính',
    Leader: 'Chủ nhiệm',
};

// ==============================
// ParticipantStatus — BE: ParticipantStatus
// ==============================
export type ParticipantStatusName = 'Community' | 'Support'

export const PARTICIPANT_STATUS_OPTIONS: { value: ParticipantStatusName; label: string }[] = [
    { value: 'Community', label: 'Cộng đồng' },
    { value: 'Support', label: 'Hỗ trợ' },
];

export const PARTICIPANT_STATUS_LABELS: Record<ParticipantStatusName, string> = {
    Community: 'Cộng đồng',
    Support: 'Hỗ trợ',
};

// ==============================
// Sort / Filter helpers
// ==============================
export const ProjectMangerSortOptions = [
    { label: 'Cập nhật', value: 'LastModify' },
    { label: 'Mã dự án', value: 'Code' },
] as const;

export type ProjectMangerSortField = typeof ProjectMangerSortOptions[number]['value'];
export type ProjectManagerFilterField = 'Confirmed' | 'Status' | 'Level'
export type ProjectManagerFilters = FieldFilters<ProjectManagerFilterField>;

// ==============================
// Modal Keys
// ==============================
export const MODAL_Manger_detail_PROJECT_KEYS = {
    UPDATE_BASE: "project.update.base",
    ADD_DISCIPLINE: "project.add.discipline",
    REMOVE_DISCIPLINE: "project.remove.discipline",
    EDIT_END_DATE: "project.edit.end.date"
} as const