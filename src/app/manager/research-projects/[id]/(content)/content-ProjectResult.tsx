'use client'

import { Card } from "@/_components/ui/card"
import { FileText, ShieldCheck } from 'lucide-react'
import { InlineUploadPdfField } from "@/_components/custom/from-input/inline-pdf-upload-field"
import { InlineEditField } from "@/_components/custom/from-input/inline-edit-field"
import { EvaluationResult_OPTIONS, EvaluationResultName, ProjectStatus_OPTIONS, ProjectStatusName } from "@/_constants/project-constant"
import { InlineEditShell } from "@/_components/custom/inline-edit-shell.tsx"
import { Button } from "@/_components/ui/button"
import { storeProjectManagerDetail } from "@/working-manager/ProjectManger/store-detail-project-manger"
import { useState } from "react"
import DeleteConfirmDialog from "@/_components/custom/DeleteConfirmDialog"
import { 
    updateProjectStatusAction, 
    updateProjectEvaluationAction,
    updateCertificateUrlAction, 
    deleteCertificateUrlAction, 
    updateDetailUrlAction, 
    deleteDetailUrlAction 
} from "@/working-manager/ProjectManger/hook-projects-manger"

export default function ContentProjectResultManger() {
    const data = storeProjectManagerDetail((s) => s.data)
    const isDeleting = storeProjectManagerDetail((s) => s.isDeleting)
    const [isDeleteCertOpen, setIsDeleteCertOpen] = useState(false)
    const [isDeleteDetailOpen, setIsDeleteDetailOpen] = useState(false)

    if (!data) return null

    const handleDeleteCert = async () => {
        await deleteCertificateUrlAction()
        setIsDeleteCertOpen(false)
    }

    const handleDeleteDetail = async () => {
        await deleteDetailUrlAction()
        setIsDeleteDetailOpen(false)
    }

    return (
        <Card className="border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 rounded-2xl p-5 ">

            {/* Tiêu đề Card */}
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-50 dark:border-slate-900 pb-3">
                <span className="w-1.5 h-3 bg-amber-500 rounded-full" /> Chi tiết & tiến độ
            </h3>

            {/* Tiến độ (Status) with explicit action buttons */}
            <div className="py-3 flex items-center justify-between border-b border-slate-50 dark:border-slate-900 last:border-0">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 min-w-[100px]">Tiến độ</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {ProjectStatus_OPTIONS.find(o => o.value === data.status)?.label ?? data.status}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {/* Bắt đầu thực hiện */}
                    {data.confirmed === "Verified" && data.status === "Pending" && data.baseInfo.timeRange?.start && (new Date(data.baseInfo.timeRange.start).setHours(0,0,0,0) <= new Date().setHours(0,0,0,0)) && (
                        <Button size="sm" variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50" onClick={() => updateProjectStatusAction("InProgress")}>
                            Bắt đầu thực hiện
                        </Button>
                    )}
                    {/* Gửi nghiệm thu */}
                    {data.status === "InProgress" && (
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => updateProjectStatusAction("UnderReview")}>
                            Gửi nghiệm thu
                        </Button>
                    )}
                    {/* Hoàn thành */}
                    {data.status === "UnderReview" && (
                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50" onClick={() => updateProjectStatusAction("Completed")}>
                            Hoàn thành
                        </Button>
                    )}
                    {/* Hủy đề tài */}
                    {data.status === "InProgress" && (
                        <Button size="sm" variant="destructive" className="bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200" onClick={() => updateProjectStatusAction("Cancelled")}>
                            Hủy đề tài
                        </Button>
                    )}
                </div>
            </div>

            <InlineEditEvaluationResult
                label="kết quả"
                value={data.evaluation}
                onSave={updateProjectEvaluationAction}
                readOnly={!data.permissions.canUpdateEvaluation}
            />

            {/* Tài liệu & Chứng nhận (only shows if Evaluation is not NotSet and not Fail) */}
            {data.evaluation?.toLowerCase() !== "notset" && data.evaluation?.toLowerCase() !== "fail" && (
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Tài liệu & Chứng nhận</h4>
                    
                    <InlineUploadPdfField
                        readOnly={!data.permissions.canUpdateCertificateUrl}
                        label="Đường dẫn chứng chỉ hoàn thành"
                        value={data.certificateUrl}
                        icon={<ShieldCheck className="h-4 w-4" />}
                        onSave={updateCertificateUrlAction}
                        onDelete={() => setIsDeleteCertOpen(true)}
                    />

                    <InlineEditField
                        readOnly={!data.permissions.canUpdateDetailUrl}
                        label="Đường dẫn tài liệu chi tiết đề tài"
                        value={data.detailUrl}
                        icon={<FileText className="h-4 w-4" />}
                        onSave={updateDetailUrlAction}
                        onDelete={() => setIsDeleteDetailOpen(true)}
                    />
                </div>
            )}

            <DeleteConfirmDialog
                open={isDeleteCertOpen}
                deleting={isDeleting}
                description="Đường dẫn chứng chỉ hoàn thành sẽ bị xóa."
                onConfirm={handleDeleteCert}
                onCancel={() => setIsDeleteCertOpen(false)}
            />

            <DeleteConfirmDialog
                open={isDeleteDetailOpen}
                deleting={isDeleting}
                description="Đường dẫn tài liệu chi tiết đề tài sẽ bị xóa."
                onConfirm={handleDeleteDetail}
                onCancel={() => setIsDeleteDetailOpen(false)}
            />

        </Card>
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