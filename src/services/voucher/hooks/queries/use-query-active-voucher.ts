import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { Voucher } from "~/entities";
import { IBaseApiResponse } from "~/libs/axios/types";
import { voucherApi } from "../../infras";

const transformData = (response: IBaseApiResponse<Voucher[]>): Voucher[] => {
    return response.data.map((item) => Voucher.fromJson(item));
};

export function useQueryGetActiveVoucher() {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<Voucher[]>>({
        queryKey: [QueryKey.VOUCHER.GET_ACTIVE_VOUCHERS],
        queryFn: async () => {
            return await voucherApi.getActiveVouchers();
        },
    });

    const activeVouchers = React.useMemo(() => {
        if (isError || isLoading || !data) return null;
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: activeVouchers,
        isLoading,
        isError,
        refetch,
    };
}
