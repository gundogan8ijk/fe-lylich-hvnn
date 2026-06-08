'use client'

import { useState } from 'react'
import { storeProjectDetail } from '@/working-Lecturer/Project-Detail/Project-Detail-store'
import { Badge } from '@/_components/ui/badge'
import { Calendar, ExternalLink, Award, ShieldCheck, FileText, UserCheck, Users, Tag, Wallet, CheckCircle2, XCircle, Edit3 } from 'lucide-react'
import { getLabel, getDateOnly } from '@/_lib/display-variable-helper'
import UpdateDetailLinkDialog from './UpdateDetailLinkDialog'
import { STATUS_LABELS, ConfirmedStatus } from '@/_constants/base-constant'
import { ProjectStatus_OPTIONS, EvaluationResult_OPTIONS } from '@/_constants/project-constant'

export const STATUS_COLOR: Record<ConfirmedStatus | string, string> = {
    Draft: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    Pending: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50',
    Confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50',
    Rejected: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50',
    Cancelled: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    Completed: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50',
    UnderReview: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50'
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-slate-100 last:border-0 dark:border-slate-800">
            <span className="text-sm font-medium text-slate-500 shrink-0 sm:w-32 dark:text-slate-400">{label}</span>
            <div className="text-sm text-slate-900 font-medium dark:text-slate-100">{value}</div>
        </div>
    )
}

export default function ProjectInfoSection() {
    const { data: detail } = storeProjectDetail()
    const [editLinkOpen, setEditLinkOpen] = useState(false)

    if (!detail) return null

    const canUpdateLink = detail.isMyCreate && ['Excellent', 'Good', 'Pass'].includes(detail.evaluation || '')

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <UpdateDetailLinkDialog 
                open={editLinkOpen} 
                onOpenChange={setEditLinkOpen} 
                project={detail} 
            />
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm dark:bg-[#0F172A] dark:border-slate-800">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Thông tin đề tài</h2>
                    <InfoRow label="Tên đề tài" value={detail.title} />
                    <InfoRow label="Mô tả" value={
                        <span className="text-slate-600 leading-relaxed whitespace-pre-line dark:text-slate-300">{detail.describe || '—'}</span>
                    } />
                    <InfoRow label="Cấp độ" value={<Badge variant="outline" className="font-mono text-xs border-slate-200 dark:border-slate-700">{detail.level || '—'}</Badge>} />
                    <InfoRow label="Đánh giá" value={
                        detail.evaluation ? (
                            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                                <Award className="w-4 h-4" /> {getLabel(EvaluationResult_OPTIONS, detail.evaluation) || detail.evaluation}
                            </span>
                        ) : '—'
                    } />
                </div>

                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm dark:bg-[#0F172A] dark:border-slate-800">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Thời gian & Tài liệu</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">Bắt đầu</span>
                            <span className="text-sm text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {getDateOnly(detail.timeStart) ?? <span className="text-slate-400 italic">Chưa có</span>}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">Kết thúc</span>
                            <span className="text-sm text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {getDateOnly(detail.timeEnd) ?? <span className="text-slate-400 italic">Chưa có</span>}
                            </span>
                        </div>
                    </div>

                    {detail.certificateUrl && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <a href={detail.detailUrl ?? undefined} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
                                <ShieldCheck className="w-4 h-4" /> Xem chứng chỉ hoàn thành
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    )}
                    
                    {(detail.detailUrl || canUpdateLink) && (
                        <div className={`mt-2 flex items-center justify-between ${!detail.certificateUrl ? 'pt-4 border-t border-slate-100 dark:border-slate-800' : ''}`}>
                            {detail.detailUrl ? (
                                <a href={detail.certificateUrl ?? undefined} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                    <FileText className="w-4 h-4" /> Đường dẫn tài liệu chi tiết
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            ) : (
                                <span className="text-sm text-slate-400 italic">Chưa có tài liệu chi tiết</span>
                            )}
                            
                            {canUpdateLink && (
                                <button
                                    onClick={() => setEditLinkOpen(true)}
                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:hover:bg-blue-900/30 dark:hover:text-blue-400 cursor-pointer"
                                    title="Cập nhật đường dẫn tài liệu"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm dark:bg-[#0F172A] dark:border-slate-800">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Thống kê</h2>
                    <div className="space-y-3">
                        {[
                            { label: 'Thành viên', value: `${detail.contributors.length}/${detail.maxContributors}`, icon: UserCheck },
                            { label: 'Người tham gia', value: `${detail.participants.length}/${detail.maxParticipants}`, icon: Users },
                            { label: 'Lĩnh vực', value: `${detail.disciplines.length}/${detail.maxDisciplines}`, icon: Tag },
                            { label: 'Nguồn kinh phí', value: `${detail.fundings.length}/${detail.maxFundings}`, icon: Wallet },
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 dark:border-slate-800">
                                <span className="flex items-center gap-2 text-xs text-slate-400">
                                    <Icon className="w-3.5 h-3.5" /> {label}
                                </span>
                                <span className="font-mono text-xs text-slate-600 dark:text-slate-300">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm dark:bg-[#0F172A] dark:border-slate-800">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Trạng thái</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 w-24">Xác nhận</span>
                            <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_COLOR[detail.confirmedStatus] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                {STATUS_LABELS[detail.confirmedStatus] || detail.confirmedStatus}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 w-24">Tiến độ</span>
                            <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_COLOR[detail.projectStatus] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                {getLabel(ProjectStatus_OPTIONS, detail.projectStatus) || detail.projectStatus}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-xs text-slate-400 w-24">Công khai</span>
                            {detail.isPublic
                                ? <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" />Có</span>
                                : <span className="flex items-center gap-1 text-xs text-slate-400"><XCircle className="w-3.5 h-3.5" />Không</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
