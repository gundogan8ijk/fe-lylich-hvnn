export type ProjectStatusName =  'Pending' | 'InProgress' | 'UnderReview' | 'Completed' | 'Cancelled'
export type ProjectStatusDisplay =  'Chờ' | 'tiến hành' | 'xem xét' | 'hoàn thành' | 'đã hủy'


export const ProjectStatus_OPTIONS: { value: ProjectStatusName; label: ProjectStatusDisplay }[] = [
    { value: 'Pending', label: 'Chờ' },
    { value: 'InProgress', label: 'tiến hành'},
    { value: 'UnderReview', label: 'xem xét' },
    { value: 'Completed', label: 'hoàn thành' },
    { value: 'Cancelled', label: 'đã hủy' },
    
]

export type EvaluationResultName =  'NotSet' | 'Excellent' | 'Good' | 'Pass' | 'Fail'
export type EvaluationResultDisplay =  'chưa' | 'Xuất sắc' | 'tốt' | 'đạt' | 'không đạt'


export const EvaluationResult_OPTIONS: { value: EvaluationResultName; label: EvaluationResultDisplay }[] = [
    { value: 'NotSet', label: 'chưa' },
    { value: 'Excellent', label: 'Xuất sắc'},
    { value: 'Good', label: 'tốt' },
    { value: 'Pass', label: 'đạt' },
    { value: 'Fail', label: 'không đạt' },
    
]