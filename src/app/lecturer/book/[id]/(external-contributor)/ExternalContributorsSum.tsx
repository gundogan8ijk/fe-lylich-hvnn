'use client';

import { useState } from 'react';
import { Plus, Globe } from 'lucide-react';
import ExternalContributorItem from './ExternalContributorItem';
import DeleteExternalContributorDialog from './DeleteExternalContributorDialog';
import AddExternalContributorDialog from './AddExternalContributorDialog';
import UpdateExternalContributorDialog from './UpdateExternalContributorDialog';
import { storeBookDetail } from '@/working-Lecturer/Book-Detail/Book-Detail-store';
import { BOOK_CONTRIBUTOR_ROLE_OPTIONS, BookContributorRoleName } from '@/_constants/Book-constant';

export default function ExternalContributorsSum() {
  const { data: book } = storeBookDetail();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const contributors = book?.externalContributors ?? [];
  const isDisabled = book?.confirmedStatus !== 'Draft' || !book?.isMyCreate;

  const totalContributors = (book?.internalContributors?.length ?? 0) + contributors.length;
  const maxContributor = book?.maxContributor ?? 10;
  const isFull = totalContributors >= maxContributor;

  const getRoleLabel = (role: BookContributorRoleName) =>
    BOOK_CONTRIBUTOR_ROLE_OPTIONS.find((opt) => opt.value === role)?.label ?? role;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">Tác giả bên ngoài</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Các tác giả từ bên ngoài trường tham gia</p>
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
          <Globe className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-muted-foreground text-xs font-medium">Chưa có tác giả bên ngoài nào</p>
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

      <AddExternalContributorDialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <UpdateExternalContributorDialog externalContributorId={editId} onClose={() => setEditId(null)} />
      <DeleteExternalContributorDialog externalContributorId={deleteId} onClose={() => setDeleteId(null)} />
    </div>
  );
}