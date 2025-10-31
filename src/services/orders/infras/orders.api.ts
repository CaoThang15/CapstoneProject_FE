import { callApi } from "~/libs/axios/request";
import { CreateOrderRequest } from "./types";
import { endpoints } from "~/constants/endpoints";
import { HttpMethod } from "~/libs/axios/types";

const createOrder = async (orderData: CreateOrderRequest) => {
    return await callApi({
        url: endpoints.orders.createOrder,
        method: HttpMethod.POST,
        data: orderData,
    });
};

export const ordersApi = {
    createOrder,
};
