"use client";

import { useEffect } from "react";
import { storePublicAwards } from "@/working-public/home/home-store";
import { loadRecentAwardsAction } from "@/working-public/home/home-hook";

export default function SetupDataAwards() {
    const page = storePublicAwards((s) => s.page);

    useEffect(() => {
        loadRecentAwardsAction();
    }, [page]);

    return null;
}
