'use client'
import { getAcLecturer } from "@/hooks/lecturer-hook";
import { useEffect } from "react"

export default function SetupDataLecturer() {
    useEffect(() => {
        getAcLecturer();
    }, []);

    return <></>;
}