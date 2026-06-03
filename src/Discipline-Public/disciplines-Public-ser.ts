import { success } from "@/_lib/response-helper";
import { api } from "../_Common/_services/axios-service-config";
import axios from "axios";
import { fail } from "assert";
import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { DisciplinesNameItems } from "@/Discipline-Public/disciplines-type";

export {
    //comon
    getListDisciplinesNameApi
    //
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
