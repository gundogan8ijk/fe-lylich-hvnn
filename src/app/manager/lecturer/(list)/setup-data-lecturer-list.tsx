'use client'

import { useEffect, useRef } from "react"
import { getListLecturerManagerAction } from "@/working-manager/lecturer/lecturer-manger-hook";

export default function SetupDataLecturerList() {
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            getListLecturerManagerAction();
            isMounted.current = true;
        }
    }, [])

    return null;
}
