'use client'
import Loading from '@/components/utils/Loading'
import MangerResearchProjectCard from './projectManger-card';
import { useState } from 'react';
import DeleteConfirmDialog from '@/components/custom/DeleteConfirmDialog';
import { useRouter } from "next/navigation";
import { storeProjectMangerList } from '@/ProjectManger/store-list-projects-manger';
import { deleteMangerProjectListAction } from '@/ProjectManger/hook-projects-manger';

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
