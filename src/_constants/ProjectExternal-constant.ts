export type ProjectExternalMemberRoleName =
    | 'CoreTeam'
    | 'Leader'
    | 'Community'
    | 'Support';

export type ProjectLevelName =
    | 'Institutional'
    | 'National'
    | 'Provincial'
    | 'Ministerial';

export type EvaluationProjectExternalName =
    | 'NotSet'
    | 'Excellent'
    | 'Good'
    | 'Pass';

export const PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS: {
    value: ProjectExternalMemberRoleName;
    label: string;
}[] = [
    { value: 'CoreTeam', label: 'Thành viên chính' },
    { value: 'Leader', label: 'Chủ nhiệm' },
    { value: 'Community', label: 'Cộng đồng' },
    { value: 'Support', label: 'Hỗ trợ' },
];

export const PROJECT_EXTERNAL_MEMBER_ROLE_LABELS: Record<ProjectExternalMemberRoleName, string> = {
    CoreTeam: 'Thành viên chính',
    Leader: 'Chủ nhiệm',
    Community: 'Cộng đồng',
    Support: 'Hỗ trợ',
};

export const PROJECT_LEVEL_OPTIONS: {
    value: ProjectLevelName;
    label: string;
}[] = [
    { value: 'Institutional', label: 'Trường' },
    { value: 'National', label: 'Quốc gia' },
    { value: 'Provincial', label: 'Tỉnh' },
    { value: 'Ministerial', label: 'Bộ' },
];

export const PROJECT_EXTERNAL_LEVEL_LABELS: Record<ProjectLevelName, string> = {
    Institutional: 'Trường',
    National: 'Quốc gia',
    Provincial: 'Tỉnh',
    Ministerial: 'Bộ',
};

export const EVALUATION_PROJECT_EXTERNAL_OPTIONS: {
    value: EvaluationProjectExternalName;
    label: string;
}[] = [
    { value: 'NotSet', label: 'Chưa đánh giá' },
    { value: 'Excellent', label: 'Xuất sắc' },
    { value: 'Good', label: 'Tốt' },
    { value: 'Pass', label: 'Đạt' },
];

export const EVALUATION_PROJECT_EXTERNAL_LABELS: Record<EvaluationProjectExternalName, string> = {
    NotSet: 'Chưa đánh giá',
    Excellent: 'Xuất sắc',
    Good: 'Tốt',
    Pass: 'Đạt',
};