"use client";

import { useEffect, useRef } from "react";
import { getEducationDetailManagerAction } from "@/working-manager/education/education-manager-hook";

interface SetupDataEducationDetailProps {
    id: string;
}

export default function SetupDataEducationDetail({ id }: SetupDataEducationDetailProps) {
    const isFetched = useRef(false);

    useEffect(() => {
        if (!isFetched.current) {
            getEducationDetailManagerAction(id);
            isFetched.current = true;
        }
    }, [id]);

    return null;
}
