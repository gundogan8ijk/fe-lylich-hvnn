'use client'
import Loading from '@/_components/utils/Loading'
import MangerResearchProjectCard from './projectManger-card';
import { useState } from 'react';
import DeleteConfirmDialog from '@/_components/custom/DeleteConfirmDialog';
import { useRouter } from "next/navigation";
import { storeProjectMangerList } from '@/working-manager/project-list/project-list-store';
import { deleteMangerProjectListAction } from '@/working-manager/project-detail/project-detail-hook';

export default function MangerProjectGrid() {
    const isLoading = storeProjectMangerList((s) => s.loading);
    const items = storeProjectMangerList((s) => s.data);

    const router = useRouter();

    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    const handleClick = async (id: string) => {
        router.push(`/manager/research-projects/${id}`);
    }

    const handleDeleteConfirm = async () => {
        if (!deleteTargetId) return
        setDeleting(true)
        await deleteMangerProjectListAction(deleteTargetId)
        setDeleting(false)
        setDeleteTargetId(null)
    }

    if (isLoading)
        return <Loading></Loading>;

    return (
        <div className="flex flex-col gap-y-3">
            {items?.map((project, index) => (
                <MangerResearchProjectCard key={index} item={project} onViewDetail={handleClick} onDelete={(id) => setDeleteTargetId(id)} />
            ))}
            <DeleteConfirmDialog open={!!deleteTargetId}
                deleting={deleting}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTargetId(null)} />
        </div>
    )
}
