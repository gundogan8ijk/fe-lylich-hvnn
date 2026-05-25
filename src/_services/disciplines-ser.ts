import { success } from "@/lib/response-helper";
import { api } from "./base-ser/axios-service-config";
import axios from "axios";
import { fail } from "assert";
import { ApiResponse } from "@/_types/base-type/result-typeConfig";
import { DisciplinesNameItems } from "@/_types/disciplines-type";

export {
    getListDisciplinesNameApi
}


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
