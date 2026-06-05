'use client';

import { getProjectExternalDetailAction } from "@/ProjectExternal-Lecturer-Detail/ProjectExternal-Detail-hook";
import { useEffect } from "react";

export default function ProjectExternalDetailSetupData({ id }: { id: string }) {
    useEffect(() => {
        getProjectExternalDetailAction(id);
    }, [id]);

    return null;
}