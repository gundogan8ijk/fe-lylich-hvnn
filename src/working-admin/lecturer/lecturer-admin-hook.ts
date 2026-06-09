import { useEffect } from "react";
import { useLecturerAdminStore } from "./lecturer-admin-store";
import { getLecturerAccountsAdminApi } from "./lecturer-admin-service";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";

export async function getLecturerAdminListAction() {
    const { query, searchField, role, setData, setLoading, setPagination } = useLecturerAdminStore.getState();
    
    setLoading(true);
    const params = toSearchParams(query, searchField);
    if (role && role !== "All") {
        params.set("role", role);
    }
    const res = await getLecturerAccountsAdminApi(params);
    if (res.code === 1 && res.data) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    } else {
        setData([]);
        notify.error(getAllErrorMessage(res.message, res.errors));
    }
    setLoading(false);
}
