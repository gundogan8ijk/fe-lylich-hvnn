'use client'

import { Card } from "@/components/ui/card"
import { FileText } from 'lucide-react'
import { InlineEditField } from "@/components/custom/from-input/inline-edit-field"
import { EvaluationResult_OPTIONS, EvaluationResultName, ProjectStatus_OPTIONS, ProjectStatusName } from "@/constants/project-constant"
import { InlineEditShell } from "@/components/custom/inline-edit-shell.tsx"
import { Button } from "@/components/ui/button"
import { storeProjectManagerDetail } from "@/ProjectManger/store-detail-project-manger"



export default function ContentProjectResultManger() {
    const data = storeProjectManagerDetail((s) => s.data)

    if (!data) return null

    return (
        <Card className="border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 rounded-2xl p-5 ">

            {/* Tiêu đề Card */}
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-50 dark:border-slate-900 pb-3">
                <span className="w-1.5 h-3 bg-amber-500 rounded-full" /> Chi tiết & kết quả
            </h3>

            <InlineEditField
                readOnly={!data.permissions.canUpdateDetailUrl}
                label="Link chi tiết đề tài"
                value={data.detailUrl}
                icon={<FileText className="h-4 w-4" />}
                onSave={(() => { })}
                onDelete={(() => { })}
            />

            {
                data.permissions.canUpdateStatus &&
                <InlineEditProjectStatus
                    label="tiến độ"
                    value={data.status}
                    onSave={() => { }}
                    readOnly={!data.permissions.canUpdateStatus}
                />
            }

            {
                true &&
                <InlineEditEvaluationResult
                    label="kết quả"
                    value={data.evaluation}
                    onSave={() => { }}
                    //readOnly={!data.permissions.canUpdateStatus}
                />
            }
        </Card>
    )
}


interface PropsProjectStatus {
    label: string
    value: ProjectStatusName
    onSave: (value: ProjectStatusName) => void
    icon?: React.ReactNode
    readOnly?: boolean
}

export function InlineEditProjectStatus({ label, value, onSave, icon, readOnly }: PropsProjectStatus) {
    const displayLabel = ProjectStatus_OPTIONS.find(o => o.value === value)?.label ?? value

    return (
        <InlineEditShell<ProjectStatusName>
            label={label}
            value={displayLabel}
            icon={icon}
            initialEditValue={value}
            onSave={onSave}
            isEqual={(current) => current === value}    
            readOnly={readOnly}
            renderInput={(editValue, setEditValue) => (
                <div className="flex flex-wrap gap-2">
                    {ProjectStatus_OPTIONS.map(option => (
                        <Button
                            key={option.value}
                            type="button"
                            variant={editValue === option.value ? 'default' : 'outline'}
                            onClick={() => setEditValue(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            )}
        />
    )
}


interface PropsEvaluation {
    label: string
    value: EvaluationResultName
    onSave: (value: EvaluationResultName) => void
    icon?: React.ReactNode
    readOnly?: boolean
}

export function InlineEditEvaluationResult({ label, value, onSave, icon, readOnly }: PropsEvaluation) {
    const displayLabel = EvaluationResult_OPTIONS.find(o => o.value === value)?.label ?? value

    return (
        <InlineEditShell<EvaluationResultName>
            label={label}
            value={displayLabel}
            icon={icon}
            initialEditValue={value}
            onSave={onSave}
            isEqual={(current) => current === value}
            readOnly={readOnly}
            renderInput={(editValue, setEditValue) => (
                <div className="flex flex-wrap gap-2">
                    {EvaluationResult_OPTIONS
                        .filter(o => o.value !== 'NotSet')  // ẩn NotSet khi edit
                        .map(option => (
                            <Button
                                key={option.value}
                                type="button"
                                variant={editValue === option.value ? 'default' : 'outline'}
                                onClick={() => setEditValue(option.value)}
                            >
                                {option.label}
                            </Button>
                        ))}
                </div>
            )}
        />
    )
}