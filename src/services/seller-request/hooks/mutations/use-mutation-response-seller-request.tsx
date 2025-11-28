import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { sellerRequestApi } from "../../infras";
import { CreateSellerRequestResponseDto } from "../../infras/types";

export function useMutationResponseSellerRequest() {
    return useMutation({
        mutationKey: [QueryKey.SELLER_REQUEST.RESPONSE_SELLER_REQUEST],
        mutationFn: async (payload: { requestId: number; data: CreateSellerRequestResponseDto }) => {
            const response = await sellerRequestApi.responseSellerRequest(payload.requestId, payload.data);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
