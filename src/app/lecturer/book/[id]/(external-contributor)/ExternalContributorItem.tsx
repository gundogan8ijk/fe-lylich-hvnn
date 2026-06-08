'use client';

import { BookExternalContributor } from '@/working-Lecturer/Book-Detail/Book-Detail-type';
import { Trash2, Globe, Pencil } from 'lucide-react';

interface ExternalContributorItemProps {
    contributor: BookExternalContributor;
    disabled: boolean;
    roleLabel: string;
    onEditClick: (id: string) => void;
    onRemoveClick: (id: string) => void;
}

export default function ExternalContributorItem({
    contributor,
    disabled,
    roleLabel,
    onEditClick,
    onRemoveClick,
}: ExternalContributorItemProps) {
    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        return parts[parts.length - 1]?.charAt(0).toUpperCase() || 'E';
    };

    return (
        <div className="group flex justify-between items-center p-4 bg-background hover:bg-muted/30 rounded-xl border border-border shadow-2xs hover:shadow-sm transition-all duration-200">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-100/60 shrink-0">
                    {getInitials(contributor.fullName)}
                </div>
                <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-foreground text-sm sm:text-base truncate">{contributor.fullName}</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md border border-purple-100">
                            <Globe className="w-3 h-3" /> Ngoài trường
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{roleLabel}</span>
                        {contributor.email && (
                            <>
                                <span className="text-muted-foreground/40">•</span>
                                <span className="truncate max-w-[180px] sm:max-w-xs">{contributor.email}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {!disabled && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                        type="button"
                        onClick={() => onEditClick(contributor.id)}
                        className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onRemoveClick(contributor.id)}
                        className="p-2 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-all duration-200"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    );
}