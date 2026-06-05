'use client';

import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { storeProjectExternalDetail } from '@/ProjectExternal-Lecturer-Detail/ProjectExternal-Detail-store';
import { PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS, ProjectExternalMemberRoleName } from '@/_constants/ProjectExternal-constant';
import InternalContributorItem from './InternalContributorItem';
import AddInternalContributorDialog from './AddInternalContributorDialog';
import DeleteInternalContributorDialog from './DeleteInternalContributorDialog';

export default function InternalContributorsSum() {
    const { data: project } = storeProjectExternalDetail();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const contributors = project?.internalContributors ?? [];
    const isDisabled = project?.confirmedStatus !== 'Draft' || !project?.isMyCreate;

    const totalContributors = contributors.length + (project?.externalParticipants?.length ?? 0);
    const maxContributor = project?.maxContributor ?? 10;
    const isFull = totalContributors >= maxContributor;

    const getRoleLabel = (role: ProjectExternalMemberRoleName) =>
        PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS.find((opt) => opt.value === role)?.label ?? role;

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
                <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Thành viên nội bộ</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Các giảng viên trong trường tham gia đề tài
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

            {contributors.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl bg-muted/10">
                    <Users className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-xs font-medium">Chưa có thành viên nội bộ nào</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {contributors.map((item) => (
                        <InternalContributorItem
                            key={item.id}
                            contributor={item}
                            isCreator={project?.lecturerCreateId ? item.lecturerId === project.lecturerCreateId : false}
                            disabled={isDisabled}
                            roleLabel={getRoleLabel(item.role)}
                            onRemoveClick={setDeleteId}
                        />
                    ))}
                </div>
            )}

            <AddInternalContributorDialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <DeleteInternalContributorDialog contributorId={deleteId} onClose={() => setDeleteId(null)} />
        </div>
    );
}