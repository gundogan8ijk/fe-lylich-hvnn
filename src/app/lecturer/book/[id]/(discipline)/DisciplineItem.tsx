'use client';

import { Trash2, BookOpen } from 'lucide-react';
import { BookDiscipline } from '@/working-Lecturer/Book-Detail/Book-Detail-type';

interface DisciplineItemProps {
  discipline: BookDiscipline;
  disabled: boolean;
  onRemoveClick: (id: string) => void;
}

export default function DisciplineItem({ discipline, disabled, onRemoveClick }: DisciplineItemProps) {
  return (
    <div className="group flex justify-between items-center p-4 bg-background hover:bg-muted/30 rounded-xl border border-border shadow-2xs hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-100/60 shrink-0">
          <BookOpen className="w-4 h-4" />
        </div>
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-foreground text-sm sm:text-base truncate">{discipline.name}</p>
            <span className="inline-flex px-2 py-0.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-mono rounded-md border border-purple-100">
              {discipline.code}
            </span>
          </div>
        </div>
      </div>
      {!disabled && (
        <button
          type="button"
          onClick={() => onRemoveClick(discipline.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-all duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}