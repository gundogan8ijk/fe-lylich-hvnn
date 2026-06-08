'use client';

import { getProjectExternalDetailAction } from "@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-hook";
import { useEffect } from "react";

export default function ProjectExternalDetailSetupData({ id }: { id: string }) {
    useEffect(() => {
        getProjectExternalDetailAction(id);
    }, [id]);

    return null;
}