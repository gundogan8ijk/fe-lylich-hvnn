'use client'

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { storeProjectManagerDetail } from "@/stores/store-item/project-DetailManger-store"
import { getDateOnly, getLabel } from "@/lib/display-variable-helper"
import {
    FlaskConical, Calendar, CheckCircle2, User, Layers, Plus
} from 'lucide-react'
import { level_PROJECT_OPTIONS, ProjectStatus_OPTIONS } from '@/constants/project-contant'

export default function ContentProjectInfoManger() {
    const data = storeProjectManagerDetail((s) => s.data)

    if (!data) return null
    const base = data.baseInfo
    const perm = data.permissions

    return (
        <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 rounded-2xl p-6 space-y-6 my-4">

            {/* ─── HEADER SECTION ─────────────────────────────────── */}
            <div className="flex items-start justify-between gap-4 flex-wrap border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider text-slate-400 ">
                        <FlaskConical className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                        <span className="font-mono text-indigo-600 dark:text-indigo-400">{data.code}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="text-slate-500 normal-case">Cập nhật: {getDateOnly(data.lastModify)}</span>
                    </div>

                    <h1 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-50">
                        {base?.title || "Chưa cập nhật tên đề tài"}
                    </h1>

                    <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                        <span className="font-semibold text-slate-800 dark:text-slate-100 mr-3">
                            Mô tả:
                        </span>
                        {base?.describe || "Chưa có mô tả đề tài"}
                    </p>
                </div>

            </div>

            <div className="space-y-6">
                {/* Thẻ thông tin chi tiết */}
                <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 space-y-4 bg-slate-50/50 dark:bg-slate-900/20">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <span className="w-1.5 h-3 bg-indigo-500 rounded-full" /> Thông tin chung
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <InfoCell icon={<FlaskConical />} label="Mã đề tài" value={data.code} className="font-mono text-indigo-600 dark:text-indigo-400" />
                        <InfoCell icon={<User />} label="Người tạo" value={data.creator} />
                        <InfoCell icon={<Layers />} label="Cấp độ" value={getLabel(level_PROJECT_OPTIONS, data.level)} />
                        <InfoCell icon={<CheckCircle2 />} label="tiến độ" value={getLabel(ProjectStatus_OPTIONS, data.status)} isBadge />
                        <InfoCell icon={<Calendar />} label="Ngày bắt đầu" value={getDateOnly(base?.timeRange?.start)} />
                        <InfoCell icon={<Calendar />} label="Ngày kết thúc" value={getDateOnly(base?.timeRange?.end)} />
                    </div>
                </div>

                {/* Thẻ Lĩnh vực nghiên cứu */}
                <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <span className="w-1.5 h-3 bg-indigo-500 rounded-full" /> Lĩnh vực nghiên cứu
                        </h3>
                        {perm?.canUpdateBase && base?.disciplines && base.disciplines.length < (perm.maxDisciplines ?? 5) && (
                            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                                <Plus className="w-3.5 h-3.5" /> Thêm
                            </Button>
                        )}
                    </div>

                    {!base?.disciplines || base.disciplines.length === 0 ? (
                        <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">Chưa có lĩnh vực nghiên cứu nào được gán.</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {base.disciplines.map((d) => (
                                <span key={d.id} className="bg-indigo-50 border border-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/50 dark:text-indigo-300 px-3 py-1 rounded-lg text-xs font-medium">
                                    {d.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Thẻ thống kê số lượng dữ liệu đính kèm */}
                <div className="flex gap-3 flex-wrap pt-2">
                    <StatPill val={data.contributors?.length} max={perm?.maxContributors} label="Thành viên" />
                    <StatPill val={data.participants?.length} max={perm?.maxParticipants} label="Người tham gia" />
                    <StatPill val={data.fundings?.length} max={perm?.maxFundings} label="Kinh phí" />
                    <StatPill val={base?.disciplines?.length} max={perm?.maxDisciplines} label="Lĩnh vực" />
                </div>
            </div>
        </Card>
    )
}

// ─── COMPONENT CON CON: INFO CELL (Ô THÔNG TIN) ───────────────────────────
function InfoCell({ icon, label, value, className = "", isBadge = false }: {
    icon: React.ReactNode; label: string; value: string; className?: string; isBadge?: boolean
}) {
    return (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60">
            <div className="p-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg text-slate-400 flex-shrink-0">
                {icon}
            </div>
            <div className="space-y-0.5 min-w-0">
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{label}</p>
                {isBadge ? (
                    <Badge variant="secondary" className="text-[11px] font-semibold px-2 py-0 shadow-none bg-slate-100 dark:bg-slate-800">
                        {value || "Chưa rõ"}
                    </Badge>
                ) : (
                    <span className={`text-xs font-semibold text-slate-700 dark:text-slate-300 block truncate ${className}`}>
                        {value || "---"}
                    </span>
                )}
            </div>
        </div>
    )
}

// ─── COMPONENT CON CON: STAT PILL (VIÊN THỐNG KÊ CHI TIẾT) ─────────────────
function StatPill({ val = 0, max = 0, label }: { val?: number; max?: number; label: string }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 shadow-sm">
            <span>{label}:</span>
            <span className="text-slate-900 dark:text-slate-100 font-bold">
                {val}{max > 0 && <span className="text-slate-400 font-normal">/{max}</span>}
            </span>
        </div>
    )
}