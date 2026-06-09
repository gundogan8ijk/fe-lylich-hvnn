'use client';

import { useState } from 'react';
import { Plus, Globe } from 'lucide-react';
import { storeProjectExternalDetail } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-store';
import { PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS, ProjectExternalMemberRoleName } from '@/_constants/ProjectExternal-constant';
import ExternalParticipantItem from './ExternalParticipantItem';
import AddExternalParticipantDialog from './AddExternalParticipantDialog';
import UpdateExternalParticipantDialog from './UpdateExternalParticipantDialog';
import DeleteExternalParticipantDialog from './DeleteExternalParticipantDialog';

export default function ExternalParticipantsSum() {
    const { data: project } = storeProjectExternalDetail();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const participants = project?.externalParticipants ?? [];
    const isDisabled = project?.confirmedStatus !== 'Draft' || !project?.isMyCreate;

    const totalParticipants = (project?.internalContributors?.length || 0) + participants.length;
    const maxParticipant = project?.maxParticipant ?? 10;
    const isFull = totalParticipants >= maxParticipant;

    const getRoleLabel = (role: ProjectExternalMemberRoleName) =>
        PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS.find((opt) => opt.value === role)?.label ?? role;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
                <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Người tham gia bên ngoài</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Các cá nhân/tổ chức ngoài trường tham gia đề tài
                    </p>
                </div>
                {!isDisabled && !isFull && (
                    <button
                        type="button"
                        onClick={() => setIsAddOpen(true)}
                        className="w-full sm:w-auto px-2.5 py-1 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-all text-[10px] sm:text-xs flex items-center justify-center gap-1 shadow-sm"
                    >
                        <Plus className="w-3 h-3" /> Thêm
                    </button>
                )}
            </div>

            {participants.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl bg-muted/10">
                    <Globe className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-xs font-medium">Chưa có người tham gia bên ngoài</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {participants.map((item) => (
                        <ExternalParticipantItem
                            key={item.id}
                            participant={item}
                            disabled={isDisabled}
                            roleLabel={getRoleLabel(item.role)}
                            onEditClick={setEditId}
                            onRemoveClick={setDeleteId}
                        />
                    ))}
                </div>
            )}

            <AddExternalParticipantDialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <UpdateExternalParticipantDialog participantId={editId} onClose={() => setEditId(null)} />
            <DeleteExternalParticipantDialog participantId={deleteId} onClose={() => setDeleteId(null)} />
        </div>
    );
}