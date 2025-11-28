import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { SellerRequest } from "~/entities/seller-request.entity";
import { IBaseApiResponse, IPagination } from "~/libs/axios/types";
import { GetAllSellerRequestDto, sellerRequestApi } from "../../infras";

const transformData = (response: IBaseApiResponse<IPagination<SellerRequest>>): SellerRequest[] => {
    return response.data.items.map((item) => {
        return SellerRequest.fromJson(item);
    });
};

export function useQueryGetSellerRequestWithPagination(params: GetAllSellerRequestDto) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<IPagination<SellerRequest>>>({
        queryKey: [QueryKey.SELLER_REQUEST.GET_LIST_SELLER_REQUESTS, params],
        queryFn: async () => {
            return await sellerRequestApi.getAllSellerRequest(params);
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
