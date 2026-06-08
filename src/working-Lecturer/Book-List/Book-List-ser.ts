import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { api } from '@/_Common/_services/axios-service-config';
import { fail, success } from "@/_lib/response-helper";
import axios from "axios";
import { BookItem } from "./Book-List-type";

export {
    getMyBooksApi,
    registerBookApi,
    deleteBookApi,
};

export type RegisterBookForm = {
    Title: string;
    Describe: string;
    Publisher?: string;
    PublishYear: string; // YYYY-MM-DD
    ProofUrl: string;
    ISBN?: string;
    DetailUrl?: string;
    BookRole: string; // MainAuthor | CoAuthor | EditorInChief
};

const getMyBooksApi = async (): Promise<ApiResponse<BookItem[]>> => {
    try {
        const res = await api.get("/books/my");
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const registerBookApi = async (
    form: RegisterBookForm
): Promise<ApiResponse<BookItem>> => {
    try {
        const res = await api.post("/books/register", form);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteBookApi = async (id: string): Promise<ApiResponse<void>> => {
    try {
        const res = await api.delete(`/books/${id}`);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};