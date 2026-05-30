export type ResponseCode = 1 | -1;

export type ApiSuccess<T> = {
    code: ResponseCode;
    message: string;
    data: T;
    errors?: never;
};

export type ApiError = {
    code: ResponseCode;
    message: string;
    errors?: ErrorsResult;
    data: null;
};

export type ErrorsResult = { [key: string]: string[]; };

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

