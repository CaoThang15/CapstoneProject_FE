import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { Product } from "~/entities/product.entity";
import { IBaseApiResponse } from "~/libs/axios/types";
import { productsApi } from "../../infras";

const transformData = (response: IBaseApiResponse<Product>): Product => {
    return response.data;
};

export function useQueryGetProductBySlug(slug?: string) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<Product>>({
        queryKey: [QueryKey.PRODUCTS.GET_PRODUCT_BY_SLUG, slug],
        queryFn: async () => {
            return await productsApi.getProductBySlug(slug);
        },
        enabled: !!slug,
    });

    const product = React.useMemo(() => {
        if (isError || isLoading || !data) return null;
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: product,
        isLoading,
        isError,
        refetch,
    };
}
