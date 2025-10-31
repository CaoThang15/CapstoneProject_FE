import { callApi } from "~/libs/axios/request";
import { UpdateProfileRequest } from "./types";
import { HttpMethod } from "~/libs/axios/types";
import { endpoints } from "~/constants/endpoints";

const updateProfile = async (payload: UpdateProfileRequest) => {
    return await callApi({
        data: payload,
        method: HttpMethod.PATCH,
        url: endpoints.users.updateProfile,
    });
};

export const userApis = { updateProfile };
