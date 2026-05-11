export type ResponseCode = 1 | -1;

export type ApiSuccess<T> = {
    code: 1;
    message: string;
    data: T;
};

export type ApiError = {
    code: -1;
    message: string;
    data: null;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;