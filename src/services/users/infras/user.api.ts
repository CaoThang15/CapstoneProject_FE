import { endpoints } from "~/constants/endpoints";
import { callApi } from "~/libs/axios/request";
import { HttpMethod, IPagination } from "~/libs/axios/types";
import { GetUsersWithPaginationRequest, UpdateProfileRequest } from "./types";
import { User } from "~/entities";

const updateProfile = async (payload: UpdateProfileRequest) => {
    return await callApi({
        data: payload,
        method: HttpMethod.PATCH,
        url: endpoints.users.updateProfile,
    });
};

const getUsersWithPagination = async (query: GetUsersWithPaginationRequest) => {
    return await callApi<IPagination<User>>({
        method: HttpMethod.GET,
        url: endpoints.users.getAllUsers,
        params: query,
    });
};

const deleteUser = async (userId: number) => {
    return await callApi({
        method: HttpMethod.DELETE,
        url: endpoints.users.deleteUser(userId),
    });
};

export const userApis = { updateProfile, getUsersWithPagination, deleteUser };
