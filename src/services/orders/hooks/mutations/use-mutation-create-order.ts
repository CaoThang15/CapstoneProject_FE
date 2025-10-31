import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { CreateOrderRequest, ordersApi } from "../../infras";

export function useMutationCreateOrder() {
    return useMutation({
        mutationKey: [QueryKey.ORDERS.CREATE],
        mutationFn: async (data: CreateOrderRequest) => {
            const response = await ordersApi.createOrder(data);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
