'use client';

import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { storeProjectExternalDetail } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-store';
import { PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS, ProjectExternalMemberRoleName } from '@/_constants/ProjectExternal-constant';
import { updateInternalContributorAction } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-hook';

interface Props {
    contributorId: string | null;
    onClose: () => void;
}

export default function UpdateInternalContributorDialog({ contributorId, onClose }: Props) {
    const { data: project } = storeProjectExternalDetail();

    const contributor = project?.internalContributors.find((c) => c.id === contributorId);

    const [role, setRole] = useState<ProjectExternalMemberRoleName>(
        contributor?.role ?? PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS[0]?.value ?? 'CoreTeam'
    );
    const [loading, setLoading] = useState(false);

    if (!contributorId || !contributor) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!project?.id) return;

        setLoading(true);
        try {
            const success = await updateInternalContributorAction(project.id, contributorId, role);
            if (success) {
                onClose();
            }
        } catch (error) {
            console.error('Lỗi cập nhật vai trò:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-background rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border animate-in zoom-in-95 duration-150">
                <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex justify-between items-center z-10">
                    <h3 className="text-base font-semibold text-foreground">Cập nhật vai trò</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-foreground">Thành viên nội bộ</label>
                        <input
                            type="text"
                            disabled
                            value={`${contributor.fullName} - ${contributor.code}`}
                            className="w-full px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground text-sm cursor-not-allowed"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-foreground">Vai trò</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as ProjectExternalMemberRoleName)}
                            className="w-full px-3 py-2.5 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                        >
                            {PROJECT_EXTERNAL_MEMBER_ROLE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border/60">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs text-sm"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-1.5">
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang cập nhật...
                                </span>
                            ) : (
                                'Cập nhật'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
