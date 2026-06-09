'use client';

import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { useEffect } from "react";
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";

export default function SetupDataAccountList() {
    const { resetQuery, setPagination, triggerRefresh } = useAccountAdminStore();

    useEffect(() => {
        resetQuery();
        setPagination({ ...defaultPagination });
        triggerRefresh();
    }, []);

    return null;
}
