import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { ordersApi } from "../../infras";
import { OrderStatus } from "~/constants/enums";

export function useMutationUpdateStatusOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.ORDERS.UPDATE_ORDER_STATUS],
        mutationFn: async ({ orderId, status }: { orderId: number; status: OrderStatus }) => {
            const response = await ordersApi.updateOrderStatus(orderId, status);
            return response.data;
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.ORDERS.GET_ORDER_BY_ID] });
            queryClient.invalidateQueries({ queryKey: [QueryKey.ORDERS.GET_ORDERS] });
            return response;
        },
    });
}
