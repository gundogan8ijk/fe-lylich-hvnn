"use client";

import { useEffect } from "react";
import { storePublicActivities } from "@/working-public/home/home-store";
import { loadPublicActivitiesAction } from "@/working-public/home/home-hook";

export default function SetupDataActivities() {
    const page = storePublicActivities((s) => s.page);
    const searchQuery = storePublicActivities((s) => s.searchQuery);
    const typeFilter = storePublicActivities((s) => s.typeFilter);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadPublicActivitiesAction();
        }, 300);
        return () => clearTimeout(timer);
    }, [page, searchQuery, typeFilter]);

    return null;
}
