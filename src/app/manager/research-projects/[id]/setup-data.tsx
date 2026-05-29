'use client'
import { getProjectManagerDetailAction } from "@/_hooks/research-projects-hook";
import { useEffect } from "react"

export default function SetupDataProjectMangerDetail({ id }: { id: string }) {
    useEffect(() => {
        getProjectManagerDetailAction(id);
    }, [id]);

    return <></>;
}