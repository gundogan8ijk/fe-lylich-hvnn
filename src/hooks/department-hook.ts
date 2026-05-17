import { getDepartmentsListApi } from "@/services/department-service";
import {notify} from '@/components/utils/Notify'
import { defaultPagination } from "@/types/pagination-typeConfig";
import { storeDepartment } from "@/stores/department-store";
import { toSearchParams } from "@/lib/query-options-toUrl-helper";


export async function getDepartmentsListAction() {

    const { setLoading, setPagination,setData, query,searchField } = storeDepartment.getState();
    setLoading(true);

    const url=toSearchParams(query,searchField);

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
