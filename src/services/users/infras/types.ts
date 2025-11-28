import { IPaginationRequest } from "~/libs/axios/types";

export interface UpdateProfileRequest {
    name: string;
    phone: string;
    province: string;
    ward: string;
    address: string;
    avatar: string;
}

export interface GetUsersWithPaginationRequest extends IPaginationRequest {
    searchTerm?: string;
}
