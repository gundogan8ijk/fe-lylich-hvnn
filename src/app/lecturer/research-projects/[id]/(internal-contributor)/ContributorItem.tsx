'use client'

import { Trash2 } from 'lucide-react'
import { getDateOnly } from '@/_lib/display-variable-helper'
import { ProjectContributor } from '@/Project-Lecturer-Detail/Project-Detail-type'

type Props = {
    contributor: ProjectContributor
    isCreator: boolean
    disabled: boolean
    onRemoveClick: (target: { id: string, name: string }) => void
}

export default function ContributorItem({ contributor: c, isCreator, disabled, onRemoveClick }: Props) {
    return (
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-300 dark:bg-[#0F172A] dark:border-slate-800 dark:hover:border-slate-700 transition-colors shadow-sm cursor-default">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400">
                    {c.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{c.fullName}</p>
                    <p className="text-xs text-slate-400 font-mono">{c.code}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    {c.status === "Leader" ? (
                        <span className="text-xs px-2 py-0.5 rounded border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                            Trưởng nhóm
                        </span>
                    ) : (
                        <span className="text-xs px-2 py-0.5 rounded border border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                            Thành viên
                        </span>
                    )}
                    <p className="text-xs text-slate-400 mt-1">Bắt đầu: {getDateOnly(c.joinedAt)}</p>
                </div>
                {!disabled && !isCreator && (
                    <button
                        onClick={() => onRemoveClick({ id: c.id, name: c.fullName })}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    )
}

