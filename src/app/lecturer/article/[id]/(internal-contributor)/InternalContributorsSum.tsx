'use client';

import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { storeArticleDetail } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-store';
import { ROLE_AWARD_OPTIONS } from '@/_constants/article-constant';
import { ArticleContributorRoleName } from '@/working-Lecturer/Article-Detail/ArticleDetail-Lecturer-type';
import InternalContributorItem from './InternalContributorItem';
import DeleteContributorDialog from './DeleteContributorDialog';
import AddInternalContributorDialog from './AddContributorDialog';

export default function InternalContributorsSum() {
    const { data } = storeArticleDetail();

    // Chỉ còn 2 state UI thuần túy
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const contributors = data?.internalContributors ?? [];
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
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Thành viên nội bộ</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Danh sách các giảng viên thuộc trường tham gia bài viết</p>
                </div>
                {(!isDisabled && !isFull) && (
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
                            isCreator={data?.lectureCreateId ? item.lecturerId === data.lectureCreateId : false}
                            disabled={isDisabled}
                            roleLabel={getRoleLabel(item.role)}
                            onRemoveClick={setDeleteId} // chỉ truyền id
                        />
                    ))}
                </div>
            )}

            {/* Dialog tự lo hoàn toàn, chỉ cần biết đóng/mở */}
            <AddInternalContributorDialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <DeleteContributorDialog contributorId={deleteId} onClose={() => setDeleteId(null)} />
        </div>
    );
}