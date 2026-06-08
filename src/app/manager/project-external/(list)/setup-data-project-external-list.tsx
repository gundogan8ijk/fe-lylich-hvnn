"use client";

import { useEffect, useRef } from "react";
import { getListProjectExternalManagerAction } from "@/working-manager/project-external/project-external-manager-hook";

export default function SetupDataProjectExternalList() {
    const isFetched = useRef(false);

    useEffect(() => {
        if (!isFetched.current) {
            getListProjectExternalManagerAction();
            isFetched.current = true;
        }
    }, []);

    return null;
}
