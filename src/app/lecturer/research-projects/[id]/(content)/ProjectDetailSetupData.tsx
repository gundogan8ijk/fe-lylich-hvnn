'use client'

import { useEffect } from "react"
import { storeProjectDetail } from "@/Project-Lecturer-Detail/Project-Detail-store"
import { getProjectDetailAction } from "@/Project-Lecturer-Detail/Project-Detail-hook"

type Props = {
    id: string
}

export default function ProjectDetailSetupData({ id }: Props) {
    const { setNull } = storeProjectDetail()

    useEffect(() => {
        setNull()
        getProjectDetailAction(id)
    }, [id])

    return null
}

