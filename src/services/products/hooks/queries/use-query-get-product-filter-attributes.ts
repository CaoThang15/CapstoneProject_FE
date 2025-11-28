import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { IBaseApiResponse } from "~/libs/axios/types";
import { GetProductWithPaginationRequest, ProductAttributeFiltersResponse, productsApi } from "../../infras";

const transformData = (
    response: IBaseApiResponse<ProductAttributeFiltersResponse>,
): ProductAttributeFiltersResponse => {
    return response.data;
};

export function useQueryGetProductFilterAttributes(params?: GetProductWithPaginationRequest) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<ProductAttributeFiltersResponse>>({
        queryKey: [QueryKey.PRODUCTS.GET_LIST_PRODUCTS, params],
        queryFn: async () => {
            return await productsApi.getProductAttributeFilters(params);
        },
    });

    const filterAttributes = React.useMemo(() => {
        if (isError || isLoading || !data)
            return {
                minPrice: 0,
                maxPrice: 0,
            };
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: filterAttributes,
        isError,
        refetch,
    };
}
