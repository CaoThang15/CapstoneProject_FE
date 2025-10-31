import { callApi } from "~/libs/axios/request";
import { CreateOrderRequest, GetOrdersRequest } from "./types";
import { endpoints } from "~/constants/endpoints";
import { HttpMethod, IPagination } from "~/libs/axios/types";
import { Order } from "~/entities";
import { OrderStatus } from "~/constants/enums";

const createOrder = async (orderData: CreateOrderRequest) => {
    return await callApi({
        url: endpoints.orders.createOrder,
        method: HttpMethod.POST,
        data: orderData,
    });
};

const getOrders = async (params: GetOrdersRequest) => {
    return await callApi<IPagination<Order>>({
        url: endpoints.orders.getOrders,
        method: HttpMethod.GET,
        params,
    });
};

const getMyOrders = async (params: GetOrdersRequest) => {
    return await callApi<IPagination<Order>>({
        url: endpoints.orders.getMyOrders,
        method: HttpMethod.GET,
        params,
    });
};

const getOrderById = async (orderId: number) => {
    return await callApi<Order>({
        url: endpoints.orders.getOrderById(orderId),
        method: HttpMethod.GET,
    });
};

const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
    return await callApi<Order>({
        url: endpoints.orders.updateOrderStatus(orderId, status),
        method: HttpMethod.PATCH,
        data: null,
    });
};

export const ordersApi = {
    createOrder,
    getOrders,
    getOrderById,
    getMyOrders,
    updateOrderStatus,
};
