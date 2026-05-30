import { ApiError, ApiSuccess, ErrorsResult } from "@/_types/result-typeConfig";

export const success = <T>(data: T, message = "Success"): ApiSuccess<T> => {
    return {
        code: 1,
        message,
        data,
    };
};

export const fail = (
    message = "Không thể kết nối đến server", errors?: ErrorsResult): ApiError => {
    return {
        code: -1,
        message,
        errors,
        data: null,
    };
};

export const getErrorMessage = (message?: string, errors?: ErrorsResult
): string => {
    if (errors) {
        const firstError = Object.values(errors).flat().find(Boolean);
        if (firstError) return firstError;
    }

    return message || "Có lỗi xảy ra";
};

export const getAllErrorMessage = (
    message?: string,
    errors?: ErrorsResult
): string => {
    if (errors) {
        const allErrors = Object.values(errors)
            .flat()
            .filter(Boolean);

        if (allErrors.length > 0) {
            return allErrors.map(x => `${x} `) .join("\n");
        }
    }

    return message || "Có lỗi xảy ra";
};