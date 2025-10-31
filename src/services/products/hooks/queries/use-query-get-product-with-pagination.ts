import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { Product } from "~/entities/product.entity";
import { IBaseApiResponse, IPagination } from "~/libs/axios/types";
import { GetProductWithPaginationRequest, productsApi } from "../../infras";

const transformData = (response: IBaseApiResponse<IPagination<Product>>): Product[] => {
    return response.data.items;
};

export function useQueryGetProductWithPagination(params: GetProductWithPaginationRequest) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<IPagination<Product>>>({
        queryKey: [QueryKey.PRODUCTS.GET_LIST_PRODUCTS, params],
        queryFn: async () => {
            return await productsApi.getListProducts(params);
        },
    });

    const listProducts = React.useMemo(() => {
        if (isError || isLoading || !data) return [];
        return transformData(data);
    }, [data, isError, isLoading]);

    const totalItems = React.useMemo(() => {
        if (isError || isLoading || !data) return 0;
        return data.data.metadata.totalItems;
    }, [data, isError, isLoading]);

    return {
        data: {
            items: listProducts,
            total: totalItems,
        },
        isLoading,
        isError,
        refetch,
    };
}
