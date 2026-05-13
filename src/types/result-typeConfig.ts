export type ResponseCode = 1 | -1;

export type ApiSuccess<T> = {
    code: 1;
    message: string;
    data: T;
};

export type ApiError = {
    code: -1;
    message: string;
    errors?: string[];
    data: null;
};


export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type Pagination = {
    page: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
};

export const defaultPagination: Pagination = {
    page: 1,
    perPage: 10,
    totalCount: 0,
    totalPages: 1,
};