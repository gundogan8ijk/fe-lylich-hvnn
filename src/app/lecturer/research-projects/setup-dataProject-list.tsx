'use client'
import { getListProjectMeAction } from "@/_hooks/research-projects-hook";
import { useEffect } from "react"

export default function SetupDataProjectList() {
    useEffect(() => {
        getListProjectMeAction();
    }, []);

    return <></>;
}