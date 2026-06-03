"use client"

import { Card } from "@/_components/ui/card"
import { Button } from "@/_components/ui/button"
import { Badge } from "@/_components/ui/badge"
import { getDateOnly } from "@/_lib/display-variable-helper"
import { UserPlus, Crown, Users, Trash2, ShieldCheck } from "lucide-react"
import { storeProjectManagerDetail } from "@/ProjectManger/store-detail-project-manger"

export default function ContentContributorsManger() {
    const data = storeProjectManagerDetail((s) => s.data)
    if (!data) return null

    const contributors = data.contributors ?? []
    const perm = data.permissions
    const canUpdate = perm?.canUpdateContributors
    const max = perm?.maxContributors ?? 5

    return (
        <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 rounded-2xl p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl">
                        <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Thành viên nhóm</h2>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            {contributors.length}/{max} thành viên
                        </p>
                    </div>
                </div>

                {canUpdate && contributors.length < max && (
                    <Button
                        size="sm"
                        className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                    >
                        <UserPlus className="w-3.5 h-3.5" />
                        Thêm thành viên
                    </Button>
                )}
            </div>

            {/* List */}
            {contributors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                        <Users className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-400 dark:text-slate-500 italic">Chưa có thành viên nào.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {contributors.map((c) => (
                        <ContributorRow
                            key={c.id}
                            contributor={c}
                            canUpdate={canUpdate}
                        />
                    ))}
                </div>
            )}
        </Card>
    )
}

function ContributorRow({ contributor, canUpdate }: {
    contributor: { id: string; code: string; name: string; status: string; joinedAt: string }
    canUpdate?: boolean
}) {
    const isLeader = contributor.status === "Leader"

    return (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">

            {/* Avatar */}
            <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                ${isLeader
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'
                    : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50'
                }`}
            >
                {contributor.name.charAt(0)}
                {isLeader && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-400 dark:bg-amber-500 rounded-full flex items-center justify-center">
                        <Crown className="w-2.5 h-2.5 text-white" />
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {contributor.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        {contributor.code}
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <Badge
                        variant="secondary"
                        className={`text-[10px] px-2 py-0 rounded-md font-medium shadow-none
                            ${isLeader
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                    >
                        {isLeader ? (
                            <span className="flex items-center gap-1"><Crown className="w-2.5 h-2.5" /> Trưởng nhóm</span>
                        ) : (
                            <span className="flex items-center gap-1"><ShieldCheck className="w-2.5 h-2.5" /> Thành viên</span>
                        )}
                    </Badge>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        Tham gia: {getDateOnly(contributor.joinedAt)}
                    </span>
                </div>
            </div>

            {/* Action */}
            {canUpdate  && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg flex-shrink-0"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </Button>
            )}
        </div>
    )
}