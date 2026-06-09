'use client';

import PaginationButtonDynamic from "@/_components/query/paginationButton-dynamic";
import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";

export default function AccountPagination() {
    return (
        <div className="mt-8 flex justify-end">
            <PaginationButtonDynamic store={useAccountAdminStore as any} />
        </div>
    );
}
