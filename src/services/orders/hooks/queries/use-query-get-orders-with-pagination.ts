import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { Order } from "~/entities";
import { IBaseApiResponse, IPagination } from "~/libs/axios/types";
import { GetOrdersRequest, ordersApi } from "~/services/orders/infras";

const transformData = (response: IBaseApiResponse<IPagination<Order>>): Order[] => {
    return response.data.items;
};

export function useQueryGetOrdersWithPagination(params: GetOrdersRequest) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<IPagination<Order>>>({
        queryKey: [QueryKey.ORDERS.GET_ORDERS, params],
        queryFn: async () => {
            return await ordersApi.getOrders(params);
        },
    });

    const listOrders = React.useMemo(() => {
        if (isError || isLoading || !data) return [];
        return transformData(data);
    }, [data, isError, isLoading]);

    const totalItems = React.useMemo(() => {
        if (isError || isLoading || !data) return 0;
        return data.data.metadata.totalItems;
    }, [data, isError, isLoading]);

    return {
        data: {
            items: listOrders,
            total: totalItems,
        },
        isLoading,
        isError,
        refetch,
    };
}
