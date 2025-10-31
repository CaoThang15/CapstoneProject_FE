import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { IBaseApiResponse } from "~/libs/axios/types";
import { Order } from "~/entities";
import { ordersApi } from "~/services/orders/infras";

const transformData = (response: IBaseApiResponse<Order>): Order => {
    return response.data;
};

export function useQueryGetOrderById(orderId?: number) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<Order>>({
        queryKey: [QueryKey.ORDERS.GET_ORDER_BY_ID, orderId],
        queryFn: async () => {
            return await ordersApi.getOrderById(orderId);
        },
        enabled: !!orderId,
    });

    const order = React.useMemo(() => {
        if (isError || isLoading || !data) return null;
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: order,
        isLoading,
        isError,
        refetch,
    };
}
