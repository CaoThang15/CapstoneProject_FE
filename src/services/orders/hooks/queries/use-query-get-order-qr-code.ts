import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TransactionType } from "~/constants/enums";
import { QueryKey } from "~/constants/query-key";
import { ordersApi } from "~/services/orders/infras";

const convertBlobToDataURL = (blob: Blob): string => {
    return URL.createObjectURL(blob);
};
export function useQueryGetOrderQrCode(orderId?: number, type?: TransactionType) {
    const {
        data: blob,
        isLoading,
        refetch,
        isError,
    } = useQuery({
        queryKey: [QueryKey.ORDERS.GET_ORDER_QR_CODE, orderId, type],
        queryFn: async () => {
            return await ordersApi.generateOrderQRCode(orderId, type);
        },
        enabled: !!orderId && !!type,
    });

    const qrCodeUrl = React.useMemo(() => {
        if (!blob || isLoading || isError) return null;

        return convertBlobToDataURL(blob);
    }, [blob, isLoading, isError]);

    return {
        data: qrCodeUrl,
        isLoading,
        isError,
        refetch,
    };
}
