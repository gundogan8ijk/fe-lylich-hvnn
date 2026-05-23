import { ApiError,  ApiSuccess } from "@/types/base-type/result-typeConfig";

export const success = <T>(data: T, message = "Success"): ApiSuccess<T> => {
    return {
        code: 1,
        message,
        data,
    };
};

export const fail = ( message = "Không thể kết nối đến server", errors?: Record<string, string[]>
): ApiError => {
    return {
        code: -1,
        message:message,
        errors:errors,
        data: null,
    };
};

export const getErrorMessage = ( message?: string, errors?: Record<string, string[]>
): string => {
    if (errors) {
        const firstError = Object.values(errors)?.[0]?.[0];
        if (firstError) return firstError;
    }

    return message || "Có lỗi xảy ra";
};