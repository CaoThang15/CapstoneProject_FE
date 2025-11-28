import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { SellerRequest } from "~/entities/seller-request.entity";
import { IBaseApiResponse } from "~/libs/axios/types";
import { sellerRequestApi } from "../../infras";

const transformData = (response: IBaseApiResponse<SellerRequest>): SellerRequest => {
    return SellerRequest.fromJson(response.data);
};

export function useQueryGetCurrentSellerRequest() {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<SellerRequest>>({
        queryKey: [QueryKey.SELLER_REQUEST.GET_CURRENT_SELLER_REQUEST],
        queryFn: async () => {
            return await sellerRequestApi.getCurrentSellerRequest();
        },
    });

    const sellerRequest = React.useMemo(() => {
        if (isError || isLoading || !data) return null;
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: sellerRequest,
        isLoading,
        isError,
        refetch,
    };
}
