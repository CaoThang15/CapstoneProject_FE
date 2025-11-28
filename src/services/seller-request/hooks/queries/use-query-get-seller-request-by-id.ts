import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { SellerRequest } from "~/entities/seller-request.entity";
import { IBaseApiResponse } from "~/libs/axios/types";
import { sellerRequestApi } from "../../infras";

const transformData = (response: IBaseApiResponse<SellerRequest>): SellerRequest => {
    return SellerRequest.fromJson(response.data);
};

export function useQueryGetSellerRequestById(requestId?: number) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<SellerRequest>>({
        queryKey: [QueryKey.SELLER_REQUEST.GET_SELLER_REQUEST_DETAILS, requestId],
        queryFn: async () => {
            return await sellerRequestApi.getSellerRequestDetails(requestId);
        },
        enabled: !!requestId,
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
