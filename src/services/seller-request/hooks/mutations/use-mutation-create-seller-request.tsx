import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { sellerRequestApi } from "../../infras";
import { CreateSellerOnboardingRequestDto } from "../../infras/types";

export function useMutationCreateSellerRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.SELLER_REQUEST.CREATE_SELLER_REQUEST],
        mutationFn: async (payload: CreateSellerOnboardingRequestDto) => {
            const response = await sellerRequestApi.createSellerRequest(payload);
            return response.data;
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.SELLER_REQUEST.GET_CURRENT_SELLER_REQUEST] });
            return response;
        },
    });
}
