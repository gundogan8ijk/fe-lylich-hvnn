import { ApiResponse } from "@/types/result-typeConfig";
import { api } from "./axios-service-config";
import { DepartmentList } from "@/types/department-type";
import { success } from "@/lib/response-helper";

export {
    getDepartmentsListApi
}

const departmentListUrl="/Departments";

const getDepartmentsListApi = async (page = 1, perPage = 10):Promise<ApiResponse<DepartmentList>> => {
    const response = await api.get(departmentListUrl, {
        params: {
            page,
            per_page: perPage,
        },
    });

    return success(response.data)
};