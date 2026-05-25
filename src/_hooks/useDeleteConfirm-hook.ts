// _hooks/useDeleteConfirm.ts
import { useState } from 'react'

export function useDeleteConfirm(deleteFn: (id: string) => Promise<void>) {
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    async function handleDelete() {
        if (!deleteId) return
        setDeleting(true)
        try {
            await deleteFn(deleteId)
        } finally {
            setDeleting(false)
            setDeleteId(null)
        }
    }

    return { deleteId, deleting, setDeleteId, handleDelete }
}