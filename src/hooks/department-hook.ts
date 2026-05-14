import { getDepartmentsListApi } from "@/services/department-service";
import {notify} from '@/components/utils/Notify'
import { defaultPagination } from "@/types/pagination-typeConfig";
import { storeDepartment } from "@/stores/department-store";


export async function getDepartmentsListAction(page?: number, perPage?: number) {

    const { setLoading, setData, setPagination } = storeDepartment.getState();
    setLoading(true);

    const res = await getDepartmentsListApi(page, perPage);
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
