"use client";

import { useEffect, useRef } from "react";
import { getLecturerAdminListAction } from "@/working-admin/lecturer/lecturer-admin-hook";

export default function SetupDataLecturerList() {
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            getLecturerAdminListAction();
            isMounted.current = true;
        }
    }, []);

    return null;
}
