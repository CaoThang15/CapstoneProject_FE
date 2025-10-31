import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { voucherApi } from "../../infras";

export function useMutationApplyVoucher() {
    return useMutation({
        mutationKey: [QueryKey.VOUCHER.VALIDATE_VOUCHER],
        mutationFn: async (voucherCode: string) => {
            const response = await voucherApi.getVoucherByCode(voucherCode);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
