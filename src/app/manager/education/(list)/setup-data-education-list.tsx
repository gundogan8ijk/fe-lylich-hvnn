"use client";

import { useEffect, useRef } from "react";
import { getListEducationManagerAction } from "@/working-manager/education/education-manager-hook";

export default function SetupDataEducationList() {
    const isFetched = useRef(false);

    useEffect(() => {
        if (!isFetched.current) {
            getListEducationManagerAction();
            isFetched.current = true;
        }
    }, []);

    return null;
}
