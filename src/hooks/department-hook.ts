import { getByIdDepartmentsApi, getDepartmentsListApi } from "@/services/department-service";
import { notify } from '@/components/utils/Notify'
import { defaultPagination } from "@/types/pagination-typeConfig";
import { storeDepartment } from "@/stores/department-store";
import { toSearchParams } from "@/lib/query-options-toUrl-helper";
import { Pompiere } from "next/font/google";
import { DepartmentDetail } from "@/types/department-type";


export { getDepartmentsListAction, getDepartmentsDetailAction }

async function getDepartmentsListAction() {

    const { setLoading, setPagination, setData, query, searchField } = storeDepartment.getState();
    setLoading(true);

    const url = toSearchParams(query, searchField);

    const res = await getDepartmentsListApi(url);
    if (res.code === -1) {
        notify.error(res.message);

        setLoading(false);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);

}

async function getDepartmentsDetailAction(id: string): Promise<DepartmentDetail | null> {

    const res = await getByIdDepartmentsApi(id);

    if (res.code === -1) return null;

    return res.data;
}
