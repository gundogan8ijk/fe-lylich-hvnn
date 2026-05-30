'use client'
import { getProjectManagerDetailAction } from "@/ProjectManger/hook-projects-manger";
import { useEffect } from "react"

export default function SetupDataProjectMangerDetail({ id }: { id: string }) {
    useEffect(() => {
        getProjectManagerDetailAction(id);
    }, [id]);

    return <></>;
}