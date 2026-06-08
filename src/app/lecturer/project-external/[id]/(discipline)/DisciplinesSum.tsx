'use client';

import { useState } from 'react';
import { Plus, Layers } from 'lucide-react';
import { storeProjectExternalDetail } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-store';
import AddDisciplineDialog from './AddDisciplineDialog';
import DeleteDisciplineDialog from './DeleteDisciplineDialog';
import DisciplineItem from './DisciplineItem';

export default function DisciplinesSum() {
    const { data: project } = storeProjectExternalDetail();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const disciplines = project?.disciplines ?? [];
    const isDisabled = project?.confirmedStatus !== 'Draft' || !project?.isMyCreate;

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
                <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Lĩnh vực nghiên cứu</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Danh sách các lĩnh vực nghiên cứu của đề tài</p>
                </div>
                {!isDisabled && (
                    <button
                        type="button"
                        onClick={() => setIsAddOpen(true)}
                        className="w-full sm:w-auto px-2.5 py-1 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-all text-[10px] sm:text-xs flex items-center justify-center gap-1 shadow-sm"
                    >
                        <Plus className="w-3 h-3" /> Thêm
                    </button>
                )}
            </div>

            {disciplines.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl bg-muted/10">
                    <Layers className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-xs font-medium">Chưa có lĩnh vực nghiên cứu nào</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {disciplines.map((item) => (
                        <DisciplineItem
                            key={item.id}
                            discipline={item}
                            disabled={isDisabled}
                            onRemoveClick={setDeleteId}
                        />
                    ))}
                </div>
            )}

            <AddDisciplineDialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <DeleteDisciplineDialog disciplineId={deleteId} onClose={() => setDeleteId(null)} />
        </div>
    );
}