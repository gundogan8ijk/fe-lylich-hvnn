'use client'
import { getProjectManagerDetailAction } from "@/working-manager/project-detail/project-detail-hook";
import { useEffect } from "react"

export default function SetupDataProjectMangerDetail({ id }: { id: string }) {
    useEffect(() => {
        getProjectManagerDetailAction(id);
    }, [id]);

    return <></>;
}