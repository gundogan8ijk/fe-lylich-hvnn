import { api } from "@/_Common/_services/axios-service-config";
import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { DisciplinesNameItems, LecturersNameItems } from "../_types/getListName-type";

export{
    getListLecturersNameApi,
    getListDisciplinesNameApi,
    getListNoDepartmentLecturersNameApi
}


const getListLecturersNameApi = async (search: string): Promise<ApiResponse<LecturersNameItems[]>> => {
    try {
        const detailUrl = "/lecturer/search-name-code"
        const res = await api.get(detailUrl, { params: { search: search } });
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const getListNoDepartmentLecturersNameApi = async (search: string): Promise<ApiResponse<LecturersNameItems[]>> => {
    try {
        const detailUrl = "/lecturer/search-no-department-name-code"
        const res = await api.get(detailUrl, { params: { search: search } });
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const getListDisciplinesNameApi = async (search: string): Promise<ApiResponse<DisciplinesNameItems[]>> => {
    try {
        const detailUrl = "/disciplines/search-name-code"
        const res = await api.get(detailUrl, { params: { search: search } });
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail || "Đã có lỗi xảy ra");
        }
        return fail();
    }
};
