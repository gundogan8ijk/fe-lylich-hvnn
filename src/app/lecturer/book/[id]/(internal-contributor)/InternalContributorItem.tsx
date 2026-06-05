'use client';

import { BookInternalContributor } from '@/Book-Lecturer-Detail/Book-Detail-type';
import { Trash2, ShieldCheck } from 'lucide-react';

interface InternalContributorItemProps {
    contributor: BookInternalContributor;
    isCreator: boolean;
    disabled: boolean;
    roleLabel: string;
    onRemoveClick: (id: string, name: string) => void;
}

export default function InternalContributorItem({
    contributor,
    isCreator,
    disabled,
    roleLabel,
    onRemoveClick,
}: InternalContributorItemProps) {
    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        return parts[parts.length - 1]?.charAt(0).toUpperCase() || 'U';
    };

    return (
        <div className="group flex justify-between items-center p-4 bg-background hover:bg-muted/30 rounded-xl border border-border shadow-2xs hover:shadow-sm transition-all duration-200">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-100/60 shrink-0">
                    {getInitials(contributor.fullName)}
                </div>
                <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-foreground text-sm sm:text-base truncate">{contributor.fullName}</p>
                        <span className="inline-flex px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-mono rounded-md border border-blue-100">
                            {contributor.code}
                        </span>
                        {isCreator && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-300 text-xs font-medium rounded-md border border-green-100">
                                <ShieldCheck className="w-3 h-3" /> Người tạo
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">{roleLabel}</p>
                </div>
            </div>
            {!disabled && !isCreator && (
                <button
                    type="button"
                    onClick={() => onRemoveClick(contributor.id, contributor.fullName)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-all duration-200"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}