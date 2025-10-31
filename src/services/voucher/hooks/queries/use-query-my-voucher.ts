import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { Voucher } from "~/entities";
import { IBaseApiResponse } from "~/libs/axios/types";
import { voucherApi } from "../../infras";

const transformData = (response: IBaseApiResponse<Voucher[]>): Voucher[] => {
    return response.data;
};

export function useQueryGetMyVoucher() {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<Voucher[]>>({
        queryKey: [QueryKey.VOUCHER.GET_MY_VOUCHERS],
        queryFn: async () => {
            return await voucherApi.getMyVouchers();
        },
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
