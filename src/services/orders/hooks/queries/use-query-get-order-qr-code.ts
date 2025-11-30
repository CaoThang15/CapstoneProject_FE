import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TransactionType } from "~/constants/enums";
import { QueryKey } from "~/constants/query-key";
import { IBaseApiResponse } from "~/libs/axios/types";
import { ordersApi, QRInfoResponse } from "~/services/orders/infras";

const transformData = (response: IBaseApiResponse<QRInfoResponse>): QRInfoResponse => {
    return response.data;
};

export function useQueryGetOrderQrCode(orderId?: number, type?: TransactionType) {
    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: [QueryKey.ORDERS.GET_ORDER_QR_CODE, orderId, type],
        queryFn: async () => {
            return await ordersApi.generateOrderQRCode(orderId, type);
        },
        enabled: !!orderId && !!type,
    });

    const qrInfo = React.useMemo(() => {
        if (isError || isLoading || !data) return null;
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: qrInfo,
        isLoading,
        isError,
        refetch,
    };
}
