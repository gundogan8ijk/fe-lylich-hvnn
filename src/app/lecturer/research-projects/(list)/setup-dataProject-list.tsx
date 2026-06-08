'use client'
import { getMyProjectsAction } from "@/working-Lecturer/Project-List/Project-List-hook";
import { useEffect } from "react"

export default function SetupDataProjectList() {
    useEffect(() => {
        getMyProjectsAction();
    }, []);

    return <></>;
}
