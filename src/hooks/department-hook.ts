import { getDepartmentsListApi } from "@/services/department-service";
import storeDepartment from "@/stores/department-store";


export async function getDepartmentsListAction() {

    const { setLoading, setDepartmentAll } = storeDepartment.getState();
    const res = await getDepartmentsListApi();

    setLoading(true);

    if (res.data?.items !== null)
        setDepartmentAll(res.data!.items);
    setLoading(false);

}
