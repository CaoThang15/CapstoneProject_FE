import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { DEFAULT_PAGINATION_PARAMS } from "~/constants/pagination";
import { QueryKey } from "~/constants/query-key";
import { Product } from "~/entities/product.entity";
import { IBaseApiResponse, IPagination } from "~/libs/axios/types";
import { transformInfiniteData } from "~/utils/tanstack";
import { productsApi } from "../../infras";

export function useQueryGetListProducts(params: Record<string, any>) {
    const { data, isLoading, fetchNextPage, hasNextPage, refetch, isError } = useInfiniteQuery<
        IBaseApiResponse<IPagination<Product>>
    >({
        queryKey: [QueryKey.PRODUCTS.GET_LIST_PRODUCTS, params],
        initialPageParam: DEFAULT_PAGINATION_PARAMS.PAGE_INDEX,
        queryFn: async () => {
            return await productsApi.getListProducts(params);
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.data.metadata.hasMoreRecords) {
                return lastPage.data.metadata.page + 1;
            }
            return undefined;
        },
    });

    const listProducts = React.useMemo(() => {
        if (isError || isLoading || !data) return [];
        return transformInfiniteData(data);
    }, [data, isError, isLoading]);

    const totalItems = React.useMemo(() => {
        if (isError || isLoading || !data) return 0;
        return data.pages.reduce((acc, page) => acc + page.data.metadata.totalItems, 0);
    }, [data, isError, isLoading]);

    return {
        data: {
            items: listProducts,
            total: totalItems,
        },
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        refetch,
    };
}
