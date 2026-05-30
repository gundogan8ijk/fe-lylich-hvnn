'use client'
import { getListProjectLecturerAction } from "@/Project-Lecturer-List/projects-lecturer-list-hook";
import { useEffect } from "react"

export default function SetupDataProjectList() {
    useEffect(() => {
        getListProjectLecturerAction();
    }, []);

    return <></>;
}