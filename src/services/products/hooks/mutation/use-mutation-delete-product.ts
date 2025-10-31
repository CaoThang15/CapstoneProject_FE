import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { productsApi } from "../../infras";

export function useMutationDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.PRODUCTS.DELETE],
        mutationFn: async (productId: number) => {
            const response = await productsApi.deleteProduct(productId);
            return response.data;
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.PRODUCTS.GET_LIST_PRODUCTS] });
            return response;
        },
    });
}
