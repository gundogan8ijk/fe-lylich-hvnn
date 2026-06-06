'use client'

import { Trash2 } from 'lucide-react'
import { ProjectDiscipline } from '@/Project-Lecturer-Detail/Project-Detail-type'

type Props = {
    discipline: ProjectDiscipline
    disabled: boolean
    onRemoveClick: (target: { id: string, name: string }) => void
}

export default function DisciplineItem({ discipline: d, disabled, onRemoveClick }: Props) {
    return (
        <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-lg pl-3 pr-1 py-1.5 shadow-sm hover:border-slate-300 dark:bg-[#0F172A] dark:border-slate-800 dark:hover:border-slate-700 transition-colors">
            <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{d.name}</span>
                <span className="text-xs text-slate-400 font-mono">{d.code}</span>
            </div>
            {!disabled && (
                <button
                    onClick={() => onRemoveClick({ id: d.id, name: d.name })}
                    className="p-1.5 ml-2 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            )}
        </div>
    )
}

