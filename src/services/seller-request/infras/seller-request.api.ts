import { callApi } from "~/libs/axios/request";
import { CreateSellerOnboardingRequestDto, CreateSellerRequestResponseDto, GetAllSellerRequestDto } from "./types";
import { endpoints } from "~/constants/endpoints";
import { HttpMethod, IPagination } from "~/libs/axios/types";
import { SellerRequest } from "~/entities/seller-request.entity";

const createSellerRequest = async (payload: CreateSellerOnboardingRequestDto) => {
    return await callApi<SellerRequest>({
        url: endpoints.sellerRequest.createSellerRequest,
        method: HttpMethod.POST,
        data: payload,
    });
};

const getSellerRequestDetails = async (requestId: number) => {
    return await callApi<SellerRequest>({
        url: endpoints.sellerRequest.getSellerRequestDetails(requestId),
        method: HttpMethod.GET,
    });
};

const getAllSellerRequest = async (params: GetAllSellerRequestDto) => {
    return await callApi<IPagination<SellerRequest>>({
        url: endpoints.sellerRequest.getAllSellerRequests,
        method: HttpMethod.GET,
        params,
    });
};

const responseSellerRequest = async (requestId: number, payload: CreateSellerRequestResponseDto) => {
    return await callApi({
        url: endpoints.sellerRequest.responseSellerRequest(requestId),
        method: HttpMethod.POST,
        data: payload,
    });
};

const getCurrentSellerRequest = async () => {
    return await callApi<SellerRequest>({
        url: endpoints.sellerRequest.getCurrentSellerRequest,
        method: HttpMethod.GET,
    });
};

export const sellerRequestApi = {
    createSellerRequest,
    getSellerRequestDetails,
    getAllSellerRequest,
    responseSellerRequest,
    getCurrentSellerRequest,
};
