import { ApiError, ApiResponse } from "@/types/result-config";

export const success = <T>(data: T, message = "Success"): ApiResponse<T> => {
    return {
        code: 1,
        message,
        data,
    };
};

export const fail = (message = "Error"): ApiError => {
    return {
        code: -1,
        message,
        data: null,
    };
};
