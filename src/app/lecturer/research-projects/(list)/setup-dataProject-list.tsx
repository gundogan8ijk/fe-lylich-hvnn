'use client'
import { getMyProjectsAction } from "@/Project-Lecturer-List/Project-List-hook";
import { useEffect } from "react"

export default function SetupDataProjectList() {
    useEffect(() => {
        getMyProjectsAction();
    }, []);

    return <></>;
}
