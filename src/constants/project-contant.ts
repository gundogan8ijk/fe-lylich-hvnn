import { FieldFilters } from "@/_types/base-type/query-types";

export type ProjectStatusName = 'Pending' | 'InProgress' | 'UnderReview' | 'Completed' | 'Cancelled'
export type ProjectStatusDisplay = 'chưa bắt đầu' | 'tiến hành' | 'xem xét' | 'hoàn thành' | 'đã hủy'


export const ProjectStatus_OPTIONS: { value: ProjectStatusName; label: ProjectStatusDisplay }[] = [
    { value: 'Pending', label: 'chưa bắt đầu' },
    { value: 'InProgress', label: 'tiến hành' },
    { value: 'UnderReview', label: 'xem xét' },
    { value: 'Completed', label: 'hoàn thành' },
    { value: 'Cancelled', label: 'đã hủy' },

]

export type EvaluationResultName = 'NotSet' | 'Excellent' | 'Good' | 'Pass' | 'Fail'
export type EvaluationResultDisplay = 'chưa' | 'Xuất sắc' | 'tốt' | 'đạt' | 'không đạt'


export const EvaluationResult_OPTIONS: { value: EvaluationResultName; label: EvaluationResultDisplay }[] = [
    { value: 'NotSet', label: 'chưa' },
    { value: 'Excellent', label: 'Xuất sắc' },
    { value: 'Good', label: 'tốt' },
    { value: 'Pass', label: 'đạt' },
    { value: 'Fail', label: 'không đạt' },

]


export type LevelProjectName = 'Institutional' | 'National' | 'Provincial' | 'Ministerial'
export type LevelProjectDisplay = | 'Trường' | 'Quốc gia' | 'Tỉnh' | 'Bộ';


export const level_PROJECT_OPTIONS: { value: LevelProjectName; label: LevelProjectDisplay; }[] = [
    { value: 'Institutional', label: 'Trường' },
    { value: 'National', label: 'Quốc gia' },
    { value: 'Provincial', label: 'Tỉnh' },
    { value: 'Ministerial', label: 'Bộ' },
];


export const ProjectMangerSortOptions = [
    {
        label: 'cập nhật',
        value: 'LastModify',
    },

    {
        label: 'Mã dự án',
        value: 'Code',
    },
] as const;

export type ProjectMangerSortField = typeof ProjectMangerSortOptions[number]['value'];

export type ProjectManagerFilterField = 'Confirmed' | 'Status' | 'Level'

export type ProjectManagerFilters =
    FieldFilters<ProjectManagerFilterField>;