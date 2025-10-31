import { OrderStatus } from "../enums";

const ordersEndpointPrefix = "/orders";

export const ordersEndpoints = {
    createOrder: `${ordersEndpointPrefix}`,
    getOrders: `${ordersEndpointPrefix}`,
    getMyOrders: `${ordersEndpointPrefix}/my-orders`,
    getOrderById: (orderId: number) => `${ordersEndpointPrefix}/${orderId}`,
    updateOrderStatus: (orderId: number, status: OrderStatus) =>
        `${ordersEndpointPrefix}/${orderId}/status?status=${status}`,
};
