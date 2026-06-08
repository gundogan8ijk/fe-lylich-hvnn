import { useEffect } from "react";
import { useLecturerAdminStore } from "./lecturer-admin-store";
import { getLecturerAccountsAdminApi } from "./lecturer-admin-service";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import notify from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";

export function useFetchLecturerAdminList() {
    const { query, setData, setLoading, refreshTrigger } = useLecturerAdminStore();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const params = toSearchParams(query, query.searchField);
            if (query.role) {
                params.set("role", query.role);
            }
            const res = await getLecturerAccountsAdminApi(params);
            if (res.code === 1) {
                setData(res.data);
            } else {
                setData(null);
                notify.error(getAllErrorMessage(res.message, res.errors));
            }
            setLoading(false);
        };

        fetchData();
    }, [query, refreshTrigger, setData, setLoading]);
}
