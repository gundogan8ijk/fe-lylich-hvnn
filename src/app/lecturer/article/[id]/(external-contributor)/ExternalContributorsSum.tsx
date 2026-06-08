'use client';

import { useState } from 'react';
import { Plus, Globe } from 'lucide-react';
import { storeArticleDetail } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-store';
import { ROLE_AWARD_OPTIONS } from '@/_constants/article-constant';
import { ArticleContributorRoleName } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-type';
import ExternalContributorItem from './ExternalContributorItem';
import DeleteExternalContributorDialog from './DeleteExternalContributorDialog';
import AddExternalContributorDialog from './AddExternalContributorDialog';
import UpdateExternalContributorDialog from './UpdateExternalContributorDialog';

export default function ExternalContributorsSum() {
    const { data } = storeArticleDetail();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const contributors = data?.externalContributors ?? [];
    const isDisabled = data?.confirmedStatus !== 'Draft' || !data?.isMyCreate;

    const totalContributors = (data?.internalContributors?.length || 0) + (data?.externalContributors?.length || 0);
    const maxContributor = data?.maxContributor ?? 10; // fallback
    const isFull = totalContributors >= maxContributor;

    const getRoleLabel = (role: ArticleContributorRoleName) =>
        ROLE_AWARD_OPTIONS.find((opt) => opt.value === role)?.label ?? role;

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
                <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Thành viên ngoài trường</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Danh sách các chuyên gia, tác giả tự do hợp tác bên ngoài</p>
                </div>
                {(!isDisabled && !isFull )&& (
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
                    <Globe className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-xs font-medium">Chưa có thành viên ngoài trường nào</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {contributors.map((item) => (
                        <ExternalContributorItem
                            key={item.id}
                            contributor={item}
                            disabled={isDisabled}
                            roleLabel={getRoleLabel(item.role)}
                            onEditClick={setEditId}
                            onRemoveClick={setDeleteId}
                        />
                    ))}
                </div>
            )}

            {/* Các Dialog điều khiển đóng/mở cục bộ */}
            <AddExternalContributorDialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <UpdateExternalContributorDialog externalContributorId={editId} onClose={() => setEditId(null)} />
            <DeleteExternalContributorDialog externalContributorId={deleteId} onClose={() => setDeleteId(null)} />
        </div>
    );
}