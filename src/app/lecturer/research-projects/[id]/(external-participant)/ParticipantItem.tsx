'use client'

import { Edit, Trash2 } from 'lucide-react'
import { ProjectParticipant } from '@/working-Lecturer/Project-Detail/Project-Detail-type'
import { PARTICIPANT_STATUS_LABELS, ParticipantStatusName } from '@/_constants/project-constant'

type Props = {
    participant: ProjectParticipant
    disabled: boolean
    onEditClick: (participant: ProjectParticipant) => void
    onRemoveClick: (target: { id: string, name: string }) => void
}

export default function ParticipantItem({ participant: p, disabled, onEditClick, onRemoveClick }: Props) {
    return (
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 hover:border-slate-300 dark:bg-[#0F172A] dark:border-slate-800 dark:hover:border-slate-700 transition-colors shadow-sm cursor-default flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400">
                        {p.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{p.fullName}</p>
                        <p className="text-xs text-slate-400 truncate w-32 sm:w-48">{p.email || '—'}</p>
                    </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 shrink-0">
                    {PARTICIPANT_STATUS_LABELS[p.role as ParticipantStatusName] || p.role}
                </span>
            </div>
            {!disabled && (
                <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/50">
                    <button
                        onClick={() => onEditClick(p)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onRemoveClick({ id: p.id, name: p.fullName })}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
}

