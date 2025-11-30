import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { ordersApi } from "../../infras";

export function useMutationMarkedAsDelivered() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [QueryKey.ORDERS.MARKED_AS_DELIVERED],
        mutationFn: async (orderId: number) => {
            const response = await ordersApi.markedAsDelivered(orderId);
            return response.data;
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: [QueryKey.ORDERS.GET_MY_ORDERS],
            });
            queryClient.invalidateQueries({
                queryKey: [QueryKey.ORDERS.GET_ORDER_BY_ID],
            });
            return response;
        },
    });
}
