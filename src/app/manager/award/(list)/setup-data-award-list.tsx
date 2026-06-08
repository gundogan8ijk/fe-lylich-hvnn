'use client'

import { useEffect } from 'react'
import { getListAwardManagerAction } from '@/working-manager/award/award-manager-hook'

export default function SetupDataAwardList() {
    useEffect(() => {
        getListAwardManagerAction()
    }, [])

    return null
}
