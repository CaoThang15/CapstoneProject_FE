import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { AssignVoucherRequest, voucherApi } from "../../infras";

export function useMutationSaveVoucher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [QueryKey.VOUCHER.ASSIGN_VOUCHER],
        mutationFn: async (payload: AssignVoucherRequest) => {
            return await voucherApi.assignVoucher(payload.userId, payload.voucherId);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.VOUCHER.GET_MY_VOUCHERS] });
            queryClient.invalidateQueries({ queryKey: [QueryKey.VOUCHER.GET_ACTIVE_VOUCHERS] });

            return response;
        },
    });
}
