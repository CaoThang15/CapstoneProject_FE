export enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch",
}

export type TApiMethod = HttpMethod.GET | HttpMethod.POST | HttpMethod.PUT | HttpMethod.DELETE | HttpMethod.PATCH;
export type TApiRequest = IMutationRequest | IQueryRequest;

export interface IBaseApiRequest {
    url: string;
    method: TApiMethod;
}

export interface IMutationRequest extends IBaseApiRequest {
    method: HttpMethod.POST | HttpMethod.PUT | HttpMethod.PATCH;
    data: IApiRequestBody;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
export interface IApiRequestBody extends Record<string, any> {}

export interface IQueryRequest extends IBaseApiRequest {
    method: HttpMethod.GET | HttpMethod.DELETE;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>;
}

export interface IBaseApiResponse<T> {
    message: string;
    data: T;
}
// export interface IBaseApiResponse<T> {
//     statusCode: HttpStatusCode;
//     message: string;
//     data: T;
// }
export interface IPaginationRequest {
    pageIndex?: number;
    pageSize?: number;
}

export interface IPaginationMetadata {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasMoreRecords: boolean;
}

export interface IPagination<T> {
    metadata: IPaginationMetadata;
    items: T[];
}

export interface IDateRangeRequest {
    fromDate?: Date | string;
    toDate?: Date | string;
}
