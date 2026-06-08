'use client'

import { useEffect } from 'react'
import { getAwardDetailManagerAction } from '@/working-manager/award/award-manager-hook'

export default function SetupDataAwardDetail({ id }: { id: string }) {
    useEffect(() => {
        if (id) {
            getAwardDetailManagerAction(id)
        }
    }, [id])

    return null
}
