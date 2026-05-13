import { ApiError, ApiResponse } from "@/types/result-typeConfig";

export const success = <T>(data: T, message = "Success"): ApiResponse<T> => {
    return {
        code: 1,
        message,
        data,
    };
};

export const fail = (message = "Error", errors?: string[]): ApiError => {
    return {
        code: -1,
        message,
        errors,
        data: null,
    };
};