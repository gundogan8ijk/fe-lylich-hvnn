import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { useAccountAdminStore } from "./account-admin-store";
import { getAccountAdminListApi, linkLecturerApi } from "./account-admin-service";
import { notify } from "@/_components/utils/Notify";

export const getAccountAdminListAction = async () => {
    const { query, role, setData, setLoading, setPagination } = useAccountAdminStore.getState();
    
    setLoading(true);
    const params = toSearchParams(query);
    if (role && role !== "All") {
        params.set("role", role);
    }
    
    const response = await getAccountAdminListApi(params);
    if (response.code === 1) {
        setData(response.data!.items);
        setPagination(response.data!.pagination);
    } else {
        notify.error("Không thể lấy danh sách tài khoản: " + response.message);
    }
    setLoading(false);
}

export const linkLecturerAction = async (accountId: string, lecturerId: string): Promise<boolean> => {
    const response = await linkLecturerApi({ accountId, lecturerId });
    if (response.code === 1) {
        notify.success(response.message || "Liên kết tài khoản thành công");
        await getAccountAdminListAction();
        return true;
    } else {
        notify.error("Lỗi liên kết: " + response.message);
        return false;
    }
}
