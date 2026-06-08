'use client'

import { useEffect } from "react";
import { getProjectExternalDetailManagerAction } from "@/working-manager/project-external/project-external-manager-hook";
import { storeProjectExternalDetailManager } from "@/working-manager/project-external/project-external-manager-store";

export default function SetupDataProjectExternalDetail({ id }: { id: string }) {
    useEffect(() => {
        storeProjectExternalDetailManager.getState().setData(null);
        getProjectExternalDetailManagerAction(id);
    }, [id]);

    return null;
}
