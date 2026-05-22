export type ResponseCode = 1 | -1;

export type ApiSuccess<T> = {
    code: ResponseCode;
    message: string;
    data: T;
    errors?: string[];
};

export type ApiError = {
    code: ResponseCode;
    message: string;
    errors?: string[];
    data: null;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// export type QueryResult<TData> = {
//     code: 1;
//     message: string;
//     data: TData[];
//     meta: Pagination;
// };

// export type QueryResponse<T> = QueryResult<T> | ApiError;
