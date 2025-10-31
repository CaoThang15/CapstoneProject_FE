import { endpoints } from "~/constants/endpoints";
import { vnPublicApiAxios } from "~/libs/axios/public-api/vn.axios-instance";
import { TProvince, TWard } from "./types";

const queryParams = {
    page: 0,
    size: 999,
};

const getAllProvinces = async () => {
    const response = await vnPublicApiAxios.get<TProvince[]>(endpoints.publicApi.getAllProvinces, {
        params: queryParams,
    });

    return response.data;
};

const getWardsByProvince = async (province: string): Promise<TWard[]> => {
    const response = await vnPublicApiAxios.get<TWard[]>(endpoints.publicApi.getWards, {
        params: {
            province,
        },
    });

    return response.data;
};

export { getAllProvinces, getWardsByProvince };
