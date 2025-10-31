import { axiosInstance } from "./axios-instance";
import { IBaseApiResponse } from "./types";

export default async <T>(url: string, params: Record<string, any>): Promise<IBaseApiResponse<T>> => {
    const response = await axiosInstance.delete<IBaseApiResponse<T>>(url, { params });
    return response.data;
};
