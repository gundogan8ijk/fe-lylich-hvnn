'use client';

import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import InternalContributorItem from './InternalContributorItem';
import DeleteInternalContributorDialog from './DeleteInternalContributorDialog';
import AddInternalContributorDialog from './AddInternalContributorDialog';
import { storeBookDetail } from '@/Book-Lecturer-Detail/Book-Detail-store';
import { BOOK_CONTRIBUTOR_ROLE_OPTIONS, BookContributorRoleName } from '@/_constants/Book-constant';

export default function InternalContributorsSum() {
    const { data: book } = storeBookDetail();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const contributors = book?.internalContributors ?? [];
    const isDisabled = book?.confirmedStatus !== 'Draft' || !book?.isMyCreate;

    const totalContributors = contributors.length + (book?.externalContributors?.length ?? 0);
    const maxContributor = book?.maxContributor ?? 10;
    const isFull = totalContributors >= maxContributor;

    const getRoleLabel = (role: BookContributorRoleName) =>
        BOOK_CONTRIBUTOR_ROLE_OPTIONS.find((opt) => opt.value === role)?.label ?? role;

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
                <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">Tác giả nội bộ</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Các giảng viên trong trường tham gia viết sách</p>
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
                    <p className="text-muted-foreground text-xs font-medium">Chưa có tác giả nội bộ nào</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {contributors.map((item) => (
                        <InternalContributorItem
                            key={item.id}
                            contributor={item}
                            isCreator={book?.lecturerCreateId ? item.lecturerId === book.lecturerCreateId : false}
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