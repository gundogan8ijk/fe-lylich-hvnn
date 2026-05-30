'use client'
import { getAcLecturer } from "@/profile-Lecturer/Lecturer-Profile-hook";
import { useEffect } from "react"

export default function SetupDataLecturer() {
    useEffect(() => {
        getAcLecturer();
    }, []);

    return <></>;
}