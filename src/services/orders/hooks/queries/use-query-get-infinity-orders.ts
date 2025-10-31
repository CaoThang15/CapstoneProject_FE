import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { DEFAULT_PAGINATION_PARAMS } from "~/constants/pagination";
import { QueryKey } from "~/constants/query-key";
import { Order } from "~/entities";
import { IBaseApiResponse, IPagination } from "~/libs/axios/types";
import { GetOrdersRequest, ordersApi } from "~/services/orders/infras";
import { transformInfiniteData } from "~/utils/tanstack";

export function useQueryGetInfinityOrders(params: GetOrdersRequest) {
    const { data, isLoading, fetchNextPage, hasNextPage, refetch, isError } = useInfiniteQuery<
        IBaseApiResponse<IPagination<Order>>
    >({
        queryKey: [QueryKey.ORDERS.GET_MY_ORDERS, params],
        initialPageParam: DEFAULT_PAGINATION_PARAMS.PAGE_INDEX,
        queryFn: async () => {
            return await ordersApi.getMyOrders(params);
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.data.metadata.hasMoreRecords) {
                return lastPage.data.metadata.page + 1;
            }
            return undefined;
        },
    });

    const listOrders = React.useMemo(() => {
        if (isError || isLoading || !data) return [];
        return transformInfiniteData(data);
    }, [data, isError, isLoading]);

    const totalItems = React.useMemo(() => {
        if (isError || isLoading || !data) return 0;
        return data.pages.reduce((acc, page) => acc + page.data.metadata.totalItems, 0);
    }, [data, isError, isLoading]);

    return {
        data: {
            items: listOrders,
            total: totalItems,
        },
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        refetch,
    };

    // const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<IPagination<Order>>>({
    //     queryKey: [QueryKey.ORDERS.GET_ORDERS, params],
    //     queryFn: async () => {
    //         return await ordersApi.getOrders(params);
    //     },
    // });

    // const listOrders = React.useMemo(() => {
    //     if (isError || isLoading || !data) return [];
    //     return transformData(data);
    // }, [data, isError, isLoading]);

    // const totalItems = React.useMemo(() => {
    //     if (isError || isLoading || !data) return 0;
    //     return data.data.metadata.totalItems;
    // }, [data, isError, isLoading]);

    // return {
    //     data: {
    //         items: listOrders,
    //         total: totalItems,
    //     },
    //     isLoading,
    //     isError,
    //     refetch,
    // };
}
